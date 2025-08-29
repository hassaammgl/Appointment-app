import OneSignal from "react-onesignal";

export async function initOneSignal() {
  await OneSignal.init({
    appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
    allowLocalhostAsSecureOrigin: true,
  });

  OneSignal.Slidedown.promptPush();

  OneSignal.User.PushSubscription.addEventListener("change", (isSubscribed) => {
    console.log("Subscription state changed to:", isSubscribed);
  });
}
