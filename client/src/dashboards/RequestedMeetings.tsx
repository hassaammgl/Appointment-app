import React, { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/toast";
import { AxiosError } from "axios";

interface ScheduleMeetingsProps {
	userId?: string;
	setTabValue: (data: string) => void;
}

const RequestedMeetings = ({ userId }: ScheduleMeetingsProps) => {
	const [isFetchAgain, setIsFetchAgain] = useState<boolean>(false);
	const [layout, setLayout] = useState<"grid" | "list">("grid");

	const { fetchAllReq, meetings } = useMeetings();

	console.table(meetings[0]);

	const toggleFetchAgain = () => {
		setIsFetchAgain((prev) => !prev);
	};

	useEffect(() => {
		if (userId) fetchAllReq();
	}, [fetchAllReq, userId, isFetchAgain]);

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
								toggleFetchAgain={toggleFetchAgain}
							/>
						) : (
							<MeetingCardList
								toggleFetchAgain={toggleFetchAgain}
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

interface MeetingCardGridInterface {
	meeting: Meeting;
	toggleFetchAgain: () => void;
}

const MeetingCardGrid = ({
	meeting,
	toggleFetchAgain,
}: MeetingCardGridInterface) => {
	const [showDetails, setShowDetails] = useState(false);

	const { cancelMeetingReq } = useMeetings();
	const { info, removeAllToasts, success, error: errToast } = useToast();

	const priorityColors = {
		0: "text-green-500 border-green-500",
		1: "text-orange-500 border-orange-500",
		2: "text-red-500 border-red-500",
	};

	const statusColors = {
		pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
		approved: "bg-green-100 text-green-800 border-green-300",
		rejected: "bg-red-100 text-red-800 border-red-300",
	};

	const maskCnic = (cnic: string) => {
		return `${cnic.slice(0, 3)}*****${cnic.slice(-3)}`;
	};

	const maskPhone = (phone: string) => {
		return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
	};

	const handleCancelMeeting = async () => {
		try {
			info("cancelling Schedule...");
			await cancelMeetingReq(meeting._id);
			removeAllToasts();
			success("Request Removed");
			toggleFetchAgain();
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Requesting Schedule failed 😵";
			errToast(message);
		}
	};

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex flex-row items-start gap-4">
				<div className="flex-1">
					<CardTitle>{meeting.purpose}</CardTitle>
					<CardDescription className="mt-1">
						Visitor: {meeting.visitorName}
					</CardDescription>
				</div>
				<Badge
					variant={"outline"}
					className={`${
						priorityColors[meeting.priority]
					} border-[1px] rounded-full`}
				>
					{meeting.priority === 0
						? "Normal"
						: meeting.priority === 1
						? "High"
						: "Urgent"}
				</Badge>
				<Badge
					className={`${
						statusColors[meeting.status]
					} border-[1px] rounded-full`}
				>
					{meeting.status.charAt(0).toUpperCase() +
						meeting.status.slice(1)}
				</Badge>
			</CardHeader>
			<CardContent className="flex-1 space-y-2">
				<div className="text-sm space-y-1">
					<p>
						<strong>CNIC:</strong>{" "}
						{showDetails
							? meeting.visitorCnic
							: maskCnic(meeting.visitorCnic)}
					</p>
					<p>
						<strong>Contact:</strong>{" "}
						{showDetails
							? meeting.visitorNo
							: maskPhone(meeting.visitorNo)}
					</p>
				</div>
				<Button
					variant="link"
					size="sm"
					className="h-4 p-0 text-muted-foreground"
					onClick={() => setShowDetails(!showDetails)}
				>
					{showDetails ? "Hide details" : "Show details"}
				</Button>
				{meeting.notes && (
					<div className="pt-2">
						<p className="text-sm font-medium">Notes:</p>
						<p className="text-sm text-muted-foreground">
							{meeting.notes}
						</p>
					</div>
				)}
			</CardContent>
			<CardFooter className="text-sm flex justify-between text-muted-foreground">
				<span>{new Date(meeting.createdAt).toLocaleString()}</span>
				<Button onClick={handleCancelMeeting} variant={"destructive"}>
					Cancel Meeting
				</Button>
			</CardFooter>
		</Card>
	);
};

const MeetingCardList = ({ meeting }: { meeting: Meeting }) => {
	const [showDetails, setShowDetails] = useState(false);

	const priorityColors = {
		0: "bg-green-100 text-green-800 border-green-300",
		1: "bg-orange-100 text-orange-800 border-orange-300",
		2: "bg-red-100 text-red-800 border-red-300",
	};

	const statusColors = {
		pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
		approved: "bg-green-100 text-green-800 border-green-300",
		rejected: "bg-red-100 text-red-800 border-red-300",
	};

	const maskCnic = (cnic: string) =>
		`${cnic.slice(0, 3)}*****${cnic.slice(-3)}`;
	const maskPhone = (phone: string) =>
		`${phone.slice(0, 3)}****${phone.slice(-3)}`;

	return (
		<Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
			<div className="flex-1 space-y-1">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
					<div>
						<CardTitle>{meeting.purpose}</CardTitle>
						<CardDescription>
							Visitor: {meeting.visitorName}
						</CardDescription>
					</div>
					<div className="flex gap-2 ">
						<Badge
							className={`${
								priorityColors[meeting.priority]
							} border-[1px] rounded-full`}
						>
							{meeting.priority === 0
								? "Normal"
								: meeting.priority === 1
								? "High"
								: "Urgent"}
						</Badge>
						<Badge
							className={`${
								statusColors[meeting.status]
							} border-[1px] rounded-full`}
						>
							{meeting.status.charAt(0).toUpperCase() +
								meeting.status.slice(1)}
						</Badge>
					</div>
				</div>

				<div className="text-sm">
					<p>
						<strong>CNIC:</strong>{" "}
						{showDetails
							? meeting.visitorCnic
							: maskCnic(meeting.visitorCnic)}
					</p>
					<p>
						<strong>Contact:</strong>{" "}
						{showDetails
							? meeting.visitorNo
							: maskPhone(meeting.visitorNo)}
					</p>
				</div>

				<Button
					variant="link"
					size="sm"
					className="h-4 p-0 text-muted-foreground"
					onClick={() => setShowDetails(!showDetails)}
				>
					{showDetails ? "Hide details" : "Show details"}
				</Button>

				{meeting.notes && (
					<p className="text-sm text-muted-foreground">
						{meeting.notes}
					</p>
				)}
			</div>

			<div className="flex flex-col items-end gap-2">
				<p className="text-sm text-muted-foreground">
					{new Date(meeting.createdAt).toLocaleString()}
				</p>
			</div>
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
