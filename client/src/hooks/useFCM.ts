import { useEffect, useState } from "react";
import { requestPermission, getFCMToken, messaging } from "@/utils/firebase"; // Make sure 'messaging' is exported from firebase.ts
import { onMessage } from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";
import { useAuth } from "@/store/auth";
import { useToast } from "@/components/ui/toast";

export interface ForegroundNotification extends MessagePayload {
	data?: {
		redirectPath?: string;
		entityId?: string;
	};
}

const useFCM = () => {
	const [fcmDeviceToken, setFcmDeviceToken] = useState<string | null>(null);
	const [notificationPermission, setNotificationPermission] = useState<
		boolean | null
	>(null);
	const [latestForegroundNotification, setLatestForegroundNotification] =
		useState<ForegroundNotification | null>(null);
	const { message } = useToast();

	const { setToken } = useAuth();

	useEffect(() => {
		let unsubscribeFromFCM: (() => void) | undefined;

		const setupFCM = async () => {
			const granted = await requestPermission();
			setNotificationPermission(granted);

			if (!granted) {
				console.warn("FCM: Notification permission not granted.");
				return;
			}

			let token = await getFCMToken();
			if (!token) {
				console.warn("FCM: Retrying token fetch...");
				token = await getFCMToken();
			}

			if (token) {
				console.log("FCM: Device Token obtained:", token);
				setFcmDeviceToken(token);
				setToken(token);
			} else {
				console.error("FCM: Failed to obtain FCM device token.");
			}

			if (messaging) {
				unsubscribeFromFCM = onMessage(
					messaging,
					(payload: MessagePayload) => {
						console.log(
							"FCM: Foreground message received:",
							payload
						);
						setLatestForegroundNotification(
							payload as ForegroundNotification
						); // Update state
						message(
							payload?.notification?.title,
							payload.notification?.body
						);
					}
				);
			} else {
				console.warn(
					"FCM: Messaging instance not available. Foreground messages won't be handled."
				);
			}
		};

		setupFCM();

		return () => {
			if (typeof unsubscribeFromFCM === "function") {
				console.log("FCM: Unsubscribing from foreground messages.");
				unsubscribeFromFCM();
			}
		};
	}, []);

	return {
		fcmDeviceToken,
		notificationPermission,
		latestForegroundNotification,
	};
};

export default useFCM;
