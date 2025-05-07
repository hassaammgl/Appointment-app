import { useAuth } from "@/store/auth";

const ProfilePage = () => {
	const { user } = useAuth();
	console.log(user);

	return (
		<div>
			<span className="text-8xl">Role: {user?.role}</span>
		</div>
	);
};

export default ProfilePage;
