
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserManagementTable from "@/components/auth/UserManagementTable";
import AddUserForm from "@/components/auth/AddUserForm";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function UserManagement() {
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => setShowAddUserForm(!showAddUserForm)}>
          <UserPlus className="mr-2 h-4 w-4" />
          {showAddUserForm ? "Cancel" : "Add User"}
        </Button>
      </div>

      {showAddUserForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account with specific permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <AddUserForm onComplete={() => setShowAddUserForm(false)} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage existing user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <UserManagementTable />
        </CardContent>
      </Card>
    </div>
  );
}
