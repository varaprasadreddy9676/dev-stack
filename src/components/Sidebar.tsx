
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { navigationItems, utilityItems } from "./sidebar/sidebarData";
import { useSidebar } from "./ui/sidebar";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const isMobile = useIsMobile();
  const { state, toggleSidebar } = useSidebar();

  const handleToggleSidebar = () => {
    // Use the sidebar context's toggle function
    toggleSidebar();
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
      collapsed={state === "collapsed"}
      toggleSidebar={handleToggleSidebar}
      className={className}
    />
  );
}
