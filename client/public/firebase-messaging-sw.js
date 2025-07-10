importScripts(
	"https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyBneablpzMxZRsV2mpNXCE90JHXbIyTOGg",
	authDomain: "sapps-3c57f.firebaseapp.com",
	projectId: "sapps-3c57f",
	storageBucket: "sapps-3c57f.firebasestorage.app",
	messagingSenderId: "791673230566",
	appId: "1:791673230566:web:2f7de19540a20a3a05d727"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('[SW] Background message:', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/favicon.ico'
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});