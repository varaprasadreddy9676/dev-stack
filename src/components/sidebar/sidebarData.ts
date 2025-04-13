
import { 
  Home, 
  Folder, 
  BookOpen, 
  Layout, 
  Settings, 
  Search, 
  Users, 
  FileText 
} from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  requiredRole?: string[];
}

export const navigationItems: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Components", href: "/components", icon: Layout },
  { name: "Coding Guidelines", href: "/guidelines", icon: BookOpen },
  { name: "Pages", href: "/pages", icon: FileText },
  { name: "User Management", href: "/users", icon: Users, requiredRole: ["admin"] },
];

export const utilityItems: NavigationItem[] = [
  { name: "Search", href: "/search", icon: Search },
  { name: "Settings", href: "/settings", icon: Settings },
];
