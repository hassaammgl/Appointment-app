
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import type { Meeting } from "@/contexts/MeetingContext";
import type { Meeting } from "@/contexts/MeetingContext";

import { StatusBadge } from "./StatusBadge";
import { CalendarIcon } from "lucide-react";

interface MeetingCardProps {
  meeting: Meeting;
  children?: React.ReactNode;
}

export const MeetingCard = ({ meeting, children }: MeetingCardProps) => {
  const formattedDate = new Date(meeting.date).toLocaleDateString();
  const formattedCreated = new Date(meeting.createdAt).toLocaleDateString();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{meeting.reason}</CardTitle>
          <StatusBadge status={meeting.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Visitor</p>
            <p className="text-sm text-muted-foreground">{meeting.visitorName}</p>
            <p className="text-xs text-muted-foreground">{meeting.visitorEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formattedDate}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Requested: {formattedCreated}
          </div>
        </div>
      </CardContent>
      {children && (
        <CardFooter className="pt-2">
          {children}
        </CardFooter>
      )}
    </Card>
  );
};
