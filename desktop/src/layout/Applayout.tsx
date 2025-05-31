import { useState, useEffect } from "react";
import { useAuth } from "@/store/auth";
import { Sidebar } from "@/layout/SideBar";
import { TopBar } from "@/layout/TopBar";
import { ModeToggle } from "@/components/mode-toogle";
import { useRoute } from "@/store/route";
import type { AppLayoutProps } from "@/types";

export const AppLayout = ({ children, allowedRoles = [] }: AppLayoutProps) => {
	const { user, isAuthenticated } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const { setRoute, route } = useRoute();

	useEffect(() => {
		if (!isAuthenticated) {
			setRoute("/login");
		} else if (
			user &&
			allowedRoles.length > 0 &&
			!allowedRoles.includes(user.role)
		) {
			switch (user.role) {
				case "cto":
					setRoute("/cto-dashboard");
					break;
				case "ceo":
					setRoute("/ceo-dashboard");
					break;
				case "cfo":
					setRoute("/cfo-dashboard");
					break;
				case "gm":
					setRoute("/gm-dashboard");
					break;
				case "receptionist":
					setRoute("/receptionist-dashboard");
					break;

				default:
					setRoute("/login");
			}
		}
	}, [isAuthenticated, user, allowedRoles, route]);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="min-h-screen bg-background flex">
			<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
			<div className="flex-1 flex flex-col">
				<TopBar />
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
