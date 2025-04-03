
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationItem } from "./sidebarData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DesktopSidebarProps {
  navigation: NavigationItem[];
  utilities: NavigationItem[];
  collapsed: boolean;
  toggleSidebar: () => void;
  className?: string;
}

export function DesktopSidebar({
  navigation,
  utilities,
  collapsed,
  toggleSidebar,
  className,
}: DesktopSidebarProps) {
  const location = useLocation();
  const { hasPermission } = useAuth();

  // Function to determine if an item should be shown based on required role
  const shouldShowItem = (item: NavigationItem) => {
    if (!item.requiredRole) return true;
    return hasPermission(item.requiredRole);
  };

  return (
    <div
      className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
        collapsed ? "lg:w-16" : "lg:w-60",
        "transition-width duration-300",
        className
      )}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background border-r px-4 pb-4 pt-4">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <span className="text-xl font-bold text-primary">DevHub</span>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex flex-col gap-y-7 flex-1">
          <ul className="space-y-1">
            {navigation.filter(shouldShowItem).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      location.pathname === item.href
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                    aria-hidden="true"
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="space-y-1">
              {utilities.filter(shouldShowItem).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      location.pathname === item.href
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                    aria-hidden="true"
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
