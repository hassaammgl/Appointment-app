import "express-session";
import mongoose from "mongoose";
import type { UserRole } from "../models/user.model";

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
