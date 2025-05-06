import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "./components/mode-toogle";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "@/routes";

const router = createBrowserRouter(routes);

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;

{
	/* <ModeToggle /> */
}
