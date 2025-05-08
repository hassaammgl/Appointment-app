import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";

const CTODashBoard = () => {
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["cto"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CTO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Technology strategy and innovation dashboard for
						managing technical initiatives, system architecture, and
						development teams
					</p>
				</div>

				{/* {user && <MeetingRequestsPanel userId={user.id} />} */}
			</div>
		</AppLayout>
	);
};

export default CTODashBoard;
