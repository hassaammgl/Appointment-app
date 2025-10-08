import axios from "axios";

const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

export async function sendNotification({ title, message, url, playerIds }) {
  try {
    const body = {
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

    const response = await axios.post(
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
  } catch (err) {
    console.error("OneSignal Error:", err.response?.data || err.message);
    throw err;
  }
}
