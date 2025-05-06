import { AppLayout } from "@/components/layout/AppLayout";
import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

export const GMDashboard = () => {
	const user = {
		id: "345346346",
		name: "Dude",
		email: "dude@dude.com",
		avatar: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/05/naruto-s-sage-of-six-paths-mode-over-naruto-vs-sasuke.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
		role: "King",
	};

	return (
		<AppLayout allowedRoles={["gm"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						General Manager Dashboard
					</h1>
					<p className="text-muted-foreground">
						Operational overview and meeting requests
					</p>
				</div>

				{/* Meeting Requests Panel */}
				{user && <MeetingRequestsPanel userId={user.id} />}
			</div>
		</AppLayout>
	);
};
