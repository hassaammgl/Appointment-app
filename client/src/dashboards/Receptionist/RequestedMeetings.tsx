import React, { useEffect, useState } from "react";
import { useMeetings } from "@/store/mettings";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MettingCards from "@/shared/MettingCards";

interface ScheduleMeetingsProps {
	userId?: string;
	setTabValue: (data: string) => void;
}

const RequestedMeetings = ({ userId }: ScheduleMeetingsProps) => {
	const [isFetchAgain, setIsFetchAgain] = useState<boolean>(false);
	const [layout, setLayout] = useState<"grid" | "list">("grid");

	const { fetchAllReq, meetings } = useMeetings();

	console.table(meetings);

	const toggleFetchAgain = () => {
		setIsFetchAgain((prev) => !prev);
	};

	useEffect(() => {
		if (userId) fetchAllReq();
	}, [fetchAllReq, userId, isFetchAgain]);

	return (
		<div className="w-full rounded-xl border border-accent p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">
				Latest Requests
			</h1>

			<div className="flex justify-end mb-4">
				<span className="rounded-xl border border-accent flex overflow-hidden">
					<Button
						onClick={() => setLayout("grid")}
						variant={layout === "grid" ? "default" : "outline"}
					>
						<LayoutGrid />
					</Button>
					<Separator orientation="vertical" />
					<Button
						onClick={() => setLayout("list")}
						variant={layout === "list" ? "default" : "outline"}
					>
						<LayoutList />
					</Button>
				</span>
			</div>

			{/* Render Cards */}
			{meetings?.length > 0 ? (
				<div
					className={
						layout === "grid"
							? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
							: "flex flex-col gap-4"
					}
				>
					{meetings?.map((meeting) => (
						<MettingCards
							key={meeting?._id}
							meeting={meeting}
							toggleFetchAgain={toggleFetchAgain}
						/>
					))}
				</div>
			) : (
				<p className="text-center text-muted-foreground py-8">
					{userId
						? "No meeting requests yet 🙃"
						: "No user ID provided 🧐"}
				</p>
			)}
		</div>
	);
};

export default RequestedMeetings;
