import axios, { AxiosResponse } from "axios";

const ONESIGNAL_APP_ID: string = process.env.ONESIGNAL_APP_ID as string;
const ONESIGNAL_API_KEY: string = process.env.ONESIGNAL_API_KEY as string;

interface NotificationPayload {
  title: string;
  message: string;
  url?: string;
  playerIds?: string[];
}

interface OneSignalResponse {
  id: string;
  recipients: number;
  external_id?: string;
  errors?: string[];
}

export async function sendNotification(
  { title, message, url, playerIds }: NotificationPayload
): Promise<OneSignalResponse> {
  try {
    const body: Record<string, unknown> = {
      app_id: ONESIGNAL_APP_ID,
      contents: { en: message },
      headings: { en: title },
      url,
    };

    if (playerIds && playerIds.length > 0) {
      body.include_player_ids = playerIds;
    } else {
      body.included_segments = ["All"];
    }

    const response: AxiosResponse<OneSignalResponse> = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      body,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${ONESIGNAL_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("OneSignal Error:", err.response?.data || err.message);
    throw err;
  }
}
