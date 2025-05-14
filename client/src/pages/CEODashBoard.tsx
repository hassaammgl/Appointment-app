import { AppLayout } from "@/layout/Applayout";
import DashBoards from "@/dashboards/others/DashBoards";

const CEODashBoard = () => {
	return (
		<AppLayout allowedRoles={["ceo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CEO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Executive overview and meeting management
					</p>
				</div>
				<DashBoards  />
			</div>
		</AppLayout>
	);
};

export default CEODashBoard;
// import { AppLayout } from "@/layout/Applayout";
// import { useState } from "react";
// import DashBoards from "@/dashboards/others/DashBoards";



// const CEODashBoard = () => {
// 	const [mainTabValue, setMainTabValue] = useState("all");
// 	const [searchQuery, setSearchQuery] = useState("");

// 	const filteredRequests = mockRequests.filter((request) => {
// 		const matchesStatus =
// 			mainTabValue === "all" ? true : request.status === mainTabValue;
// 		const matchesSearch = request.name
// 			.toLowerCase()
// 			.includes(searchQuery.toLowerCase());
// 		return matchesStatus && matchesSearch;
// 	});

// 	const getStatusCount = (status: string) =>
// 		mockRequests.filter((request) =>
// 			status === "all" ? true : request.status === status
// 		).length;

// 	return (
// 		<AppLayout allowedRoles={["ceo"]}>
// 			<div className="space-y-8">
// 				<div>
// 					<h1 className="text-3xl font-bold tracking-tight">
// 						CEO Dashboard
// 					</h1>
// 					<p className="text-muted-foreground">
// 						Executive overview and meeting management
// 					</p>
// 				</div>
// 				<DashBoards />
// 			</div>
// 		</AppLayout>
// 	);
// };

// export default CEODashBoard;