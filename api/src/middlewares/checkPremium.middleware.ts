import { Request, Response, NextFunction } from "express";
import Organization from "../models/org.model";
import { AuthorizationError } from "../utils/AppError";
import type { UserRole } from "../models/user.model";
import mongoose from "mongoose";

declare module "express-session" {
	interface SessionData {
		user?: {
			id: string;
			role: UserRole;
			email: string;
			username: string;
			organization: mongoose.Types.ObjectId;
		};
	}
}

// Interface for authenticated request
// interface AuthenticatedRequest extends Request {
// 	session: Request["session"] & {
// 		user: {
// 			id: string;
// 			role: UserRole;
// 			email: string;
// 			username: string;
// 			organization: mongoose.Types.ObjectId;
// 		};
// 	};
// }

export const checkOrgPremium = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const user = req.session?.user;
	if (!user) {
		throw new AuthorizationError("Login required");
	}

	const org = await Organization.findById(user.organization);
	if (!org) {
		throw new AuthorizationError("Organization not found");
	}

	org.updatePremiumStatus();
	await org.save();

	if (!org.isPremium) {
		throw new AuthorizationError(
			"Your organization's premium access expired. Please renew 💳"
		);
	}

	next();
};
