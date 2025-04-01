
import { Home, Folder, BookOpen, Layout, Settings, Search } from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const navigationItems: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Components", href: "/components", icon: Layout },
  { name: "Coding Guidelines", href: "/guidelines", icon: BookOpen },
];

export const utilityItems: NavigationItem[] = [
  { name: "Search", href: "/search", icon: Search },
  { name: "Settings", href: "/settings", icon: Settings },
];
