import { useAuth } from "@/store/auth";
import OneSignalWrapper from "@/layout/OneSignalWrapper";
import { AppLayout } from "@/layout/AppLayout";
import UserDashBoard from "@/dashboards/others/UserDashBoards";

const Dashboards = ({ role }: { role: string }) => {
  const { user } = useAuth();
  return (
    <OneSignalWrapper>
      <AppLayout allowedRoles={[role]}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <sup className="text-sm">({user?.role?.toUpperCase()})</sup>
              <span className="text-primary">
                {" "}
                {user?.username?.toUpperCase()}{" "}
              </span>
              Dashboard
            </h1>
            <p className="text-muted-foreground">{roleDetails(role)}</p>
          </div>
          <UserDashBoard />
        </div>
      </AppLayout>
    </OneSignalWrapper>
  );
};

export default Dashboards;

const roleDetails = (role: string) => {
  switch (role) {
    case "ceo":
      return "Executive overview and meeting management.";
    case "cfo":
      return "Financial oversight and strategic planning dashboard for managing company finances, budgets, and financial reporting.";
    case "cto":
      return "Technology strategy and innovation dashboard for managing technical initiatives, system architecture, and development teams.";
    case "gm":
      return "Operations and management dashboard for overseeing daily business activities, team performance, and departmental coordination.";
    default:
      return "No Role Provided";
  }
};
