
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useMeetings } from "@/contexts/MeetingContext";
import { MeetingCard } from "@/components/shared/MeetingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const VisitorDashboard = () => {
  const { user } = useAuth();
  const { getVisitorMeetings, createMeeting } = useMeetings();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      createMeeting({
        visitorName: name,
        visitorEmail: email,
        reason,
        date,
      });
      
      // Reset form
      setReason("");
      setDate("");
      setIsSubmitting(false);
    }, 500);
  };

  const meetings = user ? getVisitorMeetings(user.email) : [];

  return (
    <AppLayout allowedRoles={["visitor"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visitor Dashboard</h1>
          <p className="text-muted-foreground">
            Request meetings and track your meeting status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request a Meeting Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Request a Meeting</CardTitle>
              <CardDescription>
                Fill out the form to submit a new meeting request
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Meeting</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="min-h-24"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-green-primary hover:bg-green-dark" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* My Requests */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">My Requests</h2>
            {meetings.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                  No meeting requests found. Submit a request to get started!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
