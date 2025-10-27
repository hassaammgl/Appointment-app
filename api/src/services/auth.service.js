import argon from "argon2";
import Organization from "../models/org.model.js";
import User from "../models/user.model.js";
import { logger } from "../config/logger.js";

class AuthService {
  async register({ username, email, password, role, organization }) {
    let orgId;
    if (organization === "") {
      const orgs = await Organization.find().limit(1);
      if (!orgs.length) {
        throw new Error(
          "No organizations found. Please create an organization first."
        );
      }
      orgId = orgs[0]._id;
    } else {
      const org = await Organization.create({ name: organization });
      orgId = org._id;
    }

    const hashedPassword = await argon.hash(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      organization: orgId,
    });
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email }).populate("organization");
    if (!user) {
      throw new AuthenticationError("User not found");
    }

    const isValidPassword = await argon.verify(user.password, password);
    if (!isValidPassword) {
      throw new AuthenticationError("Invalid password");
    }

    await user.save();
    return user;
  }

  async getOrg({ _id }) {
    const org = await Organization.findById({ _id });
    if (!org) {
      throw new Error("Organization not found");
    }
    return org;
  }

  async renewOrganization() {
    const orgs = await Organization.find().limit(1);

    if (!orgs.length) {
      throw new Error("Organization not found");
    }

    const org = orgs[0];
    const now = new Date();

    const baseDate = org.premiumExpiresAt > now ? org.premiumExpiresAt : now;

    org.premiumStartedAt = baseDate;
    org.premiumExpiresAt = new Date(
      baseDate.getTime() + 365 * 24 * 60 * 60 * 1000
    );
    org.isPremium = true;

    await org.save();
    return org;
  }

  async saveDeviceId(userId, deviceId) {
    if (!userId || !deviceId)
      throw new Error("userId and deviceId are required");

    const user = await User.findById(userId).select("deviceIds");

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    logger.debug({ userId, deviceId, current: user.deviceIds });

    const alreadyExists = user.deviceIds.includes(deviceId);

    if (alreadyExists) {
      return false;
    }

    user.deviceIds.push(deviceId);
    await user.save();

    return true;
  }
}

export const authservice = new AuthService();
