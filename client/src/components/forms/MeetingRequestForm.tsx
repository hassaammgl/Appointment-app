
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMeetings } from "@/contexts/MeetingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

type FormValues = {
  visitorName: string;
  visitorEmail: string;
  reason: string;
  date: string;
  assignedTo?: string;
};

const executives = [
  { id: "1", name: "CTO", email: "cto@example.com" },
  { id: "2", name: "CEO", email: "ceo@example.com" },
  { id: "3", name: "CFO", email: "cfo@example.com" },
  { id: "4", name: "General Manager", email: "gm@example.com" },
];

export const MeetingRequestForm = () => {
  const { createMeeting } = useMeetings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      visitorName: "",
      visitorEmail: "",
      reason: "",
      date: new Date().toISOString().split("T")[0],
      assignedTo: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Create meeting request
    createMeeting({
      visitorName: data.visitorName,
      visitorEmail: data.visitorEmail,
      reason: data.reason,
      date: data.date,
      assignedTo: data.assignedTo,
    });
    
    // Reset form
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Meeting Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="visitorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visitor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter visitor's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="visitorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visitor Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="visitor@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Purpose</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe the meeting purpose"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign To</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an executive" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {executives.map((executive) => (
                        <SelectItem key={executive.id} value={executive.id}>
                          {executive.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-green-primary hover:bg-green-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
