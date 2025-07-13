/// <reference lib="webworker" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let firebase: any;

importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js",
	"https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyBneablpzMxZRsV2mpNXCE90JHXbIyTOGg",
	authDomain: "sapps-3c57f.firebaseapp.com",
	projectId: "sapps-3c57f",
	storageBucket: "sapps-3c57f.appspot.com",
	messagingSenderId: "791673230566",
	appId: "1:791673230566:web:2f7de19540a20a3a05d727",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
messaging.onBackgroundMessage((payload: any) => {
	console.log("[Service Worker] Background message received!", payload);

	const notificationTitle = payload.notification?.title ?? "New Notification";
	const notificationOptions: NotificationOptions = {
		body: payload.notification?.body ?? "",
		icon: "/favicon.ico",
	};

	// 🧠 TS-safe way to access `self.registration` in service worker
	(self as unknown as ServiceWorkerGlobalScope).registration.showNotification(
		notificationTitle,
		notificationOptions
	);
});
