// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { useTheme } from "@/contexts/ThemeContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Sun, Moon } from "lucide-react";

// export const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, isAuthenticated, user } = useAuth();
//   const { theme, toggleTheme } = useTheme();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await login(email, password);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Redirect if already logged in
//   if (isAuthenticated && user) {
//     switch (user.role) {
//       case "cto":
//         return <Navigate to="/cto-dashboard" />;
//       case "ceo":
//         return <Navigate to="/ceo-dashboard" />;
//       case "cfo":
//         return <Navigate to="/cfo-dashboard" />;
//       case "gm":
//         return <Navigate to="/gm-dashboard" />;
//       case "receptionist":
//         return <Navigate to="/receptionist-dashboard" />;
//       default:
//         return null;
//     }
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <Button
//         variant="outline"
//         size="icon"
//         className="fixed top-4 right-4 rounded-full"
//         onClick={toggleTheme}
//       >
//         {theme === "dark" ? <Sun /> : <Moon />}
//       </Button>

//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold">
//             <span className="text-green-primary">Green</span> Meetings
//           </h1>
//           <p className="mt-2 text-muted-foreground">
//             Sign in to your account
//           </p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Sign In</CardTitle>
//             <CardDescription>
//               Enter your credentials to access your account
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="your-email@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col space-y-4">
//               <Button
//                 type="submit"
//                 className="w-full bg-green-primary hover:bg-green-dark"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </Button>
//               <p className="text-center text-sm text-muted-foreground">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-green-primary hover:underline">
//                   Sign Up
//                 </Link>
//               </p>
//             </CardFooter>
//           </form>
//         </Card>

//         <div className="mt-4 text-center text-sm">
//           <p className="text-muted-foreground">
//             Demo accounts:
//           </p>
//           <p className="text-xs text-muted-foreground mt-1">
//             cto@example.com / password<br />
//             ceo@example.com / password<br />
//             cfo@example.com / password<br />
//             gm@example.com / password<br />
//             receptionist@example.com / password
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";

// export const LoginPage = () => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [isLoading, setIsLoading] = useState(false);
// 	const { login } = useAuth();

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setIsLoading(true);
// 		try {
// 			await login(email, password);
// 		} catch (error) {
// 			console.error("Login failed:", error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
// 			<Card className="w-full max-w-md">
// 				<CardHeader className="space-y-1">
// 					<CardTitle className="text-2xl">
// 						Login to your account
// 					</CardTitle>
// 					<CardDescription>
// 						Enter your email and password below to sign in
// 					</CardDescription>
// 				</CardHeader>

// 				<form onSubmit={handleSubmit}>
// 					<CardContent className="space-y-4">
// 						<div className="space-y-2">
// 							<Label htmlFor="email">Email</Label>
// 							<Input
// 								id="email"
// 								type="email"
// 								placeholder="name@example.com"
// 								value={email}
// 								onChange={(e) => setEmail(e.target.value)}
// 								required
// 								disabled={isLoading}
// 							/>
// 						</div>

// 						<div className="space-y-2">
// 							<Label htmlFor="password">Password</Label>
// 							<Input
// 								id="password"
// 								type="password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								required
// 								disabled={isLoading}
// 							/>
// 						</div>
// 					</CardContent>

// 					<CardFooter className="flex flex-col gap-4">
// 						<Button
// 							type="submit"
// 							className="w-full"
// 							disabled={isLoading}
// 						>
// 							{isLoading ? "Signing in..." : "Sign In"}
// 						</Button>

// 						<div className="text-sm text-muted-foreground">
// 							Don't have an account?{" "}
// 							<Link
// 								to="/signup"
// 								className="font-medium text-primary hover:underline"
// 							>
// 								Create one
// 							</Link>
// 						</div>
// 					</CardFooter>
// 				</form>
// 			</Card>
// 		</div>
// 	);
// };

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

export const LoginPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("receptionist");
	const [isLoading, setIsLoading] = useState(false);
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulate form submission
		setTimeout(() => {
			setIsLoading(false);
			console.log("Form submitted:", { name, email, password, role });
		}, 1000);
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
			<Button
				variant="outline"
				size="icon"
				className="fixed top-4 right-4 rounded-full"
				onClick={toggleTheme}
			>
				{theme === "dark" ? <Sun /> : <Moon />}
			</Button>

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
								<Link
									to="/signup"
									className="text-green-500 hover:underline"
								>
									Sign In
								</Link>
							</p>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};
