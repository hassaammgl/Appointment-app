const RequestedMeetings = ({ userId }: { userId: string | undefined }) => {
	console.log(userId);

	return <div>RequestedMeetings {userId}</div>;
};

export default RequestedMeetings;
