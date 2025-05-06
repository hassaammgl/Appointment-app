// import { AppLayout } from "@/components/layout/AppLayout";
// import { useAuth } from "@/contexts/AuthContext";
// import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

// export const CEODashboard = () => {
//   const { user } = useAuth();
  
//   return (
//     <AppLayout allowedRoles={["ceo"]}>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">CEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             Executive overview and meeting management
//           </p>
//         </div>
        
//         {user && <MeetingRequestsPanel userId={user.id} />}
//       </div>
//     </AppLayout>
//   );
// };

import { AppLayout } from "@/components/layout/AppLayout";
import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

// 🧠 Mock user data
const mockUser = {
	id: "234123123",
	name: "Bossman",
	email: "ceo@bigbiz.com",
	avatar: "https://i.kym-cdn.com/photos/images/newsfeed/002/120/442/b90.jpg",
	role: "ceo", // 👈 this MUST match allowedRoles to pass
};

export const CEODashboard = () => {
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

				<MeetingRequestsPanel userId={mockUser.id} />
			</div>
		</AppLayout>
	);
};
