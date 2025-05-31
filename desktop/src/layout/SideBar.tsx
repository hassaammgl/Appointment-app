import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";
import {
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	LogOut,
	User,
	Settings2,
} from "lucide-react";
import type { SidebarProps } from "@/types";
import { useRoute } from "@/store/route";
import Link from "@/routes/Link";

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
	const { user, logout } = useAuth();

	const { route } = useRoute();
	console.log(route);

	console.log(location);

	const getNavLinkClass = (path: string) => {
		const isActive = location.pathname === path;
		return cn(
			"flex items-center gap-3 px-3 py-2 rounded-md transition-all",
			isActive
				? "bg-primary text-white"
				: "text-muted-foreground hover:bg-secondary hover:text-white"
		);
	};

	const getNavIconClass = (path: string) => {
		const isActive = location.pathname === path;
		return cn("", isActive ? "text-white" : "text-green-500");
	};

	const dashboardLink = user?.role ? `/${user.role}-dashboard` : "/login";

	return (
		<aside
			className={`hidden md:flex bg-card border-r border-border transition-all duration-300 ease-in-out ${
				isOpen ? "w-64" : "w-16"
			} h-screen sticky top-0 z-20 flex flex-col`}
		>
			<div className="flex items-center justify-between p-4 border-b border-border">
				<h1
					className={cn(
						"font-semibold text-lg whitespace-nowrap",
						!isOpen && "hidden"
					)}
				>
					<h1 className="text-3xl font-bold">
						<span className="text-green-500">Smart</span> App
					</h1>
				</h1>
				<button
					onClick={toggleSidebar}
					className="rounded-md p-1.5 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
				>
					{isOpen ? (
						<ChevronLeft size={18} />
					) : (
						<ChevronRight size={18} />
					)}
				</button>
			</div>

			<nav className="flex-1 px-3 py-4 space-y-1 group">
				<Link
					to={dashboardLink}
					className={getNavLinkClass(dashboardLink)}
				>
					<LayoutDashboard
						className={getNavIconClass(dashboardLink)}
						size={20}
					/>
					{isOpen && <span>Dashboard</span>}
				</Link>
				<Link to="/profile" className={getNavLinkClass("/profile")}>
					<User className={getNavIconClass("/profile")} size={20} />
					{isOpen && <span>Profile</span>}
				</Link>
				<Link to="/settings" className={getNavLinkClass("/settings")}>
					<Settings2
						className={getNavIconClass("/settings")}
						size={20}
					/>
					{isOpen && <span>Settings</span>}
				</Link>
			</nav>

			<div className="p-3 mt-auto border-t border-border">
				<button
					onClick={logout}
					className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-white"
				>
					<LogOut size={20} />
					{isOpen && <span>Logout</span>}
				</button>
			</div>
		</aside>
	);
};
