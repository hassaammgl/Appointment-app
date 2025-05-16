import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import type { StatsCardsType } from "@/types";

const StatsCards = ({ title, length, Icon }: StatsCardsType) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="size-4  text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{length}</div>
			</CardContent>
		</Card>
	);
};

export default StatsCards;
