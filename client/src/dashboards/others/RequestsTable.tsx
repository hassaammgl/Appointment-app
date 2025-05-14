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

const RequestsTable = ({ requests }: { requests: Appointment[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Visitor Name</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Index</TableHead>
					<TableHead>Priority</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
					<TableHead>Set Index</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request) => {
					return <T_Row key={request._id} data={request} />;
				})}
			</TableBody>
		</Table>
	);
};

export default RequestsTable;

const T_Row = ({ data }: { data: Appointment }) => {
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

	return (
		<TableRow>
			<TableCell className="font-medium">{data.visitorName}</TableCell>
			<TableCell>
				{new Date(data.createdAt).toLocaleDateString()}
			</TableCell>
			<TableCell>{data.priorityIndex}</TableCell>
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
						<Button size="sm">Approve</Button>
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
			<TableCell>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Index of Priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">0</SelectItem>
						<SelectItem value="1">1</SelectItem>
						<SelectItem value="2">2</SelectItem>
						<SelectItem value="3">3</SelectItem>
						<SelectItem value="4">4</SelectItem>
						<SelectItem value="5">5</SelectItem>
						<SelectItem value="6">6</SelectItem>
						<SelectItem value="7">7</SelectItem>
						<SelectItem value="8">8</SelectItem>
						<SelectItem value="9">9</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
		</TableRow>
	);
};
