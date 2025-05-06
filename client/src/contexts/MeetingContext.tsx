
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";

export type MeetingStatus = "pending" | "approved" | "rejected";

export interface Meeting {
  id: string;
  visitorName: string;
  visitorEmail: string;
  reason: string;
  status: MeetingStatus;
  date: string;
  assignedTo?: string;
  createdAt: string;
}

interface MeetingContextType {
  meetings: Meeting[];
  createMeeting: (meeting: Omit<Meeting, "id" | "status" | "createdAt">) => void;
  assignMeeting: (meetingId: string, employeeId: string) => void;
  updateMeetingStatus: (meetingId: string, status: MeetingStatus) => void;
  getVisitorMeetings: (visitorEmail: string) => Meeting[];
  getEmployeeMeetings: (employeeId: string) => Meeting[];
  getAllMeetings: () => Meeting[];
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

// Mock initial meetings
const initialMeetings: Meeting[] = [
  {
    id: "1",
    visitorName: "John Doe",
    visitorEmail: "visitor@example.com",
    reason: "Product discussion",
    status: "pending",
    date: "2025-05-10",
    createdAt: "2025-05-05T10:30:00.000Z",
  },
  {
    id: "2",
    visitorName: "Jane Smith",
    visitorEmail: "jane@example.com",
    reason: "Sales inquiry",
    status: "approved",
    date: "2025-05-12",
    assignedTo: "3",
    createdAt: "2025-05-04T14:20:00.000Z",
  },
  {
    id: "3",
    visitorName: "Bob Johnson",
    visitorEmail: "bob@example.com", 
    reason: "Job interview",
    status: "rejected",
    date: "2025-05-08",
    assignedTo: "3",
    createdAt: "2025-05-02T09:15:00.000Z",
  },
];

export const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);

  const createMeeting = (meeting: Omit<Meeting, "id" | "status" | "createdAt">) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: Math.random().toString(36).substring(2, 9),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setMeetings((prev) => [...prev, newMeeting]);
    toast.success("Meeting request submitted successfully");
  };

  const assignMeeting = (meetingId: string, employeeId: string) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === meetingId
          ? { ...meeting, assignedTo: employeeId }
          : meeting
      )
    );
    toast.success("Meeting assigned successfully");
  };

  const updateMeetingStatus = (meetingId: string, status: MeetingStatus) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, status } : meeting
      )
    );
    toast.success(`Meeting ${status} successfully`);
  };

  const getVisitorMeetings = (visitorEmail: string) => {
    return meetings.filter((meeting) => meeting.visitorEmail === visitorEmail);
  };

  const getEmployeeMeetings = (employeeId: string) => {
    return meetings.filter((meeting) => meeting.assignedTo === employeeId);
  };

  const getAllMeetings = () => {
    return meetings;
  };

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        createMeeting,
        assignMeeting,
        updateMeetingStatus,
        getVisitorMeetings,
        getEmployeeMeetings,
        getAllMeetings,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error("useMeetings must be used within a MeetingProvider");
  }
  return context;
};
