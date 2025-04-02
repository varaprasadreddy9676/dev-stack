
import UserProfile from "@/components/auth/UserProfile";

export default function Profile() {
  return (
    <div className="container max-w-3xl py-4 md:py-6 px-3 md:px-6 space-y-4 md:space-y-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Account Settings</h1>
      <UserProfile />
    </div>
  );
}
