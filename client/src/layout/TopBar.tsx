import { useAuth } from "@/store/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, Settings2, LayoutDashboard } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router";

export const TopBar = () => {
  const { user, logout } = useAuth();

  const location = useLocation();

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
    return cn("", isActive ? "text-white" : "text-primary");
  };

  const dashboardLink = user?.role ? `/${user.role}-dashboard` : "/login";

  return (
    <header className="bg-card sticky h-18 top-0 z-10 border-b border-border px-4 py-3 md:py-2 flex items-center justify-between rounded-2xl mx-2 my-2">
      <div className="flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 block md:hidden hover:text-green-500 transition-colors ease-in-out duration-500"
            >
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">
                {user?.role === "cto" && "CTO Dashboard"}
                {user?.role === "ceo" && "CEO Dashboard"}
                {user?.role === "cfo" && "CFO Dashboard"}
                {user?.role === "gm" && "GM Dashboard"}
                {user?.role === "receptionist" && "Receptionist Dashboard"}
              </SheetTitle>
              <SheetDescription>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {user?.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>

            <NavLink
              to={dashboardLink}
              className={getNavLinkClass(dashboardLink)}
            >
              <LayoutDashboard
                className={getNavIconClass(dashboardLink)}
                size={20}
              />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/profile" className={getNavLinkClass("/profile")}>
              <User className={getNavIconClass("/profile")} size={20} />
              <span>Profile</span>
            </NavLink>
            <NavLink to="/settings" className={getNavLinkClass("/settings")}>
              <Settings2 className={getNavIconClass("/settings")} size={20} />
              <span>Settings</span>
            </NavLink>

            <SheetFooter>
              <Button
                variant="destructive"
                className="w-full text-left"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <h2 className="text-lg font-semibold hidden md:block">
          {user?.role === "cto" && "CTO Dashboard"}
          {user?.role === "ceo" && "CEO Dashboard"}
          {user?.role === "cfo" && "CFO Dashboard"}
          {user?.role === "gm" && "GM Dashboard"}
          {user?.role === "receptionist" && "Receptionist Dashboard"}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar>
                <AvatarFallback>
                  {user?.username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col justify-center space-y-1">
                <span className="flex">
                  <Avatar>
                    <AvatarFallback className="text-md">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2 flex justify-center items-start flex-col">
                    <p className="text-sm font-medium leading-none">
                      {user?.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </span>
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <NavLink to="/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </NavLink>
            <NavLink to="/settings">
              <DropdownMenuItem>
                <Settings2 className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
