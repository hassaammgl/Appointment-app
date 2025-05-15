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
import { useState, useEffect } from "react";
import { useSettings } from "@/store/settings";

const RequestsTable = ({
	requests,
	toggleFetchAgain,
}: {
	requests: Appointment[];
	toggleFetchAgain: () => void;
}) => {
	const { settings } = useSettings();

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Visitor Name</TableHead>
					<TableHead>Visitor No</TableHead>
					{settings.addPersonCnic && (
						<TableHead>Visitor CNIC</TableHead>
					)}
					<TableHead>Date</TableHead>
					{settings.addNotes && <TableHead>Notes</TableHead>}
					{settings.addPurpose && <TableHead>Purpose</TableHead>}
					<TableHead>Priority</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
					<TableHead>Set Priority</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.length > 0 ? (
					requests.map((request) => (
						<T_Row
							key={request._id}
							data={request}
							toggleFetchAgain={toggleFetchAgain}
						/>
					))
				) : (
					<TableRow>
						<TableCell colSpan={10} className="text-center">
							No meeting requests yet 🙃
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

const T_Row = ({
	data,
	toggleFetchAgain,
}: {
	data: Appointment;
	toggleFetchAgain: () => void;
}) => {
	const { settings } = useSettings();
	const { approveMeetingReq, rejectMeetingReq, updatePriority } =
		useMeetings();
	const { info, removeAllToasts, success, error: errToast } = useToast();
	const [priority, setPriority] = useState(data.priority);

	// Sync local state with incoming data
	useEffect(() => {
		setPriority(data.priority);
	}, [data.priority]);

	const handleApprove = async () => {
		try {
			info("Approving Schedule...");
			await approveMeetingReq(data._id);
			removeAllToasts();
			success("Request Approved");
			toggleFetchAgain();
		} catch (err) {
			removeAllToasts();
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Approval failed 😵";
			errToast(message);
		}
	};

	const handleReject = async () => {
		try {
			info("Rejecting Schedule...");
			await rejectMeetingReq(data._id);
			removeAllToasts();
			success("Request Rejected");
			toggleFetchAgain();
		} catch (err) {
			removeAllToasts();
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Rejection failed 😵";
			errToast(message);
		}
	};

	const handlePriority = async (val: string) => {
		try {
			info("Updating priority...");
			const numVal = Number(val);
			await updatePriority(data._id, numVal);
			removeAllToasts();
			success("Priority updated");
			toggleFetchAgain();
		} catch (err) {
			removeAllToasts();
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Priority update failed 😵";
			errToast(message);
		}
	};

	return (
		<TableRow>
			<TableCell className="font-medium">{data.visitorName}</TableCell>
			<TableCell className="font-medium">{data.visitorNo}</TableCell>
			{settings.addPersonCnic && (
				<TableCell className="font-medium">
					{data.visitorCnic}
				</TableCell>
			)}
			<TableCell>
				{new Date(data.createdAt).toLocaleDateString()}
			</TableCell>
			{settings.addNotes && <TableCell>{data.notes}</TableCell>}
			{settings.addPurpose && <TableCell>{data.purpose}</TableCell>}
			<TableCell>
				<Badge
					variant="outline"
					className={`${priorityColors[priority]} border-[1px] rounded-full uppercase`}
				>
					{priority === 0
						? "Normal"
						: priority === 1
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
