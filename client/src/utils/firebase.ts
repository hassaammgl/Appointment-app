import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
	messagingSenderId: import.meta.env
		.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
	appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

const vapidKey = import.meta.env.VITE_VAPID_KEY! as string;

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = async () => {
	try {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			return true;
		}
		return false;
	} catch (error) {
		console.error("Permission error:", error);
		return false;
	}
};

export const getFCMToken = async () => {
	try {
		const token = await getToken(messaging, { vapidKey: vapidKey });
		return token;
	} catch (error) {
		console.log(error);

		console.error("Token error:", error);
		return null;
	}
};

// Handle foreground messages
export const onForegroundMessage = () => {
	return new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
};
