
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface MobileSidebarProps {
  navigation: NavigationItem[];
  utilities: NavigationItem[];
}

export function MobileSidebar({ navigation, utilities }: MobileSidebarProps) {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed left-4 top-3 z-40 rounded-md p-2 text-foreground bg-background/80 backdrop-blur-sm border">
          <Menu size={20} />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px] max-w-[85vw] border-r solid-bg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <div className="text-primary font-bold text-xl">DevHub</div>
            </Link>
            {/* No need for explicit SheetClose here - it's now handled by the Sheet component */}
          </div>
          
          <div className="space-y-6 flex-1 py-4 overflow-y-auto">
            <div className="px-3">
              <h2 className="mb-2 text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider px-2">
                Navigation
              </h2>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full justify-start px-3 py-2 h-auto text-base",
                        location.pathname === item.href
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>

            <div className="px-3">
              <h2 className="mb-2 text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider px-2">
                Utilities
              </h2>
              <nav className="space-y-1">
                {utilities.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full justify-start px-3 py-2 h-auto text-base",
                        location.pathname === item.href
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
