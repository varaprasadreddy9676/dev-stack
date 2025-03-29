
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Fix the toggle to use next theme rather than current theme
  const toggleTheme = () => {
    // Toggle theme using the opposite of the current theme
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log("Theme toggled to:", newTheme);
  };

  // Debug the current theme
  useEffect(() => {
    console.log("Current theme:", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 transition-all" />
      ) : (
        <Sun className="h-5 w-5 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
