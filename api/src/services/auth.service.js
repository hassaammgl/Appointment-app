import User from "../models/user.model.js";
import Organization from "../models/org.model.js";
import argon from "argon2";
import { AuthenticationError } from "../utils/AppError.js";

export class AuthService {
  async registerUser({ username, email, password, role, organization }) {
    let orgId;

    if (organization === "") {
      const orgs = await Organization.find().limit(1);
      if (!orgs.length) {
        throw new Error(
          "No organizations found. Please create an organization first.",
        );
      }
      orgId = orgs[0]._id;
    } else {
      const org = new Organization({ name: organization });
      await org.save();
      orgId = org._id;
    }

    const hashedPassword = await argon.hash(password);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      organization: orgId,
    });

    await user.save();
    return user;
  }

  async loginUser(email, password) {
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
    const org = await Organization.findById(_id);
    if (!org) {
      throw new Error("Organization not found");
    }
    return org;
  }

  async renewOrganisation() {
    const orgs = await Organization.find().limit(1);

    if (!orgs.length) {
      throw new Error("Organization not found");
    }

    const org = orgs[0];
    const now = new Date();

    const baseDate = org.premiumExpiresAt > now ? org.premiumExpiresAt : now;

    org.premiumStartedAt = baseDate;
    org.premiumExpiresAt = new Date(
      baseDate.getTime() + 365 * 24 * 60 * 60 * 1000,
    );
    org.isPremium = true;

    await org.save();
    return org;
  }

  async checkPremiumStatus(organizationId) {
    const org = await this.getOrg({ _id: organizationId });
    org.updatePremiumStatus();
    await org.save();
    return org.isPremium;
  }

  async getOrganizationUsers(organizationId) {
    const users = await User.find({ organization: organizationId })
      .select("-password")
      .populate("organization", "name isPremium");

    return users;
  }

  async updateUserRole(userId, newRole) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = newRole;
    await user.save();
    return user;
  }

  async verifyUser(userId) {
    const user = await User.findById(userId)
      .select("username email role organization")
      .populate("organization", "name isPremium");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async saveDeviceId(userId, deviceId) {
    if (!userId || !deviceId) {
      throw new Error("userId and deviceId are required");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          deviceIds: deviceId,
          oneSignalIds: deviceId,
        },
      },
      { new: true, select: "-password" },
    );
    if (!user) {
      throw new Error("User not found");
    }
    // Return user without password
    const userObj = user.toObject();
    return userObj;
  }
}

export const authService = new AuthService();
