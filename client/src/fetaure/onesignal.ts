import { useEffect } from "react";
import OneSignal from "react-onesignal";

export const useOneSignal = () => {
  useEffect(() => {
    OneSignal.init({
      appId: import.meta.env.VITE_ONESIGNAL_APP_ID! as string,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        showCredit: false,
        enable: true,
        prenotify: true,
        text: {
          "tip.state.unsubscribed": "Subscribe to notifications",
          "tip.state.subscribed": "You are subscribed to notifications",
          "tip.state.blocked": "You have blocked notifications",
          "message.prenotify": "Click to subscribe to notifications",
          "message.action.subscribed": "Thanks for subscribing!",
          "message.action.resubscribed": "You are subscribed to notifications",
          "message.action.unsubscribed":
            "You won't receive notifications again",
          "dialog.main.title": "Manage Site Notifications",
          "dialog.main.button.subscribe": "SUBSCRIBE",
          "dialog.main.button.unsubscribe": "UNSUBSCRIBE",
          "dialog.blocked.title": "Unblock Notifications",
          "dialog.blocked.message":
            "Follow these instructions to allow notifications:",
          "message.action.subscribing": "Thanks for subscribing",
        },
        displayPredicate() {
          return true;
        },
      },
    }).then(() => {
      OneSignal.Debug.setLogLevel("trace");
    });
  }, []);
};
