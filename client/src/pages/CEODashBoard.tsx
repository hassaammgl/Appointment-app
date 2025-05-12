import { AppLayout } from "@/layout/Applayout";
import { useAuth } from "@/store/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const CEODashBoard = () => {
	const [tabValue, setTabValue] = useState("all-requests");
	const { user } = useAuth();
	console.log(user);

	return (
		<AppLayout allowedRoles={["ceo"]}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						CEO Dashboard
					</h1>
					<p className="text-muted-foreground">
						Executive overview and meeting management
					</p>
				</div>
				<Tabs
					value={tabValue}
					onValueChange={setTabValue}
					className="w-full"
				>
					<TabsList className="mx-auto">
						<TabsTrigger value="all-requests">
							All Requests
						</TabsTrigger>
						<TabsTrigger value="normal-requests">
							Normal Requests
						</TabsTrigger>
						<TabsTrigger value="med-requests">
							Medium Requests
						</TabsTrigger>
						<TabsTrigger value="urgent-requests">
							Urgent Requests
						</TabsTrigger>
					</TabsList>
					<TabsContent value="all-requests">All Requests</TabsContent>
					<TabsContent value="urgent-requests">
						Urgent Requests
					</TabsContent>
					<TabsContent value="med-requests">
						Medium Requests
					</TabsContent>
					<TabsContent value="normal-requests">
						Normal Requests
					</TabsContent>
				</Tabs>
			</div>
		</AppLayout>
	);
};

export default CEODashBoard;
