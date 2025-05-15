import StatsCards from "@/dashboards/others/StatsCards";
import { Input } from "@/components/ui/input";
import {
	Search,
	Clock,
	AlertCircle,
	CheckCircle2,
	XCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMeetings } from "@/store/mettings";
import { useEffect, useState } from "react";
import RequestsTable from "./RequestsTable";
import { useAuth } from "@/store/auth";

interface StatsArrType {
	title: string;
	lengthName: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

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

const DashBoards = () => {
	const { fetchAllReqsByRoles, meetings = [] } = useMeetings();
	const [isFetchAgain, setIsFetchAgain] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		fetchAllReqsByRoles(user?.id);
	}, [fetchAllReqsByRoles, isFetchAgain]);

	const toggleFetchAgain = () => setIsFetchAgain((prev) => !prev);

	useEffect(() => {
		const interval = setInterval(() => {
			console.log("Fetching again");
			toggleFetchAgain();
		}, 1000 * 60);
		return () => clearInterval(interval);
	}, []);

	const [mainTabValue, setMainTabValue] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredRequests = meetings.filter((request) => {
		const matchesStatus =
			mainTabValue === "all" ? true : request?.status === mainTabValue;
		const matchesSearch = request?.visitorName
			?.toLowerCase()
			.includes(searchQuery.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	const getStatusCount = (status: string): number =>
		meetings.filter((request) =>
			status === "all" ? true : request.status === status
		).length;

	return (
		<div className="w-full h-fit border-[1px] p-4 rounded-xl">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{StatsArr.map((val, i) => (
					<StatsCards
						key={i}
						title={val.title}
						Icon={val.Icon}
						length={getStatusCount(val.lengthName)}
					/>
				))}
			</div>

			<div className="flex flex-col gap-4 mt-4">
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
							All ({getStatusCount("all")})
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
						<RequestsTable
							toggleFetchAgain={toggleFetchAgain}
							requests={filteredRequests}
						/>
					</TabsContent>
					<TabsContent value="pending">
						<RequestsTable
							toggleFetchAgain={toggleFetchAgain}
							requests={filteredRequests}
						/>
					</TabsContent>
					<TabsContent value="approved">
						<RequestsTable
							toggleFetchAgain={toggleFetchAgain}
							requests={filteredRequests}
						/>
					</TabsContent>
					<TabsContent value="rejected">
						<RequestsTable
							toggleFetchAgain={toggleFetchAgain}
							requests={filteredRequests}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default DashBoards;
