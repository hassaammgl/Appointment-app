import { redirect } from "react-router";
import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { useAuth } from "@/store/auth";

export const useOneSignal = () => {
  const { user, saveUserDevice } = useAuth();

  if (!user?.id) {
    redirect("/login");
  }

  useEffect(() => {
    const initOneSignal = async () => {
      try {
        const isTrue = localStorage.getItem("is-one-signal-initialized");
        console.log(typeof isTrue, "value: ", isTrue);

        if (isTrue === "true") return;
        else {
          await OneSignal.init({
            appId: import.meta.env.VITE_ONESIGNAL_APP_ID as string,
            safari_web_id: import.meta.env
              .VITE_ONESIGNAL_SAFARI_WEB_ID as string,
            allowLocalhostAsSecureOrigin: true,
            welcomeNotification: {
              title: "Welcome 🎉",
              message:
                "Thanks for enabling notifications! You’ll get alerts for new appointments.",
            },
            notifyButton: {
              enable: true,
              position: "bottom-left",
              size: "medium",
              prenotify: true,

              showCredit: false,
              text: {
                "tip.state.unsubscribed": "Click to subscribe for updates!",
                "tip.state.subscribed": "You're subscribed 🔔",
                "tip.state.blocked": "Notifications are blocked 😢",
                "message.prenotify": "Click to get appointment alerts!",
                "message.action.subscribing": "Subscribing...",
                "message.action.subscribed": "You're now subscribed 🎉",
                "message.action.resubscribed": "Welcome back!",
                "message.action.unsubscribed": "You've unsubscribed 😔",
                "dialog.main.title": "Stay Updated!",
                "dialog.main.button.subscribe":
                  "Subscribe to Appointment Alerts",
                "dialog.main.button.unsubscribe": "Unsubscribe",
                "dialog.blocked.title": "Notifications Blocked",
                "dialog.blocked.message":
                  "Please enable notifications in your browser settings.",
              },
            },
          });

          const isSubscribed = await OneSignal.User.PushSubscription.optedIn;
          if (isSubscribed) {
            const id = await OneSignal.User.PushSubscription.id;
            console.log(
              "Already subscribed! ID:",
              id,
              "isSubscribed:",
              isSubscribed,
              "userId:",
              user?.id
            );
            await saveUserDevice(user?.id as string, id as string);
          }
        }

        localStorage.setItem("is-one-signal-initialized", "true");
        console.log("✅ OneSignal initialized successfully");
      } catch (err) {
        console.error("❌ OneSignal init failed:", err);
      }
    };

    initOneSignal();
  }, []);
};
