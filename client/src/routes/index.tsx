import { lazy } from "react";
import { redirect } from "react-router";
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
import ProfilePage from "@/pages/ProfilePage";
const ReceptionistDashBoard = lazy(
  () => import("@/pages/ReceptionistDashBoard")
);
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const Dashboards = lazy(() => import("@/pages/Dashboards"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const RenewalPage = lazy(() => import("@/pages/RenewalPage"));
import MySuspense from "./MySuspense";

const routes = [
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    path: "/login",
    element: (
      <MySuspense>
        <LoginPage />
      </MySuspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <MySuspense>
        <SignupPage />
      </MySuspense>
    ),
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
    element: (
      <MySuspense>
        <Dashboards role="ceo" />
      </MySuspense>
    ),
  },
  {
    path: "/cto-dashboard",
    element: (
      <MySuspense>
        <Dashboards role="cto" />
      </MySuspense>
    ),
  },
  {
    path: "/cfo-dashboard",
    element: (
      <MySuspense>
        <Dashboards role="cfo" />
      </MySuspense>
    ),
  },
  {
    path: "/gm-dashboard",
    element: (
      <MySuspense>
        <Dashboards role="gm" />
      </MySuspense>
    ),
  },
  {
    path: "/receptionist-dashboard",
    element: (
      <MySuspense>
        <ReceptionistDashBoard />
      </MySuspense>
    ),
  },
  {
    path: "/dev/:id/renew",
    element: (
      <MySuspense>
        <RenewalPage />
      </MySuspense>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
