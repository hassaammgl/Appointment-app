import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";

const CFODashBoard = () => {
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["cfo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CFO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Financial oversight and strategic planning dashboard for managing company finances, budgets, and financial reporting
					</p>
				</div>

				{/* {user && <MeetingRequestsPanel userId={user.id} />} */}
			</div>
		</AppLayout>
	);
};

export default CFODashBoard;
