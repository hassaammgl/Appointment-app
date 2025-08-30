import { sendNotification } from "../utils/onesignal";
import User from "../models/user.model";
import type { IUser } from "../models/user.model";
import mongoose from "mongoose";

export class NotificationService {
	/**
	 * Send a notification to all OneSignal devices for a specific user
	 */
	public static async notifyUser(
		userId: string | mongoose.Types.ObjectId,
		title: string,
		message: string,
		url?: string
	) {
		const user: IUser | null = await User.findById(userId);

		if (!user || user.oneSignalIds.length === 0) {
			throw new Error("User has no OneSignal IDs");
		}

		return sendNotification({
			title,
			message,
			url,
			playerIds: user.oneSignalIds, // 🎯 all devices for this user
		});
	}
}
