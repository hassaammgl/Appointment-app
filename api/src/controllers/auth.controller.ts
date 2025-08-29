import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import {
	AppError,
	ValidationError,
	AuthenticationError,
} from "../utils/AppError";
import { ENVS as CONSTANTS } from "../config/constants";
import { handleDbError } from "../utils/handleDbError";
import type { UserRole } from "../models/user.model";
import mongoose from "mongoose";

// ---- Types for request bodies ----
interface RegisterBody {
	username: string;
	email: string;
	password: string;
	role: UserRole;
	organization?: mongoose.Types.ObjectId | string;
}

interface LoginBody {
	email: string;
	password: string;
}

// ---- Response wrapper ----
interface ApiResponse<T = any> {
	message: string;
	user?: T;
	organization?: T;
}

export class AuthController {
	/**
	 * Register a new user
	 */
	public static async register(
		req: Request<{}, ApiResponse, RegisterBody>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			const user = await authService.registerUser(req.body);
			res.status(201).json({ message: "User created 🎉", user });
		} catch (dbError) {
			handleDbError(dbError);
			next(dbError);
		}
	}

	/**
	 * Login user and create session
	 */
	public static async login(
		req: Request<{}, ApiResponse, LoginBody>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			const user = await authService.loginUser(
				req.body.email,
				req.body.password
			);

			if (!user) {
				throw new AuthenticationError("Invalid email or password");
			}

			req.session.user = {
				id: user._id?.toString() || "",
				role: user.role,
				email: user.email,
				username: user.username,
				organization: user.organization,
			};

			res.json({ message: "Logged in 🛜", user: req.session.user });
		} catch (dbError) {
			handleDbError(dbError);
			next(dbError);
		}
	}

	/**
	 * Logout user and destroy session
	 */
	public static logout(req: Request, res: Response): void {
		req.session.destroy(() => {
			res.json({ message: "Logged out 👋" });
		});
	}

	/**
	 * Get organization data for authenticated user
	 */
	public async getOrganization(
		req: Request,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			if (!req.session.user) {
				throw new AuthenticationError("Not authenticated");
			}

			const org = await authService.getOrg({
				_id: req.session.user.organization,
			});

			if (!org) {
				throw new AppError("Organization not found", 404);
			}

			res.status(200).json({
				message: "Org data fetched 🎉",
				organization: org,
			});
		} catch (dbError) {
			handleDbError(dbError);
			next(dbError);
		}
	}

	/**
	 * Renew organization subscription (Admin only)
	 */
	public async renewOrg(
		req: Request<{ id: string }>,
		res: Response<ApiResponse>,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				throw new ValidationError("Developer Secret ID is required");
			}
			if (id !== CONSTANTS.DEVELOPER_SECRET) {
				throw new ValidationError("Invalid Developer Secret ID");
			}

			const org = await authService.renewOrganisation();

			if (!org) {
				throw new AppError("Organization not found", 404);
			}

			res.status(200).json({
				message: "Org data renewed 🎉",
				organization: org,
			});
		} catch (dbError) {
			handleDbError(dbError);
			next(dbError);
		}
	}
}

// Export singleton instance
export const authController = new AuthController();
