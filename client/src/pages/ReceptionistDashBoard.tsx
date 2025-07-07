import { useState, lazy, Suspense } from "react";
import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestMeetings from "@/dashboards/Receptionist/RequestedMeetings";
const ScheduleMeetings = lazy(
	() => import("@/dashboards/Receptionist/ScheduleMeetings")
);
import { useMeetings } from "@/store/mettings";
import { Clock, AlertCircle, CheckCircle2, XCircle, PlusIcon } from "lucide-react";
import StatsCards from "@/dashboards/others/StatsCards";
import Loader from "@/components/Loader";
import type { StatsArrType } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const StatsArr: StatsArrType[] = [
	{
		title: "Total Requests",
		lengthName: "all",
		Icon: Clock,
	},
	{
		title: "Pending Requests",
		lengthName: "pending",
		Icon: AlertCircle,
	},
	{
		title: "Approved Requests",
		lengthName: "approved",
		Icon: CheckCircle2,
	},
	{
		title: "Rejected Requests",
		lengthName: "rejected",
		Icon: XCircle,
	},
];

const ReceptionistDashBoard = () => {
	const [tabValue, setTabValue] = useState("requests");
	const { user } = useAuth();
	const { meetings } = useMeetings();



	const getStatusCount = (status: string): number =>
		meetings.filter((request) =>
			status === "all" ? true : request.status === status
		).length;

	return (
		<AppLayout allowedRoles={["receptionist"]}>
			<div className="space-y-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Receptionist Dashboard
						</h1>
						<p className="text-muted-foreground">
							Manage visitors and meeting schedules
						</p>
					</div>
					<div>
						<Dialog>
							<DialogTrigger>
								<Button>
									<PlusIcon />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<ScheduleMeetings
									setTabValue={setTabValue}
									userId={user?.id}
								/>
							</DialogContent>
						</Dialog>
					</div>

				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{StatsArr.map((val, i) => (
						<StatsCards
							key={i}
							title={val.title}
							Icon={val.Icon}
							length={getStatusCount(val.lengthName ?? "all")}
						/>
					))}
				</div>
				<Suspense fallback={<Loader />}>
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
				</Suspense>
			</div>
		</AppLayout>
	);
};

export default ReceptionistDashBoard;
