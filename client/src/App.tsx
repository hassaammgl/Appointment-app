// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Toaster as Sonner } from "sonner"; // Only use Sonner as Toaster
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import { LoginPage } from "./pages/LoginPage";
// import { SignupPage } from "./pages/SignupPage";
// import { CTODashboard } from "./pages/CTODashboard";
// import { CEODashboard } from "./pages/CEODashboard";
// import { CFODashboard } from "./pages/CFODashboard";
// import { GMDashboard } from "./pages/GMDashboard";
// import { ReceptionistDashboard } from "./pages/ReceptionistDashboard";
// import { EmployeeDashboard } from "./pages/EmployeeDashboard";
// import { ProfilePage } from "./pages/ProfilePage";
// import { NotFoundPage } from "./pages/NotFoundPage";

// const App = () => {
// 	return (
// 		<BrowserRouter>
// 			<ThemeProvider>
// 				<TooltipProvider>
// 					<Routes>
// 						<Route path="/" element={<Navigate to="/login" />} />
// 						<Route path="/login" element={<LoginPage />} />
// 						<Route path="/signup" element={<SignupPage />} />
// 						<Route
// 							path="/cto-dashboard"
// 							element={<CTODashboard />}
// 						/>
// 						<Route
// 							path="/ceo-dashboard"
// 							element={<CEODashboard />}
// 						/>
// 						<Route
// 							path="/cfo-dashboard"
// 							element={<CFODashboard />}
// 						/>
// 						<Route path="/gm-dashboard" element={<GMDashboard />} />
// 						<Route
// 							path="/receptionist-dashboard"
// 							element={<ReceptionistDashboard />}
// 						/>
// 						<Route
// 							path="/employee-dashboard"
// 							element={<EmployeeDashboard />}
// 						/>
// 						<Route path="/profile" element={<ProfilePage />} />
// 						<Route path="*" element={<NotFoundPage />} />
// 					</Routes>
// 					<Sonner />
// 				</TooltipProvider>
// 			</ThemeProvider>
// 		</BrowserRouter>
// 	);
// };

// export default App;

// App.jsx
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "./routes";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";

const router = createBrowserRouter(routes);

const App = () => {
	return (
		<ThemeProvider>
			<TooltipProvider>
				<RouterProvider router={router} />
				<Sonner />
			</TooltipProvider>
		</ThemeProvider>
	);
};

export default App;
