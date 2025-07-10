import { useEffect } from "react";
import {
	requestPermission,
	getFCMToken,
	onForegroundMessage,
} from "@/utils/firebase";

const useFCM = () => {
	useEffect(() => {
		const registerToken = async () => {
			const hasPermission = await requestPermission();
			if (hasPermission) {
				const token = await getFCMToken();
				if (token) {
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
	}, []);
};

export default useFCM;
