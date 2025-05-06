// import { ReactNode, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Sidebar } from "./Sidebar";
// import { TopBar } from "./TopBar";
// import { Sun, Moon } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { Button } from "@/components/ui/button";

// interface AppLayoutProps {
//   children: ReactNode;
//   allowedRoles?: string[];
// }

// export const AppLayout = ({ children, allowedRoles = [] }: AppLayoutProps) => {
//   const { user, isAuthenticated } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     // Redirect to appropriate dashboard if user doesn't have permission
//     switch (user.role) {
//       case "cto":
//         return <Navigate to="/cto-dashboard" />;
//       case "ceo":
//         return <Navigate to="/ceo-dashboard" />;
//       case "cfo":
//         return <Navigate to="/cfo-dashboard" />;
//       case "gm":
//         return <Navigate to="/gm-dashboard" />;
//       case "receptionist":
//         return <Navigate to="/receptionist-dashboard" />;
//       default:
//         return <Navigate to="/login" />;
//     }
//   }

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen bg-background flex">
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       <div className="flex-1 flex flex-col">
//         <TopBar toggleSidebar={toggleSidebar} />
//         <main className="flex-1 p-4 md:p-6 overflow-auto">
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//       <Button
//         variant="outline"
//         size="icon"
//         className="fixed bottom-4 right-4 rounded-full shadow-md"
//         onClick={toggleTheme}
//       >
//         {theme === "dark" ? <Sun /> : <Moon />}
//       </Button>
//     </div>
//   );
// };

import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
	children: ReactNode;
	allowedRoles?: string[];
}

// 🔥 Local mocked auth user
const mockUser = {
	id: "345346346",
	name: "Dude",
	email: "dude@dude.com",
	avatar: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/05/naruto-s-sage-of-six-paths-mode-over-naruto-vs-sasuke.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
	role: "King", // ⬅️ change this for testing
};

const isAuthenticated = true; // ⬅️ toggle this for testing

export const AppLayout = ({ children, allowedRoles = [] }: AppLayoutProps) => {
	const { theme, toggleTheme } = useTheme();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login", { replace: true });
			return;
		}

		const userRole = mockUser?.role;
		const isAllowed =
			allowedRoles.length === 0 || allowedRoles.includes(userRole);

		if (!isAllowed) {
			const redirectPath =
				{
					cto: "/cto-dashboard",
					ceo: "/ceo-dashboard",
					cfo: "/cfo-dashboard",
					gm: "/gm-dashboard",
					receptionist: "/receptionist-dashboard",
				}[userRole] || "/login";

			navigate(redirectPath, { replace: true });
		}
	}, [allowedRoles, navigate]);

	const userRole = mockUser?.role;
	const isAllowed =
		isAuthenticated &&
		(allowedRoles.length === 0 || allowedRoles.includes(userRole));

	if (!isAllowed) return null;

	return (
		<div className="min-h-screen bg-background flex">
			<Sidebar
				isOpen={sidebarOpen}
				toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
			/>
			<div className="flex-1 flex flex-col">
				<TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
				<main className="flex-1 p-4 md:p-6 overflow-auto">
					<div className="max-w-7xl mx-auto">{children}</div>
				</main>
			</div>

			{/* Floating theme toggle */}
			<Button
				variant="outline"
				size="icon"
				className="fixed bottom-4 right-4 rounded-full shadow-md"
				onClick={toggleTheme}
			>
				{theme === "dark" ? (
					<Sun className="w-5 h-5" />
				) : (
					<Moon className="w-5 h-5" />
				)}
			</Button>
		</div>
	);
};
