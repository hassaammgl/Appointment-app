import type { Appointment } from "@/types";
import MainMeetingCards from "@/shared/MainMeetingCards";

const RequestsCards = ({
  requests: meetings,
  toggleFetchAgain,
  tabValue,
}: {
  requests: Appointment[];
  toggleFetchAgain: () => void;
  tabValue: string;
}) => {

  return (
    <div className="sm:hidden">
      <div className="w-full rounded-xl border border-accent p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          <span className="text-green-500"></span> {tabValue.toUpperCase()}
          Requests
        </h1>

        {meetings?.length > 0 ? (
          <div
            className={"flex flex-col gap-4"}
          >
            {meetings?.map((meeting) => (
              <MainMeetingCards
                key={meeting?._id}
                meeting={meeting}
                toggleFetchAgain={toggleFetchAgain}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            {"No meeting requests yet 🙃"}
          </p>
        )}
      </div>
    </div>
  );
};

// const priorityColors = {
//   0: "text-green-500 border-green-500",
//   1: "text-orange-500 border-orange-500",
//   2: "text-red-500 border-red-500",
// };

// const statusColors: Record<string, string> = {
//   pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
//   approved: "bg-green-100 text-green-800 border-green-300",
//   rejected: "bg-red-100 text-red-800 border-red-300",
// };

export default RequestsCards;
