import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import CEODashBoard from "@/pages/CEODashBoard";
import CTODashBoard from "@/pages/CTODashBoard";
import CFODashBoard from "@/pages/CFODashBoard";
import ReceptionistDashBoard from "@/pages/ReceptionistDashBoard";
import GMDashBoard from "@/pages/GMDashBoard";
import SettingsPage from "@/pages/SettingsPage";

import { useRoute } from "@/store/route";

const Route = () => {
	const { route } = useRoute();
	return (
		<div className="w-full h-screen">
			{route === "/login" ? <LoginPage /> : null}
			{route === "/signup" ? <SignupPage /> : null}
			{route === "/profile" ? <ProfilePage /> : null}
			{route === "/ceo-dashboard" ? <CEODashBoard /> : null}
			{route === "/cto-dashboard" ? <CTODashBoard /> : null}
			{route === "/cfo-dashboard" ? <CFODashBoard /> : null}
			{route === "/receptionist-dashboard" ? (
				<ReceptionistDashBoard />
			) : null}
			{route === "/gm-dashboard" ? <GMDashBoard /> : null}
			{route === "/settings" ? <SettingsPage /> : null}
		</div>
	);
};

export default Route;


