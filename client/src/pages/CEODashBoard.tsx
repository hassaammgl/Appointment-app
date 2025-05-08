import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
// import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

const CEODashBoard = () => {
	const { user } = useAuth();
	console.log(user);

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

				{/* {user && <MeetingRequestsPanel userId={user.id} />} */}
			</div>
		</AppLayout>
	);
};

export default CEODashBoard;
