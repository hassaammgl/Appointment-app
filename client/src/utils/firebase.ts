// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Updated to use environment variables for Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
// npm install firebase

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

// Get FCM token
export const getFCMToken = async (vapidKey: string) => {
	try {
		const token = await getToken(messaging, { vapidKey });
		return token;
	} catch (error) {
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
