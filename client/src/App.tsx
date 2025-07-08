import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "@/routes";
import { Toaster } from "sonner";
import useFCM from "@/hooks/useFCM";

const router = createBrowserRouter(routes);

function App() {

	const vapidKey = import.meta.env.VITE_VAPID_KEY;
	useFCM(vapidKey);


	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
			<Toaster position="top-center" richColors />
		</ThemeProvider>
	);
}

export default App;
