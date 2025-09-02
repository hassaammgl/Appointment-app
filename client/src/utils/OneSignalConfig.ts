import OneSignal from "react-onesignal";

export async function initOneSignal(userId?: string) {
  await OneSignal.init({
    appId: "acd308c2-485f-463c-8c08-93c66ef34608",
    safari_web_id: "web.onesignal.auto.21fd847c-14e1-48c8-a072-78170e2e9023",
    allowLocalhostAsSecureOrigin: true,
    notifyButton: {
      enable: true,
    },
  });

  // Ask permission
  OneSignal.Slidedown.promptPush();

  // Listen for subscription changes
  OneSignal.User.PushSubscription.addEventListener("change", async (event) => {
    if (event.current && event.current.id && userId) {
      await fetch("https://sapps.site/api/api/auth/save-player-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          playerId: event.current.id,
        }),
      });
    }
  });
}
