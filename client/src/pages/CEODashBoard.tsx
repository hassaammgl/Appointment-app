import { AppLayout } from "@/layout/Applayout";
import DashBoards from "@/dashboards/others/DashBoards";
import { useAuth } from "@/store/auth";

const CEODashBoard = () => {
	const { user } = useAuth();

	return (
		<AppLayout allowedRoles={["ceo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						(CEO){" "}
						<span className="text-green-500">{user?.username}</span>{" "}
						Dashboard
					</h1>
					<p className="text-muted-foreground">
						Executive overview and meeting management
					</p>
				</div>
				<DashBoards />
			</div>
		</AppLayout>
	);
};

export default CEODashBoard;
