import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestMeetings from "@/dashboards/Receptionist/RequestedMeetings";
import ScheduleMeetings from "@/dashboards/Receptionist/ScheduleMeetings";
import { useState } from "react";
import { useMeetings } from "@/store/mettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReceptionistDashBoard = () => {
	const [tabValue, setTabValue] = useState("requests");
	const { user } = useAuth();
	const { meetings } = useMeetings();
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

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
					{["pending", "approved", "rejected"].map((type, i) => (
						<BadgeCards meetings={meetings[0]} typeFilter={type} />
					))}
				</div>

				<Tabs
					value={tabValue}
					onValueChange={setTabValue}
					className="w-full"
				>
					<TabsList className="mx-auto mb-2">
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

interface Metting {
	_id?: string;
	visitorName?: string;
	visitorNo?: string;
	visitorCnic?: string;
	purpose?: string;
	status?: string;
	priority?: number;
	createdBy?: string;
	to?: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

interface BadgeCardsInterface {
	meetings: Metting[];
	typeFilter: string;
}

const BadgeCards = ({ meetings, typeFilter }: BadgeCardsInterface) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Rejected Requests</CardTitle>
			</CardHeader>
			<CardContent className="text-6xl flex justify-end">
				{
					meetings.filter((met) => {
						return met.status === typeFilter;
					}).length
				}
			</CardContent>
		</Card>
	);
};
