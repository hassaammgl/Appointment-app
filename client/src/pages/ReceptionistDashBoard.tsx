import {
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  PlusIcon,
} from "lucide-react";
import type { StatsArrType, StatsCardsType } from "@/types";
import Loader from "@/components/Loader";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import OneSignalWrapper from "@/layout/OneSignalWrapper";
import { AppLayout } from "@/layout/AppLayout";
import { Suspense } from "react";
import { useAuth } from "@/store/auth";
import { useMeetings } from "@/store/mettings";
import RequestedMeetings from "@/dashboards/Receptionist/RequestedMeetings";
import ScheduleMeetings from "@/dashboards/Receptionist/ScheduleMeetings";

const StatsArr: StatsArrType[] = [
  {
    title: "Total Requests",
    lengthName: "all",
    Icon: Clock,
  },
  {
    title: "Pending Requests",
    lengthName: "pending",
    Icon: AlertCircle,
  },
  {
    title: "Approved Requests",
    lengthName: "approved",
    Icon: CheckCircle2,
  },
  {
    title: "Rejected Requests",
    lengthName: "rejected",
    Icon: XCircle,
  },
];

const ReceptionistDashBoard = () => {
  const { user } = useAuth();
  const { meetings } = useMeetings();

  // const getStatusCount = (status: string): number =>4
    // meetings?.filter((request) =>
    //   status === "all" ? true : request.status === status
    // ).length;
console.log(meetings);

  return (
    <OneSignalWrapper>
      <AppLayout allowedRoles={["receptionist"]}>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Receptionist Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage visitors and meeting schedules
              </p>
            </div>
            <div>
              <Dialog>
                <DialogTrigger className="bg-primary p-1 rounded-md">
                  <PlusIcon />
                </DialogTrigger>
                <DialogContent>
                  <ScheduleMeetings userId={user?.id} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {StatsArr.map((val, i) => (
              <StatsCards
                key={i}
                title={val.title}
                Icon={val.Icon}
                // length={getStatusCount(val.lengthName ?? "all")}
              />
            ))}
          </div>
          <Suspense fallback={<Loader />}>
            <RequestedMeetings userId={user?.id} />
          </Suspense>
        </div>
      </AppLayout>
    </OneSignalWrapper>
  );
};

const StatsCards = ({ title, length, Icon }: StatsCardsType) => {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {/* <p className="text-2xl font-bold">{length}</p> */}
        <p className="text-2xl font-bold">{5}</p>
      </CardContent>
    </Card>
  );
};

export default ReceptionistDashBoard;
