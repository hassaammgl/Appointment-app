import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "@/routes";
import { Toaster } from "sonner";
import { initOneSignal } from "./utils/OneSignalConfig.ts";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    initOneSignal();
  }, []);
  // useFCM();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
};

export default App;
