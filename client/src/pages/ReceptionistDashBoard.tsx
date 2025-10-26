import {
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  PlusIcon,
} from "lucide-react";
import type { StatsArrType } from "@/types";
import Loader from "@/components/Loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import OneSignalWrapper from "@/layout/OneSignalWrapper";
import { AppLayout } from "@/layout/AppLayout";
import { Suspense } from "react";
import { useAuth } from "@/store/auth";
import { useMeetings } from "@/store/mettings";
import RequestedMeetings from "@/dashboards/Receptionist/RequestedMeetings";
import ScheduleMeetings from "@/dashboards/Receptionist/ScheduleMeetings";
import StatsCards from "@/dashboards/others/StatsCards";

const StatsArr: StatsArrType[] = [
  {
    title: "Total",
    lengthName: "all",
    Icon: Clock,
  },
  {
    title: "Pending",
    lengthName: "pending",
    Icon: AlertCircle,
  },
  {
    title: "Approved",
    lengthName: "approved",
    Icon: CheckCircle2,
  },
  {
    title: "Rejected",
    lengthName: "rejected",
    Icon: XCircle,
  },
];

const ReceptionistDashBoard = () => {
  const { user } = useAuth();
  const { meetings } = useMeetings();

  const getStatusCount = (status: string): number =>
    meetings?.filter((request) =>
      status === "all" ? true : request.status === status
    ).length;

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
                <ScheduleMeetings userId={user?.id} />
              </Dialog>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm font-medium">
            {StatsArr.map((val, i) => (
              <StatsCards
                key={i}
                title={val.title}
                Icon={val.Icon}
                length={getStatusCount(val.lengthName ?? "all")}
                lengthName={val.lengthName}
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

export default ReceptionistDashBoard;
