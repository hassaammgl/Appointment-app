"use strict";
/// <reference lib="webworker" />
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js", "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");
var firebaseConfig = {
    apiKey: "AIzaSyBneablpzMxZRsV2mpNXCE90JHXbIyTOGg",
    authDomain: "sapps-3c57f.firebaseapp.com",
    projectId: "sapps-3c57f",
    storageBucket: "sapps-3c57f.appspot.com",
    messagingSenderId: "791673230566",
    appId: "1:791673230566:web:2f7de19540a20a3a05d727",
};
firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
messaging.onBackgroundMessage(function (payload) {
    var _a, _b, _c, _d;
    console.log("[Service Worker] Background message received!", payload);
    var notificationTitle = (_b = (_a = payload.notification) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "New Notification";
    var notificationOptions = {
        body: (_d = (_c = payload.notification) === null || _c === void 0 ? void 0 : _c.body) !== null && _d !== void 0 ? _d : "",
        icon: "/favicon.ico",
    };
    // 🧠 TS-safe way to access `self.registration` in service worker
    self.registration.showNotification(notificationTitle, notificationOptions);
});
