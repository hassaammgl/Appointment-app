import { useEffect } from "react";
import {
	requestPermission,
	getFCMToken,
	onForegroundMessage,
} from "@/utils/firebase";

const useFCM = (vapidKey: string) => {
	useEffect(() => {
		const registerToken = async () => {
			const hasPermission = await requestPermission();
			if (hasPermission) {
				const token = await getFCMToken(vapidKey);
				if (token) {
					// Send token to backend
					console.log(token);
				}
			}
		};

		registerToken();

		// Handle foreground messages
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onForegroundMessage().then((payload: any) => {
			console.log("Foreground message:", payload);
			// Display notification in-app
			console.log(payload);
		});
	}, [vapidKey]);
};

export default useFCM;
