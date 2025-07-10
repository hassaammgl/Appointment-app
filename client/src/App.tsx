import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "@/routes";
import { Toaster } from "sonner";
import useFCM from "@/hooks/useFCM";

const router = createBrowserRouter(routes);

const App = () => {
	useFCM();
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
			<Toaster position="top-center" richColors />
		</ThemeProvider>
	);
}

export default App;
