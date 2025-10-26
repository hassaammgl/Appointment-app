import { Suspense, lazy } from "react";
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
import Loader from "@/components/Loader";
import RenewalPage from "@/pages/RenewalPage";

const routes = [
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loader />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/settings",
    element: (
      <Suspense fallback={<Loader />}>
        <SettingsPage />
      </Suspense>
    ),
  },
  {
    path: "/ceo-dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboards role="ceo" />
      </Suspense>
    ),
  },
  {
    path: "/cto-dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboards role="cto" />
      </Suspense>
    ),
  },
  {
    path: "/cfo-dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboards role="cfo" />
      </Suspense>
    ),
  },
  {
    path: "/gm-dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboards role="gm" />
      </Suspense>
    ),
  },
  {
    path: "/receptionist-dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <ReceptionistDashBoard />
      </Suspense>
    ),
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
