import StatsCards from "@/dashboards/others/StatsCards";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeetings } from "@/store/mettings";
import { useEffect, useState } from "react";
import RequestsTable from "./RequestsTable";
import { useAuth } from "@/store/auth";
import type { StatsArrType } from "@/types";
import RequestsCards from "./RequestsCards";

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

const UserDashBoard = () => {
  const { fetchAllReqsByRoles, meetings = [] } = useMeetings();
  const [isFetchAgain, setIsFetchAgain] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchAllReqsByRoles(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAllReqsByRoles, isFetchAgain]);

  const toggleFetchAgain = () => setIsFetchAgain((prev) => !prev);

  useEffect(() => {
    const interval = setInterval(() => {
      toggleFetchAgain();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const [mainTabValue, setMainTabValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = meetings.filter((request) => {
    const matchesStatus =
      mainTabValue === "all" ? true : request?.status === mainTabValue;
    const matchesSearch = request?.visitorName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusCount = (status: string): number =>
    meetings.filter((request) =>
      status === "all" ? true : request.status === status,
    ).length;

  return (
    <div className="w-full h-fit border p-4 rounded-xl">
      <div className="hidden sm:grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {StatsArr.map((val, i) => (
          <StatsCards
            key={i}
            title={val.title}
            Icon={val.Icon}
            length={getStatusCount(val.lengthName ?? "all")}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between flex-col gap-2">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search appointments..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full flex-1 sm:hidden">
            <Select value={mainTabValue} onValueChange={setMainTabValue}>
              <SelectTrigger>
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All ({getStatusCount("all")})
                </SelectItem>
                <SelectItem value="pending">
                  Pending ({getStatusCount("pending")})
                </SelectItem>
                <SelectItem value="approved">
                  Approved ({getStatusCount("approved")})
                </SelectItem>
                <SelectItem value="rejected">
                  Rejected ({getStatusCount("rejected")})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <RequestsCards
          toggleFetchAgain={toggleFetchAgain}
          requests={filteredRequests}
          tabValue={mainTabValue}
        />

        <Tabs
          className="hidden sm:block"
          value={mainTabValue}
          onValueChange={setMainTabValue}
        >
          <TabsList className="w-full">
            <TabsTrigger value="all">All ({getStatusCount("all")})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({getStatusCount("pending")})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({getStatusCount("approved")})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({getStatusCount("rejected")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <RequestsTable
              toggleFetchAgain={toggleFetchAgain}
              requests={filteredRequests}
            />
          </TabsContent>
          <TabsContent value="pending">
            <RequestsTable
              toggleFetchAgain={toggleFetchAgain}
              requests={filteredRequests}
            />
          </TabsContent>
          <TabsContent value="approved">
            <RequestsTable
              toggleFetchAgain={toggleFetchAgain}
              requests={filteredRequests}
            />
          </TabsContent>
          <TabsContent value="rejected">
            <RequestsTable
              toggleFetchAgain={toggleFetchAgain}
              requests={filteredRequests}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashBoard;
