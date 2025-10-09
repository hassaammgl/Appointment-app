import PWABadge from "./PWABadge.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "@/routes";
import { Toaster } from "sonner";
import {useOneSignal} from "@/fetaure/onesignal"

const router = createBrowserRouter(routes);

function App() {
  useOneSignal();
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
      <PWABadge />
    </>
  );
}

export default App;
