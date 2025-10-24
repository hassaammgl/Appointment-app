import { AppLayout } from "@/layout/Applayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/store/auth";
import OneSignalWrapper from "@/layout/OneSignalWrapper";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <OneSignalWrapper>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              View and manage your account details
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-4xl">
                    {user?.username?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-4 text-center sm:text-left">
                  <div>
                    <h3 className="font-medium uppercase">
                      <span className="text-green-500">Name: </span>
                      {user?.username}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-medium">
                      <span className="text-green-500 uppercase">Email: </span>
                      {user?.email}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-medium uppercase">
                      <span className="text-green-500">Role: </span>
                      {user?.role === "gm" ? "general manager" : user?.role}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </OneSignalWrapper>
  );
};

export default ProfilePage;
