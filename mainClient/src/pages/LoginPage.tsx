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
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/store/auth.ts";
import { useToast } from "@/components/ui/toast";
import { ModeToggle } from "@/components/mode-toogle";
import { AxiosError } from "axios";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { error, success } = useToast();
	const { login, isLoading } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			success("You're in! 🎉");
			navigate("/profile");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Login failed 😵";
			error(message);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="fixed top-6 right-6">
				<ModeToggle />
			</div>
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold">
						<span className="text-green-500">Green</span> Meetings
					</h1>
					<p className="mt-2 text-muted-foreground">
						Login to your account
					</p>
				</div>

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
									onChange={(e) =>
										setPassword(e.target.value)
									}
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
		</div>
	);
};

export default LoginPage;
