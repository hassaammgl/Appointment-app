import { Button } from "@/components/ui/button";
import React from "react";
import { useRoute } from "@/store/route";

const Link = ({
	children,
	to,
	className,
}: {
	children: React.ReactNode;
	to: string;
	className?: string;
}) => {
	const { setRoute } = useRoute();

	const handleRoute = () => {
		setRoute(to);
	};

	return (
		<Button onClick={handleRoute} variant={"link"} className={className}>
			{children}
		</Button>
	);
};

export default Link;
