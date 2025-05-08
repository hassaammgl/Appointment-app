import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";

const ReceptionistDashBoard = () => {
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["receptionist"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Receptionist Dashboard
					</h1>
					<p className="text-muted-foreground">
						Front desk management, appointment scheduling, and
						visitor coordination dashboard for streamlined office
						operations
					</p>
				</div>
				{/* {user && <MeetingRequestsPanel userId={user.id} />} */}
			</div>
		</AppLayout>
	);
};

export default ReceptionistDashBoard;
