
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Home, Folder, BookOpen, Layout, Settings, Search, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Set sidebar expanded on larger screens, collapsed on mobile by default
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    } else {
      setCollapsed(isMobile);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
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

  const MobileSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <div className="text-primary font-bold text-xl">DevHub</div>
        </Link>
        <SheetClose className="rounded-full p-2 text-sidebar-foreground hover:bg-sidebar-accent">
          <X size={20} />
        </SheetClose>
      </div>
      
      <div className="space-y-6 flex-1 py-4">
        <div className="px-3">
          <h2 className="mb-3 text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider px-3">
            Navigation
          </h2>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link
                  to={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start px-3 py-2 text-base",
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
          <h2 className="mb-3 text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider px-3">
            Utilities
          </h2>
          <nav className="space-y-1">
            {utilities.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link
                  to={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start px-3 py-2 text-base",
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
  );

  const SidebarContent = () => (
    <>
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
            collapsed ? "ml-3.5" : "ml-0",
            isMobile && "hidden" // Hide toggle on mobile
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
    </>
  );

  // For mobile, we'll use a Sheet component that slides in from the left
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed left-4 top-3 z-40 rounded-md p-2 text-foreground bg-background/80 backdrop-blur-sm border">
            <Menu size={20} />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-sidebar-background text-sidebar-foreground w-[280px] max-w-[80vw]">
          <MobileSidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // For desktop, we'll use the standard sidebar
  return (
    <div
      className={cn(
        "h-screen flex-col border-r bg-sidebar-background text-sidebar-foreground transition-all duration-300 ease-in-out hidden md:flex",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <SidebarContent />
    </div>
  );
}
