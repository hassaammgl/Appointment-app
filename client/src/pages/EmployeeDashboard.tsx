
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useMeetings } from "@/contexts/MeetingContext";
import { MeetingCard } from "@/components/shared/MeetingCard";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MeetingStatus } from "@/contexts/MeetingContext";

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { getEmployeeMeetings, updateMeetingStatus } = useMeetings();
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | "all">("all");
  
  const employeeMeetings = user ? getEmployeeMeetings(user.id) : [];
  
  // Apply status filter
  const filteredMeetings = employeeMeetings.filter((meeting) => {
    return statusFilter === "all" || meeting.status === statusFilter;
  });

  const handleUpdateStatus = (meetingId: string, status: MeetingStatus) => {
    updateMeetingStatus(meetingId, status);
  };

  return (
    <AppLayout allowedRoles={["employee"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your assigned meeting requests
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="max-w-xs">
            <Select 
              onValueChange={(value) => setStatusFilter(value as MeetingStatus | "all")}
              defaultValue="all"
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Meetings Grid */}
        {filteredMeetings.length === 0 ? (
          <div className="text-center p-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">No meetings assigned to you</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting}>
                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-green-primary hover:bg-green-dark"
                    size="sm"
                    variant={meeting.status === "approved" ? "default" : "outline"}
                    onClick={() => handleUpdateStatus(meeting.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    className="flex-1"
                    size="sm"
                    variant={meeting.status === "rejected" ? "destructive" : "outline"}
                    onClick={() => handleUpdateStatus(meeting.id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </MeetingCard>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
