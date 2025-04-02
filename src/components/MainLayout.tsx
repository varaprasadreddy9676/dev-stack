
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { APP_CONFIG } from "@/config/config";
import { AuthStatus } from "@/components/AuthStatus";

export default function MainLayout() {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex h-12 md:h-14 items-center justify-between px-2 md:px-4">
              <div className="flex items-center gap-4 ml-8 md:ml-0">
                {!isMobile && (
                  <Button variant="outline" size="sm" className="h-9 w-9 px-0">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                )}
                <h1 className="text-base md:text-sm font-medium">
                  {APP_CONFIG.APP_NAME}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <AuthStatus />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-0 md:p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
