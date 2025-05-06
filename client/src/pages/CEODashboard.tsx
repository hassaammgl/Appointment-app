import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

export const CEODashboard = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout allowedRoles={["ceo"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CEO Dashboard</h1>
          <p className="text-muted-foreground">
            Executive overview and meeting management
          </p>
        </div>
        
        {user && <MeetingRequestsPanel userId={user.id} />}
      </div>
    </AppLayout>
  );
};
