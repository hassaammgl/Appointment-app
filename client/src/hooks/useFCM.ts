import { useEffect } from "react";
import {
	requestPermission,
	getFCMToken,
	// onForegroundMessage,
	// messaging,
} from "@/utils/firebase";

const useFCM = () => {
	useEffect(() => {
		requestPermission().then(async (granted) => {
			if (!granted) return;
			const token = await getFCMToken();
			if (token) console.log("Token in hook:", token);
		});

		return () => {
			requestPermission().then(async (granted) => {
				if (!granted) return;
				const token = await getFCMToken();
				if (token) console.log("Token in hook:", token);
			});
		};
	}, []);
};

export default useFCM;
