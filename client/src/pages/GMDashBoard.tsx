import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";

const GMDashBoard = () => {
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["gm"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						General Manager Dashboard
					</h1>
					<p className="text-muted-foreground">
						Operations and management dashboard for overseeing daily
						business activities, team performance, and departmental
						coordination
					</p>
				</div>

				{/* {user && <MeetingRequestsPanel userId={user.id} />} */}
			</div>
		</AppLayout>
	);
};

export default GMDashBoard;
