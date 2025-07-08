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
					await fetch("http://localhost:5000/register-token", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ token }),
					});
				}
			}
		};

		registerToken();

		// Handle foreground messages
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onForegroundMessage().then((payload: any) => {
			console.log("Foreground message:", payload);
			// Display notification in-app
		});
	}, [vapidKey]);
};

export default useFCM;

// BE7RHC6cyzJkxzQqXnWJz9L-LEij85wTpEBZ1A92ANwVvxn-29ZeDQykN7QzEMaggPhVapSZO-gaH9ljOiN_78Y