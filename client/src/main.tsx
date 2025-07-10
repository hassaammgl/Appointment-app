import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { messaging } from "@/utils/firebase.ts"
import { getToken } from 'firebase/messaging'

const vapidKey = import.meta.env.VITE_VAPID_KEY! as string;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(async (registration) => {
      console.log('SW registration success:', registration.scope);
      const token = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: registration,
      });
      console.log('FCM token:', token);
      // send token to backend...
    })
    .catch(err => console.error('SW registration failed:', err));
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
