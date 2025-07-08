importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize Firebase with your config
firebase.initializeApp({
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_STORAGE_BUCKET",
	messagingSenderId: "YOUR_SENDER_ID",
	appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
	console.log("Background message received: ", payload);

	// Customize notification
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/logo192.png", // Your app icon
		data: { url: payload.data.link }, // URL to open when clicked
	};

	// Show notification
	return self.registration.showNotification(
		notificationTitle,
		notificationOptions
	);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
	event.notification.close();
	event.waitUntil(clients.openWindow(event.notification.data.url));
});
