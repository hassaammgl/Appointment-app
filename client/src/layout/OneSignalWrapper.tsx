import type { ReactNode } from "react";
import { useOneSignal } from "@/fetaure/onesignal";

const OneSignalWrapper = ({ children }: { children: ReactNode }) => {
	useOneSignal();
	return <>{children}</>;
};

export default OneSignalWrapper;
