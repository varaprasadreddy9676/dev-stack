
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="bg-card shadow-md rounded-lg p-8 max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. If you believe this is a mistake, please contact your administrator.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild variant="outline">
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Sign in with a different account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
