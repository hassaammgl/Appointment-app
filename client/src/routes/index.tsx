import { redirect } from "react-router";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";
import CEODashBoard from "@/pages/CEODashBoard";

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
		path: "/ceo-dashboard",
		element: <CEODashBoard />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routes;
