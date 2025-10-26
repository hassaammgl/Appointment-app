import type { Appointment } from "@/types";
import MainMeetingCards from "@/components/shared/MainMeetingCards";

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
    <div className="xl:hidden">
      <div className="w-full rounded-xl border border-accent p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          <span className="text-primary">{tabValue.substring(0,1).toUpperCase()+tabValue.substring(1) + " "}</span> 
          Requests
        </h1>

        {meetings?.length > 0 ? (
          <div className={"flex flex-col gap-4"}>
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

export default RequestsCards;
