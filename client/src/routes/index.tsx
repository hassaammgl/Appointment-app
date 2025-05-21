import { redirect } from "react-router";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";
import CEODashBoard from "@/pages/CEODashBoard";
import CTODashBoard from "@/pages/CTODashBoard";
import CFODashBoard from "@/pages/CFODashBoard";
import ReceptionistDashBoard from "@/pages/ReceptionistDashBoard";
import GMDashBoard from "@/pages/GMDashBoard";
import SettingsPage from "@/pages/SettingsPage";
import RenewalPage from "@/pages/RenewalPage";

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
	{
		path: "/profile",
		element: <ProfilePage />,
	},
	{
		path: "/settings",
		element: <SettingsPage />,
	},
	{
		path: "/ceo-dashboard",
		element: <CEODashBoard />,
	},
	{
		path: "/cto-dashboard",
		element: <CTODashBoard />,
	},
	{
		path: "/cfo-dashboard",
		element: <CFODashBoard />,
	},
	{
		path: "/receptionist-dashboard",
		element: <ReceptionistDashBoard />,
	},
	{
		path: "/gm-dashboard",
		element: <GMDashBoard />,
	},
	{
		path: "/dev/:id/renew",
		element: <RenewalPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routes;
