
import { useAuth } from "@/contexts/auth";
import { Page } from "@/types";

export const usePagePermissions = (page: Page | null, userId: string | undefined) => {
  const { hasPermission } = useAuth();
  
  const canEdit = () => {
    if (!page || !userId) return false;
    
    // Admin can always edit
    if (hasPermission(['admin'])) return true;
    
    // Check if user's role is in the page's canEdit permissions
    if (userId && page.permissions.canEdit.includes(userId)) return true;
    
    // Check if user is the creator of the page
    if (page.metadata.createdBy === userId) return true;
    
    return false;
  };

  return {
    canEdit,
  };
};
