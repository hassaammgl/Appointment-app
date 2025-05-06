// import { AppLayout } from "@/components/layout/AppLayout";
// import { useAuth } from "@/contexts/AuthContext";
// import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

// export const CFODashboard = () => {
//   const { user } = useAuth();
  
//   return (
//     <AppLayout allowedRoles={["cfo"]}>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">CFO Dashboard</h1>
//           <p className="text-muted-foreground">
//             Financial overview and meeting requests
//           </p>
//         </div>
        
//         {/* Meeting Requests Panel */}
//         {user && <MeetingRequestsPanel userId={user.id} />}
//       </div>
//     </AppLayout>
//   );
// };
import { AppLayout } from "@/components/layout/AppLayout";
import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

const mockUser = {
	id: "345346346",
	name: "Dude",
	email: "dude@dude.com",
	avatar: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/05/naruto-s-sage-of-six-paths-mode-over-naruto-vs-sasuke.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
	role: "cfo", // 👈 Make sure role matches the allowed one here
};

export const CFODashboard = () => {
	return (
		<AppLayout allowedRoles={["cfo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CFO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Financial overview and meeting requests
					</p>
				</div>

				{/* Meeting Requests Panel */}
				<MeetingRequestsPanel userId={mockUser.id} />
			</div>
		</AppLayout>
	);
};
