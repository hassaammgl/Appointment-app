import { useState } from "react";
import { useMeetings } from "@/store/mettings";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { EyeClosed, Eye } from "lucide-react";
import type { MeetingCardInterface } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/store/settings";

const MettingCards = ({ meeting, toggleFetchAgain }: MeetingCardInterface) => {
	const [showDetails, setShowDetails] = useState(false);

	const { cancelMeetingReq } = useMeetings();
	const { settings } = useSettings();
	
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
		<Card className="h-full flex flex-col w-full">
			<CardHeader className="flex flex-row items-start gap-4">
				{settings.addPurpose && meeting.purpose && (
					<div className="flex-1 flex w-1/2">
						<CardTitle>{meeting.purpose}</CardTitle>
					</div>
				)}
				<div
					className={`flex flex-row justify-end ${
						settings.addPurpose === true ? "w-1/2" : "w-full"
					} gap-4`}
				>
					<Badge
						variant={"outline"}
						className={`${
							priorityColors[meeting.priority]
						} border-[1px] rounded-full uppercase`}
					>
						{meeting.priority === 0
							? "Normal"
							: meeting.priority === 1
							? "High"
							: "Urgent"}
					</Badge>
					<Badge
						className={`${
							statusColors[
								(meeting?.status as keyof typeof statusColors) ||
									"pending"
							]
						} border-[1px] rounded-full uppercase`}
					>
						{meeting.status}
					</Badge>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className="flex-1 space-y-2 relative">
				<div className="text-sm space-y-1">
					<p>
						<strong>Visitor:</strong> {meeting.visitorName}
					</p>
				</div>
				<Separator />
				<div className="text-sm space-y-1">
					{settings.addPersonContact && meeting.visitorNo && (
						<p>
							<strong>Contact:</strong>{" "}
							{showDetails
								? meeting.visitorNo
								: maskPhone(meeting.visitorNo)}
						</p>
					)}
					{settings.addPersonCnic && meeting.visitorCnic && (
						<p>
							<strong>ID No:</strong>{" "}
							{showDetails
								? meeting.visitorCnic
								: maskCnic(meeting.visitorCnic)}
						</p>
					)}
					{((settings.addPersonContact && meeting.visitorNo) ||
						(settings.addPersonCnic && meeting.visitorCnic)) && (
						<Button
							variant="link"
							size="sm"
							className="text-muted-foreground transition-colors bg-accent ease-in-out duration-500 hover:text-green-500 hover:bg-green-900"
							onClick={() => setShowDetails(!showDetails)}
						>
							{showDetails ? (
								<>
									{"Hide "}
									<EyeClosed />
								</>
							) : (
								<>
									{"Show "}
									<Eye />
								</>
							)}
						</Button>
					)}
				</div>
				{((settings.addPersonContact && meeting.visitorNo) ||
					(settings.addPersonCnic && meeting.visitorCnic)) && (
					<Separator />
				)}

				<div className="text-sm space-y-1">
					<p>
						<b>With:</b>{" "}
						<span className="text-green-500">
							({meeting?.to?.role})
						</span>{" "}
						{meeting?.to?.username}
					</p>
				</div>

				{settings.addNotes && <Separator />}
				{settings.addNotes && meeting.notes && (
					<div className="pt-2">
						<p className="text-sm font-medium">Notes:</p>
						<p className="text-sm text-muted-foreground">
							{meeting.notes}
						</p>
					</div>
				)}
			</CardContent>
			<Separator />
			<CardFooter className="text-sm flex justify-between text-muted-foreground">
				<span>{new Date(meeting.createdAt).toLocaleString()}</span>
				<Button
					disabled={meeting.status !== "pending" ? true : false}
					onClick={handleCancelMeeting}
					variant={"destructive"}
				>
					Cancel Meeting
				</Button>
			</CardFooter>
		</Card>
	);
};

export default MettingCards;
