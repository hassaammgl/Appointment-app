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

const ScheduleMeetings = ({ userId }: { userId: string | undefined }) => {
	console.log(userId);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {};

	return (
		<div>
			ScheduleMeetings
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Enter your information to log in your account
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4 mb-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="your-email@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
						<p className="text-center text-sm text-muted-foreground">
							Don't have an account?{" "}
							<NavLink
								to="/signup"
								className="text-green-500 hover:underline"
							>
								Sign In
							</NavLink>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default ScheduleMeetings;
