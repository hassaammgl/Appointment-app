// import { sendNotification } from "./onesignal.js";
import User from "../models/user.model.js";

export class NotificationService {
  static async notifyUser(userId, title, message, url) {
    const user = await User.findById(userId);

    if (!user || user.oneSignalIds.length === 0) {
      throw new Error("User has no OneSignal IDs");
    }

    // return sendNotification({
    //   title,
    //   message,
    //   url,
    //   playerIds: user.oneSignalIds,
    // });
  }
}
