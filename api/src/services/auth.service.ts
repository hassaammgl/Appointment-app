import User, { IUser, UserRole } from "../models/user.model";
import Organization, { IOrganization } from "../models/org.model";
import argon from "argon2";
import { AuthenticationError } from "../utils/AppError";
import mongoose from "mongoose";

interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: mongoose.Types.ObjectId | string;
}

interface GetOrgParams {
  _id: mongoose.Types.ObjectId | string;
}

export class AuthService {
  public async registerUser({
    username,
    email,
    password,
    role,
    organization,
  }: RegisterUserParams): Promise<IUser> {
    let orgId: mongoose.Types.ObjectId;

    if (organization === "") {
      const orgs = await Organization.find().limit(1);
      if (!orgs.length) {
        throw new Error(
          "No organizations found. Please create an organization first."
        );
      }
      orgId = orgs[0]._id as mongoose.Types.ObjectId;
    } else {
      const org = new Organization({ name: organization });
      await org.save();
      orgId = org._id as mongoose.Types.ObjectId;
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

  public async loginUser(email: string, password: string): Promise<IUser> {
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

  public async getOrg({ _id }: GetOrgParams): Promise<IOrganization> {
    const org = await Organization.findById(_id);
    if (!org) {
      throw new Error("Organization not found");
    }
    return org;
  }

  public async renewOrganisation(): Promise<IOrganization> {
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

  public async checkPremiumStatus(
    organizationId: mongoose.Types.ObjectId | string
  ): Promise<boolean> {
    const org = await this.getOrg({ _id: organizationId });
    org.updatePremiumStatus();
    await org.save();
    return org.isPremium;
  }

  public async getOrganizationUsers(
    organizationId: mongoose.Types.ObjectId | string
  ): Promise<IUser[]> {
    const users = await User.find({ organization: organizationId })
      .select("-password")
      .populate("organization", "name isPremium");

    return users;
  }

  public async updateUserRole(
    userId: mongoose.Types.ObjectId | string,
    newRole: UserRole
  ): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = newRole;
    await user.save();
    return user;
  }

  public async verifyUser(
    userId: mongoose.Types.ObjectId | string
  ): Promise<Partial<IUser>> {
    const user = await User.findById(userId)
      .select("username email role organization")
      .populate("organization", "name isPremium");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async savePlayerId(
    userId: mongoose.Types.ObjectId | string,
    playerId: string
  ) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { oneSignalIds: playerId } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export const authService = new AuthService();
