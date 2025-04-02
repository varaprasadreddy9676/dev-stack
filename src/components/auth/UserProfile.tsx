
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { User, UserCheck } from "lucide-react";

const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
  email: z.string().email("Invalid email address").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfile() {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const success = await updateProfile({
        username: data.username,
      });
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="w-full shadow-sm">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Profile</CardTitle>
          <CardDescription>You need to be logged in to view your profile</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="p-4 md:p-6 pb-2 md:pb-3">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg md:text-xl">Your Profile</CardTitle>
        </div>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      autoComplete="username"
                      className="h-10 md:h-11 text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                      disabled
                      className="h-10 md:h-11 text-sm md:text-base bg-muted/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Separator className="mb-5" />
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Account Information</p>
              </div>
              <div className="bg-muted/30 rounded-md p-3 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">Active</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 h-11 text-sm md:text-base"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </span>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
