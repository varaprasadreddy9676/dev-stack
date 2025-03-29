
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function MainLayout() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="h-9 w-9 px-0">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
                <h1 className="text-sm font-medium">
                  Developer Portal
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
