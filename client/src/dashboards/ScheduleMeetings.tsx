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
import { NavLink } from "react-router";
import { useMeetings } from "@/store/mettings";

const ScheduleMeetings = ({ userId }: { userId: string | undefined }) => {
	console.log(userId);

	const { isLoading } = useMeetings();

	const [visitorName, setVisitorName] = useState("");
	const [visitorNo, setVisitorNo] = useState("");

	const handleSubmit = () => {};

	return (
		<div>
			ScheduleMeetings
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
							<Label htmlFor="">Vistor Name:</Label>
							<Input
								id="name"
								type="text"
								placeholder="John doe ..."
								value={visitorName}
								onChange={(e) => setVisitorName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="">Vistor No:</Label>
							<Input
								id="phoneNum"
								type="number"
								placeholder="03123456789"
								value={visitorNo}
								onChange={(e) => setVisitorNo(e.target.value)}
								required
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button
							type="submit"
							className="w-full bg-green-500 hover:bg-green-600"
							disabled={isLoading}
						>
							{isLoading ? "Loging in account..." : "Login"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default ScheduleMeetings;
