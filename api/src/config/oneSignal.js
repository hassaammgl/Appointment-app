import Onesignal, { Notification } from "@onesignal/node-onesignal";
import { ENVS } from "../utils/constants.js";
import { logger } from "../utils/logger.js";

class Notifier {
  constructor(restApiKey, app_id) {
    logger.debug(`${restApiKey} <=> ${app_id}`);
    this.restApiKey = restApiKey;
    this.app_id = app_id;

    this.configuration = Onesignal.createConfiguration({
      restApiKey: this.restApiKey,
      organizationApiKey: this.app_id,
    });

    this.api = new Onesignal.DefaultApi(this.configuration);
  }
  async sendPush(heading, message) {
    this.notification = new Notification();
    this.notification.app_id = this.app_id;
    this.notification.headings = { en: heading };
    this.notification.contents = { en: message };

    this.notification.included_segments = ["All"];

    try {
      this.response = await this.api.createNotification(this.notification);
      logger.debug("Notification created! ID:", this.response.id);
      logger.debug("Full response:", this.response);
    } catch (error) {
      logger.error("Failed to send notification:");
      if (err?.response?.data) {
        logger.error("Error details:", err.response.data);
      } else {
        logger.error(err.message);
      }
    }
  }
}

export const notifier = new Notifier(ENVS.REST_API_KEY, ENVS.APP_ID);
