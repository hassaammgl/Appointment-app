import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import DashBoards from "@/dashboards/others/DashBoards";

const CFODashBoard = () => {
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["cfo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						(CFO){" "}
						<span className="text-green-500">{user?.username}</span>{" "}
						Dashboard
					</h1>
					<p className="text-muted-foreground">
						Financial oversight and strategic planning dashboard for
						managing company finances, budgets, and financial
						reporting
					</p>
				</div>
				<DashBoards />
			</div>
		</AppLayout>
	);
};

export default CFODashBoard;
