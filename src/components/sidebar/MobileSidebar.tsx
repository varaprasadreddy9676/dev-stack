
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationItem } from "./sidebarData";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  navigation: NavigationItem[];
  utilities: NavigationItem[];
}

export function MobileSidebar({ navigation, utilities }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { hasPermission } = useAuth();

  // Function to determine if an item should be shown based on required role
  const shouldShowItem = (item: NavigationItem) => {
    if (!item.requiredRole) return true;
    return hasPermission(item.requiredRole);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="font-semibold text-lg">DevHub</span>
            {/* Removed the manual close button here as SheetContent already provides one */}
          </div>
          
          <nav className="flex-1 overflow-auto px-2 py-4 bg-background">
            <div className="space-y-1">
              {navigation.filter(shouldShowItem).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-base font-medium rounded-md",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "mr-4 h-5 w-5 flex-shrink-0",
                      location.pathname === item.href
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-10">
              <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Utilities
              </p>
              <div className="mt-2 space-y-1">
                {utilities.filter(shouldShowItem).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-base font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-4 h-5 w-5 flex-shrink-0",
                        location.pathname === item.href
                          ? "text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
