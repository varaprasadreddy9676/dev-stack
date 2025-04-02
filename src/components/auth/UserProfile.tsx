
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
      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-lg md:text-xl">Profile</CardTitle>
          <CardDescription>You need to be logged in to view your profile</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-lg md:text-xl">Your Profile</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      className="text-sm md:text-base"
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
                      className="text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-muted-foreground">Role: <span className="font-medium text-foreground">{user.role}</span></p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto text-sm"
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
