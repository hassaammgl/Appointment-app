import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestMeetings from "@/dashboards/RequestedMeetings";
import ScheduleMeetings from "@/dashboards/ScheduleMeetings";
import { useState } from "react";

const ReceptionistDashBoard = () => {
	const [tabValue, setTabValue] = useState("requests");
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["receptionist"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Receptionist Dashboard
					</h1>
					<p className="text-muted-foreground">
						Manage visitors and meeting schedules
					</p>
				</div>
				<Tabs
					value={tabValue}
					onValueChange={setTabValue}
					className="w-full"
				>
					<TabsList className="mx-auto">
						<TabsTrigger value="requests">
							Meeting Requests
						</TabsTrigger>
						<TabsTrigger value="schedule">
							Schedule Meetings
						</TabsTrigger>
					</TabsList>
					<TabsContent value="requests">
						<RequestMeetings
							setTabValue={setTabValue}
							userId={user?.id}
						/>
					</TabsContent>
					<TabsContent value="schedule">
						<ScheduleMeetings
							setTabValue={setTabValue}
							userId={user?.id}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</AppLayout>
	);
};

export default ReceptionistDashBoard;
