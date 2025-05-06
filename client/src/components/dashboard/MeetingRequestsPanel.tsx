// import { useState } from "react";
// // import {  MeetingStatus, useMeetings } from "@/contexts/MeetingContext";
// import { useMeetings } from "@/contexts/MeetingContext";
// import type { Meeting ,  MeetingStatus } from "@/contexts/MeetingContext";
// // import type { Meeting } from "@/contexts/MeetingContext";
// import { MeetingCard } from "@/components/shared/MeetingCard";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Check, X } from "lucide-react";

// interface MeetingRequestsPanelProps {
//   userId: string;
// }

// export const MeetingRequestsPanel = ({ userId }: MeetingRequestsPanelProps) => {
//   const { getEmployeeMeetings, updateMeetingStatus } = useMeetings();
//   const [activeTab, setActiveTab] = useState<MeetingStatus | "all">("all");

//   // Get meetings assigned to the current user
//   const userMeetings = getEmployeeMeetings(userId);

//   // Filter meetings based on active tab
//   const filteredMeetings = userMeetings.filter((meeting) =>
//     activeTab === "all" || meeting.status === activeTab
//   );

//   // Handle approve/reject meeting request
//   const handleUpdateStatus = (meetingId: string, status: MeetingStatus) => {
//     updateMeetingStatus(meetingId, status);
//   };

//   return (
//     <Card className="col-span-full">
//       <CardHeader>
//         <CardTitle>Meeting Requests</CardTitle>
//         <CardDescription>
//           Review and manage your meeting requests
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <Tabs
//           defaultValue="all"
//           value={activeTab}
//           onValueChange={(value) => setActiveTab(value as MeetingStatus | "all")}
//         >
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="pending">Pending</TabsTrigger>
//             <TabsTrigger value="approved">Approved</TabsTrigger>
//             <TabsTrigger value="rejected">Rejected</TabsTrigger>
//           </TabsList>

//           <TabsContent value={activeTab} className="mt-6">
//             {filteredMeetings.length === 0 ? (
//               <div className="text-center py-6 bg-muted/20 rounded-lg">
//                 <p className="text-muted-foreground">No meeting requests to display</p>
//               </div>
//             ) : (
//               <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {filteredMeetings.map((meeting) => (
//                   <MeetingCard key={meeting.id} meeting={meeting}>
//                     {meeting.status === "pending" && (
//                       <div className="flex space-x-2">
//                         <Button
//                           className="flex-1"
//                           size="sm"
//                           onClick={() => handleUpdateStatus(meeting.id, "approved")}
//                         >
//                           <Check className="mr-1 h-4 w-4" />
//                           Approve
//                         </Button>
//                         <Button
//                           className="flex-1"
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleUpdateStatus(meeting.id, "rejected")}
//                         >
//                           <X className="mr-1 h-4 w-4" />
//                           Reject
//                         </Button>
//                       </div>
//                     )}
//                     {meeting.status !== "pending" && (
//                       <div className="text-center text-sm text-muted-foreground">
//                         Status: {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
//                       </div>
//                     )}
//                   </MeetingCard>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// };

import { useState, useEffect } from "react";
import { MeetingCard } from "@/components/shared/MeetingCard";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";

// Define types for meeting and status
type MeetingStatus = "pending" | "approved" | "rejected";
interface Meeting {
	id: string;
	title: string;
	date: string;
	status: MeetingStatus;
}

interface MeetingRequestsPanelProps {
	userId: string;
}

export const MeetingRequestsPanel = ({ userId }: MeetingRequestsPanelProps) => {
	const [activeTab, setActiveTab] = useState<MeetingStatus | "all">("all");
	const [userMeetings, setUserMeetings] = useState<Meeting[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Simulate fetching meeting data
	const fetchMeetings = async () => {
		try {
			setLoading(true);
			// Simulating an API call to fetch meetings
			const meetings = [
				{
					id: "1",
					title: "Budget Planning",
					date: "2025-06-15",
					status: "pending",
				},
				{
					id: "2",
					title: "Financial Review",
					date: "2025-06-20",
					status: "approved",
				},
				{
					id: "3",
					title: "Quarterly Earnings",
					date: "2025-07-01",
					status: "rejected",
				},
				{
					id: "4",
					title: "Year-End Report",
					date: "2025-08-15",
					status: "pending",
				},
			];
			setUserMeetings(meetings);
		} catch (err) {
			setError("Failed to load meetings.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMeetings();
	}, [userId]);

	const filteredMeetings = userMeetings?.filter(
		(meeting) => activeTab === "all" || meeting.status === activeTab
	);

	const handleUpdateStatus = (meetingId: string, status: MeetingStatus) => {
		setUserMeetings((prevMeetings) =>
			prevMeetings?.map((meeting) =>
				meeting.id === meetingId ? { ...meeting, status } : meeting
			)
		);
	};

	const renderEmptyState = () => {
		switch (activeTab) {
			case "pending":
				return "No pending meetings.";
			case "approved":
				return "No approved meetings.";
			case "rejected":
				return "No rejected meetings.";
			default:
				return "No meetings to display.";
		}
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
					onValueChange={(value) =>
						setActiveTab(value as MeetingStatus | "all")
					}
				>
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="pending">Pending</TabsTrigger>
						<TabsTrigger value="approved">Approved</TabsTrigger>
						<TabsTrigger value="rejected">Rejected</TabsTrigger>
					</TabsList>

					<TabsContent value={activeTab} className="mt-6">
						{loading ? (
							<div className="text-center py-6 bg-muted/20 rounded-lg">
								<p className="text-muted-foreground">
									Loading meetings...
								</p>
							</div>
						) : error ? (
							<div className="text-center py-6 bg-muted/20 rounded-lg">
								<p className="text-muted-foreground">{error}</p>
							</div>
						) : filteredMeetings?.length === 0 ? (
							<div className="text-center py-6 bg-muted/20 rounded-lg">
								<p className="text-muted-foreground">
									{renderEmptyState()}
								</p>
							</div>
						) : (
							<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{filteredMeetings.map((meeting) => (
									<MeetingCard
										key={meeting.id}
										meeting={meeting}
									>
										{meeting.status === "pending" && (
											<div className="flex space-x-2">
												<Button
													className="flex-1"
													size="sm"
													onClick={() =>
														handleUpdateStatus(
															meeting.id,
															"approved"
														)
													}
												>
													<Check className="mr-1 h-4 w-4" />
													Approve
												</Button>
												<Button
													className="flex-1"
													variant="destructive"
													size="sm"
													onClick={() =>
														handleUpdateStatus(
															meeting.id,
															"rejected"
														)
													}
												>
													<X className="mr-1 h-4 w-4" />
													Reject
												</Button>
											</div>
										)}
										{meeting.status !== "pending" && (
											<div className="text-center text-sm text-muted-foreground">
												Status:{" "}
												{meeting.status
													.charAt(0)
													.toUpperCase() +
													meeting.status.slice(1)}
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
