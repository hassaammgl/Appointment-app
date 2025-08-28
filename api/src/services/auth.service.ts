import User, { IUser, UserRole } from "../models/user.model.js";
import Organization, { IOrganization } from "../models/org.model.js";
import argon from "argon2";
import { AuthenticationError } from "../utils/AppError.js";
import mongoose from "mongoose";

// Types for service parameters
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
	/**
	 * Register a new user with organization handling
	 */
	public async registerUser({
		username,
		email,
		password,
		role,
		organization,
	}: RegisterUserParams): Promise<IUser> {
		let orgId: mongoose.Types.ObjectId;

		if (organization === "") {
			// Use existing organization
			const orgs = await Organization.find().limit(1);
			if (!orgs.length) {
				throw new Error(
					"No organizations found. Please create an organization first."
				);
			}
			orgId = orgs[0]._id as mongoose.Types.ObjectId;
		} else {
			// Create new organization
			const org = new Organization({ name: organization });
			await org.save();
			orgId = org._id as mongoose.Types.ObjectId;
		}

		// Hash password and create user
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

	/**
	 * Authenticate user with email and password
	 */
	public async loginUser(
		email: string,
		password: string,
	): Promise<IUser> {
		const user = await User.findOne({ email }).populate("organization");
		if (!user) {
			throw new AuthenticationError("User not found");
		}

		const isValidPassword = await argon.verify(user.password, password);
		if (!isValidPassword) {
			throw new AuthenticationError("Invalid password");
		}

		// Update user if needed (e.g., FCM token handling could be added here)
		await user.save();
		return user;
	}

	/**
	 * Get organization by ID
	 */
	public async getOrg({ _id }: GetOrgParams): Promise<IOrganization> {
	    const org = await Organization.findById(_id);
	    if (!org) {
	        throw new Error('Organization not found');
	    }
	    return org;
	}

	/**
	 * Renew organization premium subscription
	 */
	public async renewOrganisation(): Promise<IOrganization> {
	    const orgs = await Organization.find().limit(1);

	    if (!orgs.length) {
	        throw new Error("Organization not found");
	    }

	    const org = orgs[0];
	    const now = new Date();

	    // Calculate base date - either current expiry or now (whichever is later)
	    const baseDate = org.premiumExpiresAt > now ? org.premiumExpiresAt : now;

	    // Set new premium period
	    org.premiumStartedAt = baseDate;
	    org.premiumExpiresAt = new Date(baseDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year
	    org.isPremium = true;

	    await org.save();
	    return org;
	}

	/**
	 * Check if organization premium is still valid
	 */
	public async checkPremiumStatus(organizationId: mongoose.Types.ObjectId | string): Promise<boolean> {
	    const org = await this.getOrg({ _id: organizationId });
	    org.updatePremiumStatus(); // Use the method from the model
	    await org.save();
	    return org.isPremium;
	}

	/**
	 * Get all users in an organization
	 */
	public async getOrganizationUsers(organizationId: mongoose.Types.ObjectId | string): Promise<IUser[]> {
	    const users = await User.find({ organization: organizationId })
	        .select('-password') // Exclude password from results
	        .populate('organization', 'name isPremium');

	    return users;
	}

	/**
	 * Update user role (admin function)
	 */
	public async updateUserRole(userId: mongoose.Types.ObjectId | string, newRole: UserRole): Promise<IUser> {
	    const user = await User.findById(userId);
	    if (!user) {
	        throw new Error('User not found');
	    }

	    user.role = newRole;
	    await user.save();
	    return user;
	}

	/**
	 * Verify user exists and return basic info
	 */
	public async verifyUser(userId: mongoose.Types.ObjectId | string): Promise<Partial<IUser>> {
	    const user = await User.findById(userId)
	        .select('username email role organization')
	        .populate('organization', 'name isPremium');

	    if (!user) {
	        throw new Error('User not found');
	    }

	    return user;
	}
}

// Export singleton instance
export const authService = new AuthService();

// Export individual functions for backward compatibility
// export const { registerUser, loginUser, getOrg, renewOrganisation } = authService;
