import type { Appointment } from "@/store/mettings";
import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast";
import { useMeetings } from "@/store/mettings";
import { AxiosError } from "axios";
import { useState } from "react";

const RequestsTable = ({ requests }: { requests: Appointment[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Visitor Name</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Priority</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
					<TableHead>Set Priority</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.length > 0 ? (
					requests.map((request) => {
						return <T_Row key={request._id} data={request} />;
					})
				) : (
					<TableRow>
						<span className="text-center w-full">
							No meeting requests yet 🙃
						</span>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

const T_Row = ({ data }: { data: Appointment }) => {
	const { approveMeetingReq, rejectMeetingReq, updatePriority } =
		useMeetings();
	const { info, removeAllToasts, success, error: errToast } = useToast();

	console.log(typeof data.priority);

	const [priority, setPriority] = useState(data.priority);

	const handleApprove = async () => {
		try {
			info("Approving Schedule...");
			await approveMeetingReq(data._id);
			removeAllToasts();
			success("Request Approved");
		} catch (err) {
			removeAllToasts();
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Requesting Approved failed 😵";
			errToast(message);
		}
	};
	const handleReject = async () => {
		try {
			info("Rejecting Schedule...");
			await rejectMeetingReq(data._id);
			removeAllToasts();
			success("Request Rejected");
		} catch (err) {
			removeAllToasts();
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Requesting Rejection failed 😵";
			errToast(message);
		}
	};

	const handlePriority = async (val: string) => {
		try {
			info("Updating priority...");
			const numVal = Number(val);
			setPriority(numVal);
			await updatePriority(data._id, numVal); // <-- Pass it in!
			removeAllToasts();
			success("Request priority updated");
		} catch (err) {
			removeAllToasts();
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Requesting Update failed 😵";
			errToast(message);
		}
	};

	return (
		<TableRow>
			<TableCell className=" font-medium">{data.visitorName}</TableCell>
			<TableCell>
				{new Date(data.createdAt).toLocaleDateString()}
			</TableCell>
			<TableCell>
				<Badge
					variant={"outline"}
					className={`${
						priorityColors[data.priority]
					} border-[1px] rounded-full uppercase`}
				>
					{data.priority === 0
						? "Normal"
						: data.priority === 1
						? "High"
						: "Urgent"}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge
					className={`${
						statusColors[data.status as keyof typeof statusColors]
					} border-[1px] rounded-full uppercase`}
				>
					{data.status}
				</Badge>
			</TableCell>
			<TableCell>
				{data.status === "pending" ? (
					<div className="flex gap-2">
						<Button onClick={handleApprove} size="sm">
							Approve
						</Button>
						<Button
							onClick={handleReject}
							size="sm"
							variant="destructive"
						>
							Reject
						</Button>
					</div>
				) : (
					<Button size="sm" variant="ghost">
						View Details
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Select value={String(priority)} onValueChange={handlePriority}>
					<SelectTrigger className="w-[140px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Normal</SelectItem>
						<SelectItem value="1">High</SelectItem>
						<SelectItem value="2">Urgent</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
			<Separator />
		</TableRow>
	);
};

const priorityColors = {
	0: "text-green-500 border-green-500",
	1: "text-orange-500 border-orange-500",
	2: "text-red-500 border-red-500",
};

const statusColors: Record<string, string> = {
	pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
	approved: "bg-green-100 text-green-800 border-green-300",
	rejected: "bg-red-100 text-red-800 border-red-300",
};

export default RequestsTable;
