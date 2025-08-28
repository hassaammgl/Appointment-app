import type { ReactNode } from "react";

export interface AppLayoutProps {
	children: ReactNode;
	allowedRoles?: string[];
}

export interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

export interface Appointment {
	_id: string;
	visitorName: string;
	visitorNo: string;
	visitorCnic: string;
	purpose: string;
	status?: "pending" | "approved" | "rejected";
	priority: 0 | 1 | 2;
	createdBy?: {
		_id: string;
		username: string;
		role: string;
	};
	to?: {
		_id: string;
		username: string;
		role: string;
	};
	notes: string;
	createdAt: string;
	updatedAt: string;
}
type PostAppointment = {
	_id?: string;
	visitorName?: string;
	visitorNo?: string;
	visitorCnic?: string;
	purpose?: string;
	status?: "pending" | "approved" | "rejected";
	priority?: 0 | 1 | 2;
	createdBy?: string;
	to?: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
};

type User = {
	_id: string;
	email: string;
	username: string;
	role: string;
};

export interface MeetingState {
	allRoles: User[];
	meetings: Appointment[];
	isLoading: boolean;
	message: string | null;
	error: string | null;
	getAllRoles: () => Promise<void>;
	createMeetingReq: (formData: Partial<PostAppointment>) => Promise<void>;
	fetchAllReq: () => Promise<void>;
	cancelMeetingReq: (reqId: string) => Promise<void>;
	approveMeetingReq: (reqId: string) => Promise<void>;
	rejectMeetingReq: (reqId: string) => Promise<void>;
	updatePriority: (reqid: string, value: number) => Promise<void>;
	fetchAllReqsByRoles: (userId: string | undefined) => Promise<void>;
	clearError: () => void;
}

export type MeetingCardInterface = {
	meeting: Appointment;
	toggleFetchAgain: () => void;
};

export type StatsCardsType = {
	title: string;
	length?: number;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
export type StatsArrType = {
	title: string;
	lengthName?: string | undefined;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type ScheduleMeetingsProps = {
	userId?: string;
	setTabValue: (data: string) => void;
};

type Settings = {
	addNotes: boolean;
	addPersonCnic: boolean;
	addPurpose: boolean;
	addPersonContact: boolean;
};

export type SettingsState = {
	settings: Settings;
	updateSetting: (key: keyof Settings, value: boolean) => void;
	resetSettings: () => void;
};

type AuthUser = {
	id: string;
	email: string;
	username: string;
	role: string;
};

type organization = {
	name: string;
	isPremium: boolean;
	premiumStartedAt: string;
	premiumExpiresAt: string;
};

export type AuthState = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	organization: organization | null;
	login: (
		email: string,
		password: string,
		fcmToken: string | null
	) => Promise<void>;
	signup: (
		email: string,
		password: string,
		username: string,
		role: string,
		organization: string,
		// fcmToken: string | null
	) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	getOrganization: () => Promise<void>;
	renewOrganization: (id: string | undefined) => Promise<void>;
	clearError: () => void;
};
