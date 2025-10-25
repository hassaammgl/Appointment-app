import { redirect } from "react-router";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";
// import CEODashBoard from "@/pages/CEODashBoard";
// import CTODashBoard from "@/pages/CTODashBoard";
// import CFODashBoard from "@/pages/CFODashBoard";
import ReceptionistDashBoard from "@/pages/ReceptionistDashBoard";
// import GMDashBoard from "@/pages/GMDashBoard";
import SettingsPage from "@/pages/SettingsPage";
import Dashboards from "@/pages/Dashboards";
// import RenewalPage from "@/pages/RenewalPage";

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
    element: <Dashboards role="ceo" />,
  },
  {
    path: "/cto-dashboard",
    element: <Dashboards role="cto" />,
  },
  {
    path: "/cfo-dashboard",
    element: <Dashboards role="cfo" />,
  },
  {
	  path: "/gm-dashboard",
	  element: <Dashboards role="gm" />,
	},
	{
	  path: "/receptionist-dashboard",
	  element: <ReceptionistDashBoard />,
	},
  // {
  //   path: "/dev/:id/renew",
  //   element: <RenewalPage />,
  // },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
