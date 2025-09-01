import OneSignal from "react-onesignal";
import axios from "axios";

export async function initOneSignal(userId: string) {
	// await OneSignal.init({
	// 	appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
	// 	allowLocalhostAsSecureOrigin: true,
	// });

	OneSignal.Slidedown.promptPush();

	OneSignal.User.PushSubscription.addEventListener(
		"change",
		async (event) => {
			if (event.current.id) {
				await axios.post("/api/auth/save-player-id", {
					userId,
					playerId: event.current.id,
				});
			}
		}
	);
}
