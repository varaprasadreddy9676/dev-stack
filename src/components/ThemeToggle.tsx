
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size={isMobile ? "sm" : "icon"}
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === "light" ? (
        <Moon className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      ) : (
        <Sun className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
