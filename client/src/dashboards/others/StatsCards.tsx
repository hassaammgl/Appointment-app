import type { StatsCardsType } from "@/types";

const StatsCards = ({ title, length, Icon, lengthName }: StatsCardsType) => {
  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full 
        transition-all duration-200 hover:scale-105 cursor-default
        ${getStatusColor(lengthName)}
      `}
    >
      <Icon className="size-4" />
      <span className="text-gray-300">{title}:</span>
      <span className="font-bold text-white">{length}</span>
    </div>
  );
};

export default StatsCards;

const getStatusColor = (type?: string) => {
  switch (type) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    case "approved":
      return "bg-green-500/20 text-green-300 border border-green-500/30";
    case "rejected":
      return "bg-red-500/20 text-red-300 border border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
  }
};
