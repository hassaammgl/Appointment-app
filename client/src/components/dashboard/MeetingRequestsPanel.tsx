
import { useState } from "react";
import { Meeting, MeetingStatus, useMeetings } from "@/contexts/MeetingContext";
import { MeetingCard } from "@/components/shared/MeetingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";

interface MeetingRequestsPanelProps {
  userId: string;
}

export const MeetingRequestsPanel = ({ userId }: MeetingRequestsPanelProps) => {
  const { getEmployeeMeetings, updateMeetingStatus } = useMeetings();
  const [activeTab, setActiveTab] = useState<MeetingStatus | "all">("all");
  
  // Get meetings assigned to the current user
  const userMeetings = getEmployeeMeetings(userId);
  
  // Filter meetings based on active tab
  const filteredMeetings = userMeetings.filter((meeting) => 
    activeTab === "all" || meeting.status === activeTab
  );

  // Handle approve/reject meeting request
  const handleUpdateStatus = (meetingId: string, status: MeetingStatus) => {
    updateMeetingStatus(meetingId, status);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Meeting Requests</CardTitle>
        <CardDescription>
          Review and manage your meeting requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as MeetingStatus | "all")}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredMeetings.length === 0 ? (
              <div className="text-center py-6 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">No meeting requests to display</p>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting}>
                    {meeting.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          className="flex-1"
                          size="sm"
                          onClick={() => handleUpdateStatus(meeting.id, "approved")}
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          className="flex-1"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleUpdateStatus(meeting.id, "rejected")}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {meeting.status !== "pending" && (
                      <div className="text-center text-sm text-muted-foreground">
                        Status: {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                      </div>
                    )}
                  </MeetingCard>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
