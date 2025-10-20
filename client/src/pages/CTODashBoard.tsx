import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import DashBoards from "@/dashboards/others/DashBoards";
import OneSignalWrapper from "@/layout/OneSignalWrapper";

const CTODashBoard = () => {
  const { user } = useAuth();

  return (
    <OneSignalWrapper>
      <AppLayout allowedRoles={["cto"]}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              (CTO) <span className="text-green-500">{user?.username}</span>{" "}
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Technology strategy and innovation dashboard for managing
              technical initiatives, system architecture, and development teams
            </p>
          </div>
          <DashBoards />
        </div>
      </AppLayout>
    </OneSignalWrapper>
  );
};

export default CTODashBoard;
