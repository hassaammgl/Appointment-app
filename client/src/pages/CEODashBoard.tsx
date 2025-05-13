// import { AppLayout } from "@/layout/Applayout";
// import { useAuth } from "@/store/auth";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";

// const CEODashBoard = () => {
// 	const [maintabValue, setMainTabValue] = useState("all");
// 	const { user } = useAuth();
// 	console.log(user);

// 	return (
// 		<AppLayout allowedRoles={["ceo"]}>
// 			<div className="space-y-8">
// 				<div>
// 					<h1 className="text-3xl font-bold tracking-tight">
// 						CEO Dashboard
// 					</h1>
// 					<p className="text-muted-foreground">
// 						Executive overview and meeting management
// 					</p>
// 				</div>
// 				<Tabs
// 					value={maintabValue}
// 					onValueChange={setMainTabValue}
// 					className="w-full"
// 				>
// 					<TabsList className="mx-auto">
// 						<TabsTrigger value="all">All</TabsTrigger>
// 						<TabsTrigger value="pending">Pending</TabsTrigger>
// 						<TabsTrigger value="approved">Approved</TabsTrigger>
// 						<TabsTrigger value="rejected">Rejected</TabsTrigger>
// 					</TabsList>
// 					<TabsContent value="all">
// 						All Requests
// 						<NestedTabs />
// 					</TabsContent>
// 					<TabsContent value="pending">
// 						Pending Requests
// 						<NestedTabs />
// 					</TabsContent>
// 					<TabsContent value="approved">
// 						Approved Requests
// 						<NestedTabs />
// 					</TabsContent>
// 					<TabsContent value="rejected">
// 						Rejected Requests
// 						<NestedTabs />
// 					</TabsContent>
// 				</Tabs>
// 			</div>
// 		</AppLayout>
// 	);
// };

// export default CEODashBoard;

// const NestedTabs = () => {
// 	const [nestedtabValue, setNestedTabValue] = useState("all");
// 	return (
// 		<Tabs
// 			value={nestedtabValue}
// 			onValueChange={setNestedTabValue}
// 			className="w-full"
// 		>
// 			<TabsList className="mx-auto">
// 				<TabsTrigger value="all-requests">All Requests</TabsTrigger>
// 				<TabsTrigger value="normal-requests">
// 					Normal Requests
// 				</TabsTrigger>
// 				<TabsTrigger value="med-requests">Medium Requests</TabsTrigger>
// 				<TabsTrigger value="urgent-requests">
// 					Urgent Requests
// 				</TabsTrigger>
// 			</TabsList>
// 			<TabsContent value="all-requests">All Requests</TabsContent>
// 			<TabsContent value="urgent-requests">Urgent Requests</TabsContent>
// 			<TabsContent value="med-requests">Medium Requests</TabsContent>
// 			<TabsContent value="normal-requests">Normal Requests</TabsContent>
// 		</Tabs>
// 	);
// };

import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Search,
	Clock,
	AlertCircle,
	CheckCircle2,
	XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type AppointmentRequest = {
	id: string;
	name: string;
	date: string;
	type: string;
	priority: "normal" | "med" | "urgent";
	status: "pending" | "approved" | "rejected";
	requester: string;
};

const mockRequests: AppointmentRequest[] = [
	{
		id: "1",
		name: "Board Meeting",
		date: "2024-03-20",
		type: "Internal",
		priority: "urgent",
		status: "pending",
		requester: "CFO",
	},
	{
		id: "2",
		name: "Investor Presentation",
		date: "2024-03-22",
		type: "External",
		priority: "med",
		status: "approved",
		requester: "COO",
	},
	// Add more mock data...
];

const CEODashBoard = () => {
	const { user } = useAuth();
	const [mainTabValue, setMainTabValue] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredRequests = mockRequests.filter((request) => {
		const matchesStatus =
			mainTabValue === "all" ? true : request.status === mainTabValue;
		const matchesSearch = request.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	const getStatusCount = (status: string) =>
		mockRequests.filter((request) =>
			status === "all" ? true : request.status === status
		).length;

	return (
		<AppLayout allowedRoles={["ceo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CEO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Executive overview and meeting management
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Requests
							</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{mockRequests.length}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Pending
							</CardTitle>
							<AlertCircle className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{getStatusCount("pending")}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Approved
							</CardTitle>
							<CheckCircle2 className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{getStatusCount("approved")}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Rejected
							</CardTitle>
							<XCircle className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{getStatusCount("rejected")}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="relative w-full max-w-md">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search appointments..."
								className="w-full pl-8"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					<Tabs value={mainTabValue} onValueChange={setMainTabValue}>
						<TabsList className="w-full">
							<TabsTrigger value="all">
								All ({mockRequests.length})
							</TabsTrigger>
							<TabsTrigger value="pending">
								Pending ({getStatusCount("pending")})
							</TabsTrigger>
							<TabsTrigger value="approved">
								Approved ({getStatusCount("approved")})
							</TabsTrigger>
							<TabsTrigger value="rejected">
								Rejected ({getStatusCount("rejected")})
							</TabsTrigger>
						</TabsList>

						<TabsContent value="all">
							<RequestsTable requests={filteredRequests} />
						</TabsContent>
						<TabsContent value="pending">
							<RequestsTable requests={filteredRequests} />
						</TabsContent>
						<TabsContent value="approved">
							<RequestsTable requests={filteredRequests} />
						</TabsContent>
						<TabsContent value="rejected">
							<RequestsTable requests={filteredRequests} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</AppLayout>
	);
};

const RequestsTable = ({ requests }: { requests: AppointmentRequest[] }) => {
	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "urgent":
				return "red";
			case "med":
				return "orange";
			default:
				return "green";
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Meeting Name</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Priority</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Requester</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request) => (
					<TableRow key={request.id}>
						<TableCell className="font-medium">
							{request.name}
						</TableCell>
						<TableCell>
							{new Date(request.date).toLocaleDateString()}
						</TableCell>
						<TableCell>{request.type}</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className={`text-${getPriorityColor(
									request.priority
								)}-500`}
							>
								{request.priority}
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant={
									request.status === "approved"
										? "default"
										: "secondary"
								}
							>
								{request.status}
							</Badge>
						</TableCell>
						<TableCell>{request.requester}</TableCell>
						<TableCell>
							{request.status === "pending" ? (
								<div className="flex gap-2">
									<Button size="sm" variant="success">
										Approve
									</Button>
									<Button size="sm" variant="destructive">
										Reject
									</Button>
								</div>
							) : (
								<Button size="sm" variant="ghost">
									View Details
								</Button>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default CEODashBoard;