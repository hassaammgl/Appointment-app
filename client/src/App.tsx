import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "@/routes";
import { Toaster } from "sonner";

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
