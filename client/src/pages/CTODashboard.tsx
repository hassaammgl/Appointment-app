import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const CTODashboard = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout allowedRoles={["cto"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CTO Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects and meeting requests
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Projects
              </CardTitle>
              <Badge>8</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                3 nearing deadline
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Across 4 departments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Healthy</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Sprint</CardTitle>
            <CardDescription>
              Sprint #24 - Ends in 8 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">API Integration</TableCell>
                  <TableCell>Sarah K.</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-300">In Progress</Badge>
                  </TableCell>
                  <TableCell className="text-right">65%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Database Optimization</TableCell>
                  <TableCell>Michael R.</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/20 text-green-700 border-green-300">Completed</Badge>
                  </TableCell>
                  <TableCell className="text-right">100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">UI Redesign</TableCell>
                  <TableCell>Jessica T.</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-500/20 text-amber-700 border-amber-300">In Progress</Badge>
                  </TableCell>
                  <TableCell className="text-right">40%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Security Audit</TableCell>
                  <TableCell>David L.</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-700 border-blue-300">Planned</Badge>
                  </TableCell>
                  <TableCell className="text-right">0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Meeting Requests Panel */}
        {user && <MeetingRequestsPanel userId={user.id} />}
      </div>
    </AppLayout>
  );
};
