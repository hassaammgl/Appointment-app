import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    OneSignalDeferred?: any[];
  }
}

export function useOneSignal() {

  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.OneSignalDeferred.push(async function (OneSignal: any) {
     const app = await OneSignal.init({
        appId: "891f37e4-5f76-404b-8751-d057d3545742",
        safari_web_id:
          "web.onesignal.auto.3b8b9214-66ac-44d1-a7fb-a9dc856242cb",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
      console.log(app);
      
    });
  }, []);
}
