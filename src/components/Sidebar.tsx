
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Home, Folder, BookOpen, Layout, Settings, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: Folder },
    { name: "Components", href: "/components", icon: Layout },
    { name: "Coding Guidelines", href: "/guidelines", icon: BookOpen },
  ];

  const utilities = [
    { name: "Search", href: "/search", icon: Search },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <Link to="/" className="flex items-center">
            <div className="text-primary font-bold text-xl">DevHub</div>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "rounded-full p-1.5 hover:bg-sidebar-accent text-sidebar-foreground transition-all",
            collapsed ? "ml-3.5" : "ml-0"
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="space-y-4 flex-1 py-4 px-2">
        <div className="px-3">
          {!collapsed ? (
            <h2 className="mb-2 text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider">
              Navigation
            </h2>
          ) : (
            <div className="h-4" />
          )}
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start",
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "px-2" : "px-3"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-3">
          {!collapsed ? (
            <h2 className="mb-2 text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider">
              Utilities
            </h2>
          ) : (
            <div className="h-4" />
          )}
          <nav className="space-y-1">
            {utilities.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start",
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "px-2" : "px-3"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
