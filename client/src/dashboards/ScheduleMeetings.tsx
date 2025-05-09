import { useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMeetings } from "@/store/mettings"; // Ensure this path is correct
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AxiosError } from "axios";

interface ScheduleMeetingsProps {
	userId?: string;
}

const ScheduleMeetings = ({ userId }: ScheduleMeetingsProps) => {
	const { isLoading, getAllRoles, allRoles, createMeetingReq, error } =
		useMeetings();
	const { error: errToast, info, success } = useToast();

	const [visitorName, setVisitorName] = useState("");
	const [visitorNo, setVisitorNo] = useState("");
	const [visitorCNIC, setVisitorCNIC] = useState("");
	const [purpose, setPurpose] = useState("");
	const [notes, setNotes] = useState("");
	const [to, setTo] = useState("");

	useEffect(() => {
		getAllRoles();
	}, [getAllRoles]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const cnicPattern = /^\d{5}-\d{7}-\d$/;
		if (!cnicPattern.test(visitorCNIC)) {
			errToast("Invalid CNIC format!");
			return;
		}
		const phonePattern = /^\d{4}-\d{7}$/;
		if (!phonePattern.test(visitorNo)) {
			errToast("Invalid phone number format!");
			return;
		}
		if (!to) {
			errToast("Please select a recipient.");
			return;
		}
		try {
			info("Requesting Schedule...");
			await createMeetingReq({
				visitorName,
				visitorNo,
				visitorCnic: visitorCNIC,
				purpose,
				notes,
				createdBy: userId,
				to,
			});
			success("Requesting Schedule Successed");
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
		<div>
			<Card className="w-full md:w-1/2 mx-auto">
				<CardHeader>
					<CardTitle>Schedule Appointment</CardTitle>
					<CardDescription>
						Schedule all the appointments from here
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4 mb-4">
						<div className="space-y-2">
							<Label htmlFor="visitor-name">Visitor Name:</Label>
							<Input
								id="visitor-name"
								type="text"
								placeholder="John Doe"
								value={visitorName}
								onChange={(e) => setVisitorName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="visitor-no">Phone Number:</Label>
							<PhoneNumberInput
								value={visitorNo}
								onChange={setVisitorNo}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="visitor-cnic">CNIC:</Label>
							<CNICInput
								value={visitorCNIC}
								onChange={setVisitorCNIC}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="visitor-purpose">Purpose:</Label>
							<Input
								id="visitor-purpose"
								type="text"
								placeholder="e.g. Meeting with HR"
								value={purpose}
								onChange={(e) => setPurpose(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="visitor-notes">Notes:</Label>
							<Textarea
								id="visitor-notes"
								placeholder="Optional notes or details"
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="to">To:</Label>
							<Select
								value={to}
								defaultValue={allRoles[0]?.username}
								onValueChange={setTo}
							>
								<SelectTrigger className="w-[200px]">
									<SelectValue placeholder="Select recipient" />
								</SelectTrigger>
								<SelectContent>
									{allRoles && allRoles.length > 0 ? (
										allRoles.map((r, i) => (
											<SelectItem
												key={r.id ?? i}
												value={r.username}
											>
												({r.role}) - {r.username}
											</SelectItem>
										))
									) : (
										<SelectItem value="none" disabled>
											No roles found
										</SelectItem>
									)}
								</SelectContent>
							</Select>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button
							type="submit"
							className="w-full bg-green-500 hover:bg-green-600"
							disabled={isLoading}
						>
							{isLoading ? "Scheduling..." : "Schedule Meeting"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

// --- 🔧 CNIC INPUT ---
const formatCNIC = (value: string) => {
	const digits = value.replace(/\D/g, "").slice(0, 13);
	if (digits.length <= 5) return digits;
	if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
	return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

const CNICInput = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (val: string) => void;
}) => {
	const [inputVal, setInputVal] = useState(formatCNIC(value));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawVal = e.target.value;
		const formatted = formatCNIC(rawVal);
		setInputVal(formatted);
		onChange(formatted);
	};

	return (
		<Input
			id="visitor-cnic"
			type="text"
			inputMode="numeric"
			placeholder="12345-1234567-1"
			maxLength={15}
			value={inputVal}
			onChange={handleChange}
		/>
	);
};

// --- 📞 PHONE INPUT ---
const formatPhoneNumber = (value: string) => {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	if (digits.length <= 4) return digits;
	return `${digits.slice(0, 4)}-${digits.slice(4)}`;
};

const PhoneNumberInput = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (val: string) => void;
}) => {
	const [inputVal, setInputVal] = useState(formatPhoneNumber(value));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawVal = e.target.value;
		const formatted = formatPhoneNumber(rawVal);
		setInputVal(formatted);
		onChange(formatted);
	};

	return (
		<Input
			id="visitor-phone"
			type="tel"
			inputMode="numeric"
			placeholder="03XX-XXXXXXX"
			maxLength={12}
			value={inputVal}
			onChange={handleChange}
		/>
	);
};

export default ScheduleMeetings;
