// client/src/OneSignalConfig.ts
import OneSignal from "react-onesignal";

export async function initOneSignal(userExternalId: string) {
  if ((window as any).oneSignalInitialized) return;
  (window as any).oneSignalInitialized = true;

  await OneSignal.init({
    appId: import.meta.env.VITE_ONESIGNAL_APP_ID || "",
    allowLocalhostAsSecureOrigin: true,
    welcomeNotification: {
      title: "Thanks for subscribing!",
      message: "You'll now receive notifications.",
    },
  });
  OneSignal.setConsentGiven(true); // If using consent mode:contentReference[oaicite:2]{index=2}

  // Prompt the user
  OneSignal.Slidedown.promptPush(); // Or use: OneSignal.Notifications.requestPermission():contentReference[oaicite:3]{index=3}

  // Listen to subscription changes
  OneSignal.User.PushSubscription.addEventListener("change", (subscription) => {
    if (subscription.optedIn) {
      console.log("Subscribed! Token:", subscription.token);
      // Send to backend...
    }
  });

  // Assign user identity
  await OneSignal.login(userExternalId);
}
