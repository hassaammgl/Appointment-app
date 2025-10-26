import { useState, useEffect } from "react";
import { useMeetings } from "@/store/mettings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { EyeClosed, Eye } from "lucide-react";
import type { MeetingCardInterface } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/store/settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const priorityColors = {
  0: "text-green-500 border-green-500",
  1: "text-orange-500 border-orange-500",
  2: "text-red-500 border-red-500",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

const MainMeetingCards = ({
  meeting,
  toggleFetchAgain,
}: MeetingCardInterface) => {
  const [showDetails, setShowDetails] = useState(false);
  const [priority, setPriority] = useState(meeting.priority);

  const { approveMeetingReq, rejectMeetingReq, updatePriority } = useMeetings();
  const { settings } = useSettings();
  const { info, success, error: errToast, removeAllToasts } = useToast();

  // Sync priority when meeting updates
  useEffect(() => {
    setPriority(meeting.priority);
  }, [meeting.priority]);

  const maskCnic = (cnic: string) =>
    cnic ? `${cnic.slice(0, 3)}*****${cnic.slice(-3)}` : "";
  const maskPhone = (phone: string) =>
    phone ? `${phone.slice(0, 3)}****${phone.slice(-3)}` : "";

  const safeStatus = meeting.status ?? "pending";
  const isPending = safeStatus === "pending";

  const hasContactInfo =
    (settings.addPersonContact && meeting.visitorNo) ||
    (settings.addPersonCnic && meeting.visitorCnic);

  // Handlers
  const handleApprove = async () => {
    try {
      info("Approving Schedule...");
      await approveMeetingReq(meeting._id);
      removeAllToasts();
      success("Request Approved");
      toggleFetchAgain();
    } catch (err) {
      removeAllToasts();
      const message =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ??
        (err as Error)?.message ??
        "Approval failed";
      errToast(message);
    }
  };

  const handleReject = async () => {
    try {
      info("Rejecting Schedule...");
      await rejectMeetingReq(meeting._id);
      removeAllToasts();
      success("Request Rejected");
      toggleFetchAgain();
    } catch (err) {
      removeAllToasts();
      const message =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ??
        (err as Error)?.message ??
        "Rejection failed";
      errToast(message);
    }
  };

  const handlePriority = async (val: string) => {
    const numVal = Number(val);
    if (numVal === priority) return;

    try {
      info("Updating priority...");
      await updatePriority(meeting._id, numVal);
      setPriority(Number(numVal) as 0 | 1 | 2);
      removeAllToasts();
      success("Priority updated");
      toggleFetchAgain();
    } catch (err) {
      removeAllToasts();
      const message =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ??
        (err as Error)?.message ??
        "Priority update failed";
      errToast(message);
    }
  };

  return (
    <Card className="flex h-full w-full flex-col">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="truncate text-base">
          {meeting.visitorName}
        </CardTitle>

        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${
              priorityColors[priority] ?? ""
            }`}
          >
            {priority === 0 ? "Normal" : priority === 1 ? "High" : "Urgent"}
          </Badge>

          <Badge
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${
              statusColors[safeStatus] ?? statusColors.pending
            }`}
          >
            {safeStatus}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="flex-1 space-y-3 text-sm">
        {settings.addPurpose && (
          <p className="leading-relaxed">{meeting.purpose}</p>
        )}

        {settings.addNotes && meeting.notes && (
          <p className="text-muted-foreground">{meeting.notes}</p>
        )}

        {hasContactInfo && (
          <>
            <Separator />
            <div className="space-y-1">
              {settings.addPersonContact && meeting.visitorNo && (
                <p>
                  <strong>Contact:</strong>{" "}
                  {showDetails
                    ? meeting.visitorNo
                    : maskPhone(meeting.visitorNo)}
                </p>
              )}
              {settings.addPersonCnic && meeting.visitorCnic && (
                <p>
                  <strong>ID No:</strong>{" "}
                  {showDetails
                    ? meeting.visitorCnic
                    : maskCnic(meeting.visitorCnic)}
                </p>
              )}
            </div>

            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 font-normal text-muted-foreground hover:text-primary"
              onClick={() => setShowDetails((v) => !v)}
            >
              {showDetails ? (
                <>
                  Hide <EyeClosed className="ml-1 h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Show <Eye className="ml-1 h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </>
        )}

        {hasContactInfo && <Separator />}

        <p>
          <strong>With:</strong>{" "}
          <span className="text-primary">({meeting?.to?.role})</span>{" "}
          {meeting?.to?.username}
        </p>
      </CardContent>

      <Separator />

      {/* Footer: Actions */}
      <CardFooter className="flex flex-col gap-3 text-xs">
        <div className="flex w-full items-center justify-between">
          <span className="text-muted-foreground">
            {new Date(meeting.createdAt).toLocaleDateString()}
          </span>

          {/* Priority Selector */}
          <Select value={String(priority)} onValueChange={handlePriority}>
            <SelectTrigger className="h-8 w-[110px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Normal</SelectItem>
              <SelectItem value="1">High</SelectItem>
              <SelectItem value="2">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full justify-between gap-2">
          {isPending ? (
            <>
              <Button
                size="sm"
                className="flex-1 bg-green-100 text-green-700 hover:bg-green-200"
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-red-100 text-red-700 hover:bg-red-200"
                onClick={handleReject}
              >
                Reject
              </Button>
            </>
          ) : (
            <>
              <div className="flex-1" />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MainMeetingCards;
