import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import DashBoards from "@/dashboards/others/DashBoards";
import OneSignalWrapper from "@/layout/OneSignalWrapper";

const GMDashBoard = () => {
  const { user } = useAuth();

  return (
    <OneSignalWrapper>
      <AppLayout allowedRoles={["gm"]}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              (General Manager)
              <span className="text-green-500">{user?.username}</span> Dashboard
            </h1>
            <p className="text-muted-foreground">
              Operations and management dashboard for overseeing daily business
              activities, team performance, and departmental coordination
            </p>
          </div>
          <DashBoards />
        </div>
      </AppLayout>
    </OneSignalWrapper>
  );
};

export default GMDashBoard;
