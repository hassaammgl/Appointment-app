// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBneablpzMxZRsV2mpNXCE90JHXbIyTOGg",
    authDomain: "sapps-3c57f.firebaseapp.com",
    projectId: "sapps-3c57f",
    storageBucket: "sapps-3c57f.firebasestorage.app",
    messagingSenderId: "791673230566",
    appId: "1:791673230566:web:2f7de19540a20a3a05d727",
    measurementId: "G-1SLBLMN884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(firebaseApp);
// npm install firebase