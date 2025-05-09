import { useState } from "react";
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
import { useMeetings } from "@/store/mettings";
import { Textarea } from "@/components/ui/textarea";

const ScheduleMeetings = ({ userId }: { userId: string | undefined }) => {
	console.log(userId);

	const { isLoading } = useMeetings();

	const [visitorName, setVisitorName] = useState("");
	const [visitorNo, setVisitorNo] = useState("");
	const [visitorCNIC, setVisitorCNIC] = useState("");
	const [purpose, setPurpose] = useState("");
	const [notes, setNotes] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const cnicPattern = /^\d{5}-\d{7}-\d$/;
		if (!cnicPattern.test(visitorCNIC)) {
			alert("Invalid CNIC format!");
			return;
		}

		console.log({ visitorName, visitorNo, visitorCNIC, purpose, notes });
		// Trigger the actual API/mutation here
	};

	return (
		<div>
			<Card>
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

const formatCNIC = (value: string) => {
	const digits = value.replace(/\D/g, "").slice(0, 13);
	if (digits.length <= 5) return digits;
	if (digits.length <= 12)
		return `${digits.slice(0, 5)}-${digits.slice(5, 12)}`;
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

const formatPhoneNumber = (value: string) => {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	if (digits.length <= 4) return digits;
	return `${digits.slice(0, 4)}-${digits.slice(4)}`;
};

export const PhoneNumberInput = ({
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
