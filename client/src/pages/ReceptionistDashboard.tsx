
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { MeetingRequestForm } from "@/components/forms/MeetingRequestForm";
import { useMeetings } from "@/contexts/MeetingContext";
import { MeetingCard } from "@/components/shared/MeetingCard";
import { Button } from "@/components/ui/button";

const meetingData = [
  { name: "Mon", meetings: 8 },
  { name: "Tue", meetings: 12 },
  { name: "Wed", meetings: 15 },
  { name: "Thu", meetings: 10 },
  { name: "Fri", meetings: 7 },
];

const chartConfig = {
  meetings: {
    label: "Meetings",
    color: "#16a34a",
  },
};

export const ReceptionistDashboard = () => {
  const { getAllMeetings, assignMeeting } = useMeetings();
  const allMeetings = getAllMeetings();
  
  return (
    <AppLayout allowedRoles={["receptionist"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receptionist Dashboard</h1>
          <p className="text-muted-foreground">
            Manage visitors and meeting schedules
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visitors">Today's Visitors</TabsTrigger>
            <TabsTrigger value="schedule">Meeting Schedule</TabsTrigger>
            <TabsTrigger value="requests">Meeting Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    3 pending check-ins
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Expected Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    7 already checked in
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Meeting Rooms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5/8</div>
                  <p className="text-xs text-muted-foreground">
                    Currently occupied
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Meeting Distribution</CardTitle>
                <CardDescription>
                  Daily meetings scheduled this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <div>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <BarChart data={meetingData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="meetings" fill="#16a34a" name="meetings" />
                    </BarChart>
                    <ChartLegend>
                      <ChartLegendContent />
                    </ChartLegend>
                  </div>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="visitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Michael Johnson</p>
                      <p className="text-sm text-muted-foreground">Meeting with CTO, 10:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Checked In</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sarah Williams</p>
                      <p className="text-sm text-muted-foreground">Meeting with CEO, 11:30 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Checked In</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">David Lee</p>
                      <p className="text-sm text-muted-foreground">Meeting with CFO, 1:00 PM</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Expected</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Emma Garcia</p>
                      <p className="text-sm text-muted-foreground">Meeting with GM, 2:30 PM</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Expected</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Robert Chen</p>
                      <p className="text-sm text-muted-foreground">Meeting with CTO, 3:45 PM</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Expected</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tech Team Standup</p>
                      <p className="text-sm text-muted-foreground">Conference Room A, 9:00 AM</p>
                    </div>
                    <span className="bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Investor Meeting</p>
                      <p className="text-sm text-muted-foreground">Boardroom, 10:00 AM</p>
                    </div>
                    <span className="bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Marketing Strategy</p>
                      <p className="text-sm text-muted-foreground">Meeting Room B, 11:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Upcoming</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Budget Review</p>
                      <p className="text-sm text-muted-foreground">Conference Room C, 1:00 PM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Upcoming</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Product Demo</p>
                      <p className="text-sm text-muted-foreground">Demo Room, 3:00 PM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Upcoming</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <MeetingRequestForm />
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Meeting Requests</CardTitle>
                  <CardDescription>View and manage recent meeting requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allMeetings.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No meeting requests yet</p>
                    ) : (
                      allMeetings.slice(0, 5).map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};
