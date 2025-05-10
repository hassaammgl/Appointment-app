import { useEffect, useState } from "react";
import { useMeetings } from "@/store/mettings";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RequestedMeetings = ({ userId }: { userId: string | undefined }) => {
	const { fetchAllReq, meetings } = useMeetings();
	const [layout, setLayout] = useState<"grid" | "list">("grid");

	console.table(meetings[0]);

	useEffect(() => {
		if (userId) fetchAllReq();
	}, [fetchAllReq, userId]);

	return (
		<div className="w-full rounded-xl border border-accent p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">
				Latest Requests
			</h1>

			{/* Toggle Layout */}
			<div className="flex justify-end mb-4">
				<span className="rounded-xl border border-accent flex overflow-hidden">
					<Button
						onClick={() => setLayout("grid")}
						variant={layout === "grid" ? "default" : "outline"}
					>
						<LayoutGrid />
					</Button>
					<Separator orientation="vertical" />
					<Button
						onClick={() => setLayout("list")}
						variant={layout === "list" ? "default" : "outline"}
					>
						<LayoutList />
					</Button>
				</span>
			</div>

			{/* Render Cards */}
			{meetings[0]?.length > 0 ? (
				<div
					className={
						layout === "grid"
							? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
							: "flex flex-col gap-4"
					}
				>
					{meetings[0]?.map((meeting) =>
						layout === "grid" ? (
							<MeetingCardGrid
								key={meeting?._id}
								meeting={meeting}
							/>
						) : (
							<MeetingCardList
								key={meeting?._id}
								meeting={meeting}
							/>
						)
					)}
				</div>
			) : (
				<p className="text-center text-muted-foreground py-8">
					{userId
						? "No meeting requests yet 🙃"
						: "No user ID provided 🧐"}
				</p>
			)}
		</div>
	);
};

export default RequestedMeetings;

const MeetingCardList = ({ meeting }: { meeting: Meeting }) => {
	return (
		<Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
			<div>
				<CardTitle>{meeting?.purpose}</CardTitle>
				<CardDescription>
					{meeting?.notes || "No description"}
				</CardDescription>
				<CardContent className="text-sm text-muted-foreground mt-1">
					{new Date(meeting?.createdAt).toLocaleString()}
				</CardContent>
			</div>
		</Card>
	);
};

const MeetingCardGrid = ({ meeting }: { meeting: Meeting }) => {
	return (
		<Card>
			<CardHeader className="flex">
				<CardTitle>{meeting?.purpose}</CardTitle>
				<Badge  variant={"secondary"} >
					
				</Badge>
			</CardHeader>
			<CardContent className="text-sm text-muted-foreground">
				<CardDescription>
					{meeting?.notes || "No description"}
				</CardDescription>
				{new Date(meeting?.createdAt).toLocaleString()}
			</CardContent>
		</Card>
	);
};

interface Meeting {
	_id: string;
	visitorName: string;
	visitorNo: string;
	visitorCnic: string;
	purpose: string;
	status: "pending" | "approved" | "rejected";
	priority: 0 | 1 | 2;
	createdBy: string;
	to: string;
	notes: string;
	createdAt: string;
	updatedAt: string;
}
