import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user-store";
import useAuthStore from "@/store/auth-store";
import { ArrowRight, Crown, LayoutDashboard, Lock, LogOut, Mail, MapPin, Pencil, User } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { UpdateProfileDialog } from "@/components/profile/update-profile";
import { OrderHistory } from "@/components/profile/order-history";
import { WishlistSection } from "@/components/profile/wishlist";

export default function Profile() {
  const navigate = useNavigate();
  const { user, fetchUser } = useUserStore();
  const { user_id, logout, role } = useAuthStore();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const showConstructionMessage = () => {
    toast.info("This feature is under construction!", {
      description: "We're working hard to bring you this feature soon.",
    });
  }

  useEffect(() => {
    fetchUser(user_id!);
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src="https://www.icegif.com/wp-content/uploads/2024/09/anime-icegif-4.gif" alt="Profile picture" className="w-full h-full object-cover rounded-full" />
                  <User className="w-12 h-12 text-primary" />
                </div>
                {role === 'admin' && (
                  <div className="absolute -top-2 -right-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Crown className="h-3 w-3 text-primary-foreground" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{user?.name}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowUpdateDialog(true)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user?.address || "No address provided"}
                </div>

                {role === 'admin' && (
                  <div className="mt-7 rounded-lg bg-primary/10 px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Admin Access Granted</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/admin')}
                        className="gap-2"
                      >
                        Visit Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Account Security</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your password and security settings
                </p>
              </div>
              <Button variant="outline" onClick={showConstructionMessage}>
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
        <OrderHistory />
        <WishlistSection />
      </div>

      <UpdateProfileDialog
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
      />
    </div>
  );
}