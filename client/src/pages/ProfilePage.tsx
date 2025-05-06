import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfilePage = () => {
	const user = {
		name: "Dude",
		email: "dude@dude.com",
		avatar: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/05/naruto-s-sage-of-six-paths-mode-over-naruto-vs-sasuke.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
		role: "King",
	};

	return (
		<AppLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Profile
					</h1>
					<p className="text-muted-foreground">
						View and manage your account details
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
							<Avatar className="h-24 w-24">
								<AvatarImage
									src={user?.avatar}
									alt={user?.name}
								/>
								<AvatarFallback className="text-4xl">
									{user?.name?.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>

							<div className="space-y-4 text-center sm:text-left">
								<div>
									<h3 className="font-medium">Name</h3>
									<p className="text-muted-foreground">
										{user?.name}
									</p>
								</div>
								<div>
									<h3 className="font-medium">Email</h3>
									<p className="text-muted-foreground">
										{user?.email}
									</p>
								</div>
								<div>
									<h3 className="font-medium">Role</h3>
									<p className="text-muted-foreground capitalize">
										{user?.role}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
};
