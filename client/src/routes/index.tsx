// routes.js
import { redirect } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
// import { CTODashboard } from "../pages/CTODashboard";
// import { CEODashboard } from "../pages/CEODashboard";
// import { CFODashboard } from "../pages/CFODashboard";
// import { GMDashboard } from "../pages/GMDashboard";
import { ReceptionistDashboard } from "../pages/ReceptionistDashboard";
// import { EmployeeDashboard } from "../pages/EmployeeDashboard";
// import { ProfilePage } from "../pages/ProfilePage";
import { NotFoundPage } from "../pages/NotFoundPage";

const routes = [
	{
		path: "/",
		loader: () => redirect("/login"),
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
	// {
	// 	path: "/cto-dashboard",
	// 	element: <CTODashboard />,
	// },
	// {
	// 	path: "/ceo-dashboard",
	// 	element: <CEODashboard />,
	// },
	// {
	// 	path: "/cfo-dashboard",
	// 	element: <CFODashboard />,
	// },
	// {
	// 	path: "/gm-dashboard",
	// 	element: <GMDashboard />,
	// },
	{
		path: "/receptionist-dashboard",
		element: <ReceptionistDashboard />,
	},
	// {
	// 	path: "/profile",
	// 	element: <ProfilePage />,
	// },
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routes;
