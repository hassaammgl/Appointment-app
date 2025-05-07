import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectItem,
	SelectContent,
} from "@/components/ui/select";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/store/auth.ts";
import { useToast } from "@/components/ui/toast";

const SignupPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("receptionist");

	const navigate = useNavigate();
	const { promise } = useToast();
	const { signup, isLoading } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await promise(signup(email, password, name, role), {
			loading: "Creating your account...",
			success: () => "You're in! 🎉",
			error: (err: any) =>
				err?.response?.data?.message ||
				err?.message ||
				"Signup failed 😵",
		});
		navigate("/login");
	};
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold">
						<span className="text-green-500">Green</span> Meetings
					</h1>
					<p className="mt-2 text-muted-foreground">
						Create a new account
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Sign Up</CardTitle>
						<CardDescription>
							Enter your information to create an account
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
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
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="role">Role</Label>
								<Select
									value={role}
									onValueChange={(value) => setRole(value)}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="cto">CTO</SelectItem>
										<SelectItem value="ceo">CEO</SelectItem>
										<SelectItem value="cfo">CFO</SelectItem>
										<SelectItem value="gm">
											General Manager
										</SelectItem>
										<SelectItem value="receptionist">
											Receptionist
										</SelectItem>
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
								{isLoading ? "Creating account..." : "Sign Up"}
							</Button>
							<p className="text-center text-sm text-muted-foreground">
								Already have an account?{" "}
								<NavLink
									to="/login"
									className="text-green-500 hover:underline"
								>
									Sign In
								</NavLink>
							</p>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default SignupPage;
