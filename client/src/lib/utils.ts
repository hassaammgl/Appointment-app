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
        appId: import.meta.env.VITE_ONESIGNAL_APP_ID!,
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
