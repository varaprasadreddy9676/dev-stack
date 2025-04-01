
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { navigationItems, utilityItems } from "./sidebar/sidebarData";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
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

  // For mobile, we'll use the MobileSidebar component
  if (isMobile) {
    return <MobileSidebar navigation={navigationItems} utilities={utilityItems} />;
  }

  // For desktop, we'll use the DesktopSidebar component
  return (
    <DesktopSidebar
      navigation={navigationItems}
      utilities={utilityItems}
      collapsed={collapsed}
      toggleSidebar={toggleSidebar}
      className={className}
    />
  );
}
