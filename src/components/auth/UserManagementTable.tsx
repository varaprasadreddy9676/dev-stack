
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";
import { User } from "@/types/auth";
import { API_CONFIG } from "@/config/config";
import { toast } from "@/hooks/use-toast";

// Add a getUserList function to the authService to fetch all users
const fetchUsers = async (token: string): Promise<User[]> => {
  try {
    // This is a mock function for now - you'd need to implement the actual API endpoint
    // In a real implementation, you would call an API endpoint like:
    // const response = await fetch(`${API_CONFIG.BASE_URL}/auth/users`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    
    // For now, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return [
      {
        _id: "1",
        username: "admin",
        email: "admin@example.com",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        username: "contentmanager",
        email: "content@example.com",
        role: "content_manager",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "3",
        username: "developer1",
        email: "dev1@example.com",
        role: "developer",
        createdAt: new Date().toISOString(),
      },
    ] as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default function UserManagementTable() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) return;
      
      try {
        setIsLoading(true);
        const userList = await fetchUsers(token);
        setUsers(userList);
      } catch (error) {
        toast({
          title: "Failed to load users",
          description: "Could not load user list. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "content_manager":
        return "default";
      case "developer":
        return "secondary";
      default:
        return "outline";
    }
  };

  // These functions would be implemented in a real application
  const handleEdit = (userId: string) => {
    toast({
      title: "Edit user",
      description: `Editing user ${userId} - This feature is not implemented yet.`,
    });
  };

  const handleDelete = (userId: string) => {
    toast({
      title: "Delete user",
      description: `Deleting user ${userId} - This feature is not implemented yet.`,
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <div className="py-4 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-muted-foreground">No users found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role) as any}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{new Date(user.createdAt as string).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(user._id)}>
                    <EditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(user._id)}>
                    <Trash2Icon className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
