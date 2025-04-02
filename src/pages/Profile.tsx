
import UserProfile from "@/components/auth/UserProfile";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Profile() {
  const isMobile = useIsMobile();
  
  return (
    <div className="container max-w-3xl py-3 md:py-6 px-3 md:px-6 space-y-3 md:space-y-6">
      {isMobile && (
        <Link 
          to="/" 
          className="flex items-center text-sm text-muted-foreground mb-1"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      )}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Account Settings</h1>
      <UserProfile />
    </div>
  );
}
