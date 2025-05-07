import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@/store/auth";
import { Sidebar } from "@/layout/SideBar";
import { TopBar } from "@/layout/TopBar";
import { ModeToggle } from "@/components/mode-toogle";
import { useNavigate } from "react-router";

interface AppLayoutProps {
	children: ReactNode;
	allowedRoles?: string[];
}

export const AppLayout = ({ children, allowedRoles = [] }: AppLayoutProps) => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(true);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		} else if (
			user &&
			allowedRoles.length > 0 &&
			!allowedRoles.includes(user.role)
		) {
			// Redirect to appropriate dashboard if user doesn't have permission
			switch (user.role) {
				case "cto":
					navigate("/cto-dashboard");
					break;
				case "ceo":
					navigate("/ceo-dashboard");
					break;
				case "cfo":
					navigate("/cfo-dashboard");
					break;
				case "gm":
					navigate("/gm-dashboard");
					break;
				case "receptionist":
					navigate("/receptionist-dashboard");
					break;
				default:
					navigate("/login");
			}
		}
	}, [isAuthenticated, user, allowedRoles, navigate]);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="min-h-screen bg-background flex">
			<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
			<div className="flex-1 flex flex-col">
				<TopBar toggleSidebar={toggleSidebar} />
				<main className="flex-1 p-4 md:p-6 overflow-auto">
					<div className="max-w-7xl mx-auto">{children}</div>
				</main>
			</div>
			<div className="fixed bottom-6 right-6">
				<ModeToggle />
			</div>
		</div>
	);
};
