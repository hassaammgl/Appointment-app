import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import DashBoards from "@/dashboards/others/DashBoards";
import OneSignalWrapper from "@/layout/OneSignalWrapper";

const CFODashBoard = () => {
  const { user } = useAuth();

  return (
    <OneSignalWrapper>
      <AppLayout allowedRoles={["cfo"]}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              (CFO) <span className="text-green-500">{user?.username}</span>{" "}
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Financial oversight and strategic planning dashboard for managing
              company finances, budgets, and financial reporting
            </p>
          </div>
          <DashBoards />
        </div>
      </AppLayout>
    </OneSignalWrapper>
  );
};

export default CFODashBoard;
