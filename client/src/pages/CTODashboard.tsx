// import { AppLayout } from "@/components/layout/AppLayout";
// import { useAuth } from "@/contexts/AuthContext";
// import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";

// export const CTODashboard = () => {
//   const { user } = useAuth();

//   return (
//     <AppLayout allowedRoles={["cto"]}>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">CTO Dashboard</h1>
//           <p className="text-muted-foreground">
//             Manage your projects and meeting requests
//           </p>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Active Projects
//               </CardTitle>
//               <Badge>8</Badge>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">8</div>
//               <p className="text-xs text-muted-foreground">
//                 3 nearing deadline
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Team Members
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">24</div>
//               <p className="text-xs text-muted-foreground">
//                 Across 4 departments
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 System Status
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-500">Healthy</div>
//               <p className="text-xs text-muted-foreground">
//                 All systems operational
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Current Sprint</CardTitle>
//             <CardDescription>
//               Sprint #24 - Ends in 8 days
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Task</TableHead>
//                   <TableHead>Assignee</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Progress</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell className="font-medium">API Integration</TableCell>
//                   <TableCell>Sarah K.</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-300">In Progress</Badge>
//                   </TableCell>
//                   <TableCell className="text-right">65%</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">Database Optimization</TableCell>
//                   <TableCell>Michael R.</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="bg-green-500/20 text-green-700 border-green-300">Completed</Badge>
//                   </TableCell>
//                   <TableCell className="text-right">100%</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">UI Redesign</TableCell>
//                   <TableCell>Jessica T.</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-300">In Progress</Badge>
//                   </TableCell>
//                   <TableCell className="text-right">40%</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">Security Audit</TableCell>
//                   <TableCell>David L.</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="bg-blue-500/20 text-blue-700 border-blue-300">Planned</Badge>
//                   </TableCell>
//                   <TableCell className="text-right">0%</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Meeting Requests Panel */}
//         {user && <MeetingRequestsPanel userId={user.id} />}
//       </div>
//     </AppLayout>
//   );
// };

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

// Simple layout component replacing AppLayout
const SimpleLayout = ({ children }: ReactNode) => {
	return (
		<div className="min-h-screen bg-background">
			<div className="flex">
				{/* Sidebar placeholder */}
				<div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-muted/40 border-r">
					<div className="p-4 border-b">
						<h2 className="text-lg font-semibold">
							Green Meetings
						</h2>
					</div>
					<nav className="flex-1 px-2 py-4 space-y-1">
						<a
							href="#"
							className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
						>
							Dashboard
						</a>
						<a
							href="#"
							className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground hover:bg-primary/10"
						>
							Projects
						</a>
						<a
							href="#"
							className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground hover:bg-primary/10"
						>
							Team
						</a>
						<a
							href="#"
							className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground hover:bg-primary/10"
						>
							Calendar
						</a>
					</nav>
				</div>

				{/* Main content */}
				<div className="flex-1 md:ml-64">
					<header className="sticky top-0 z-10 bg-background border-b h-16 flex items-center px-6">
						<h2 className="text-lg font-semibold">CTO Portal</h2>
						<div className="ml-auto flex items-center space-x-4">
							<span className="text-sm">John Smith</span>
							<div className="h-8 w-8 rounded-full bg-primary"></div>
						</div>
					</header>

					<main className="p-6">{children}</main>
				</div>
			</div>
		</div>
	);
};

// Simplified MeetingRequestsPanel component
const MeetingRequestsPanel = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Meeting Requests</CardTitle>
				<CardDescription>
					Recent requests requiring your attention
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>From</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">CEO</TableCell>
							<TableCell>Q2 Tech Planning</TableCell>
							<TableCell>Tomorrow, 10:00 AM</TableCell>
							<TableCell>
								<Badge
									variant="outline"
									className="bg-yellow-500/20 text-yellow-700 border-yellow-300"
								>
									Pending
								</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">
								Product Manager
							</TableCell>
							<TableCell>New Feature Discussion</TableCell>
							<TableCell>May 10, 2:00 PM</TableCell>
							<TableCell>
								<Badge
									variant="outline"
									className="bg-green-500/20 text-green-700 border-green-300"
								>
									Accepted
								</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">
								Dev Team Lead
							</TableCell>
							<TableCell>Sprint Review</TableCell>
							<TableCell>May 12, 9:00 AM</TableCell>
							<TableCell>
								<Badge
									variant="outline"
									className="bg-green-500/20 text-green-700 border-green-300"
								>
									Accepted
								</Badge>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export const CTODashboard = () => {
	return (
		<SimpleLayout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CTO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Manage your projects and meeting requests
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Active Projects
							</CardTitle>
							<Badge>8</Badge>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">8</div>
							<p className="text-xs text-muted-foreground">
								3 nearing deadline
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Team Members
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">24</div>
							<p className="text-xs text-muted-foreground">
								Across 4 departments
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								System Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-500">
								Healthy
							</div>
							<p className="text-xs text-muted-foreground">
								All systems operational
							</p>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Current Sprint</CardTitle>
						<CardDescription>
							Sprint #24 - Ends in 8 days
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Task</TableHead>
									<TableHead>Assignee</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">
										Progress
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">
										API Integration
									</TableCell>
									<TableCell>Sarah K.</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-amber-500/20 text-amber-700 border-amber-300"
										>
											In Progress
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										65%
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										Database Optimization
									</TableCell>
									<TableCell>Michael R.</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-green-500/20 text-green-700 border-green-300"
										>
											Completed
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										100%
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										UI Redesign
									</TableCell>
									<TableCell>Jessica T.</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-amber-500/20 text-amber-700 border-amber-300"
										>
											In Progress
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										40%
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										Security Audit
									</TableCell>
									<TableCell>David L.</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className="bg-blue-500/20 text-blue-700 border-blue-300"
										>
											Planned
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										0%
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Meeting Requests Panel */}
				<MeetingRequestsPanel />
			</div>
		</SimpleLayout>
	);
};
