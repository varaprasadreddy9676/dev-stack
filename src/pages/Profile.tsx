
import UserProfile from "@/components/auth/UserProfile";

export default function Profile() {
  return (
    <div className="container max-w-3xl py-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Account Settings</h1>
      <UserProfile />
    </div>
  );
}
