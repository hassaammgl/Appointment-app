
import type { MeetingStatus } from "@/contexts/MeetingContext";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: MeetingStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "pending" && "bg-amber-500/20 text-amber-700 dark:text-amber-400",
        status === "approved" && "bg-green-500/20 text-green-700 dark:text-green-400",
        status === "rejected" && "bg-red-500/20 text-red-700 dark:text-red-400"
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
