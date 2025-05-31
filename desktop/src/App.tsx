import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Route from "@/routes";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<Route />
			<Toaster position="top-center" richColors />
		</ThemeProvider>
	);
}

export default App;
