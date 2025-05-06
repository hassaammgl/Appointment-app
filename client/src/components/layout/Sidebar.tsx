
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    );
  };

  // Determine dashboard link based on user role
  const dashboardLink = user?.role
    ? `/${user.role}-dashboard`
    : "/login";

  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16",
        "h-screen sticky top-0 z-20 flex flex-col"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1
          className={cn(
            "font-semibold text-lg whitespace-nowrap",
            !isOpen && "hidden"
          )}
        >
          <span className="text-green-primary">Green</span> Meetings
        </h1>
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link to={dashboardLink} className={getNavLinkClass(dashboardLink)}>
          <LayoutDashboard size={20} />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link to="/profile" className={getNavLinkClass("/profile")}>
          <User size={20} />
          {isOpen && <span>Profile</span>}
        </Link>
      </nav>

      <div className="p-3 mt-auto border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
