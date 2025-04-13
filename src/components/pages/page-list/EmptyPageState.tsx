
import { Link } from "react-router-dom";
import { FileText, Clock, User, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyPageStateProps {
  type: "all" | "recent" | "my-pages" | "favorites";
}

export const EmptyPageState = ({ type }: EmptyPageStateProps) => {
  // Determine the correct icon, title, and message based on the tab type
  const getContent = () => {
    switch (type) {
      case "all":
        return {
          icon: <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />,
          title: "No Pages Found",
          message: "There are no pages created yet.",
          showButton: true
        };
      case "recent":
        return {
          icon: <Clock className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />,
          title: "No Recent Pages",
          message: "There are no recently updated pages.",
          showButton: false
        };
      case "my-pages":
        return {
          icon: <User className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />,
          title: "No Pages Created By You",
          message: "You haven't created any pages yet.",
          showButton: true
        };
      case "favorites":
        return {
          icon: <Settings className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />,
          title: "Favorites Feature Coming Soon",
          message: "The ability to favorite pages will be available in a future update.",
          showButton: false
        };
      default:
        return {
          icon: <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />,
          title: "No Pages Found",
          message: "There are no pages available.",
          showButton: true
        };
    }
  };

  const { icon, title, message, showButton } = getContent();

  return (
    <div className="col-span-full text-center py-10">
      {icon}
      <h2 className="text-xl font-medium mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      {showButton && (
        <Button asChild>
          <Link to="/pages/create">
            <Plus className="mr-1 h-4 w-4" /> Create New Page
          </Link>
        </Button>
      )}
    </div>
  );
};
