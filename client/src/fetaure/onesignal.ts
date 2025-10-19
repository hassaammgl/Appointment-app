import { useEffect } from "react";
import OneSignal from "react-onesignal";

// [TODO]: setup one signal system
export const useOneSignal = () => {
  useEffect(() => {

      OneSignal.init({
          appId: import.meta.env.VITE_ONESIGNAL_APP_ID! as string,
          welcomeNotification:{
              message:"Welcome & Thanks to enable notifications...",
              title: "Welcome",
          },
          notifyButton:{
enable:true,
              position: "bottom-left",
              prenotify:true,
              text: {
    "dialog.main.button.subscribe":"Subscribe to get Notifications on each appointments",

              }
          }
      });

  }, []);
};

  /**
   <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
   <script>

   OneSignalDeferred.push(async function(OneSignal) {
   await OneSignal.init({
   appId: "e1e63370-18ef-495b-9aff-d6766c418856",
   safari_web_id: "web.onesignal.auto.01b883ce-5cfa-4aca-8569-bf08de600615",
   notifyButton: {
   enable: true,
   },
   });
   });
   </script>
   */