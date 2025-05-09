import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { persist, devtools } from "zustand/middleware";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true,
});

export interface Appointment {
	_id: string;
	visitorName: string;
	visitorNo: string;
	visitorCNIC: string;
	notes: string;
	purpose: string;
	status: "pending" | "approved" | "rejected";
	priority: number;
	createdAt: string;
	updatedAt: string;
	receptionist: string;
	to: string;
}

interface User {
	id: string;
	email: string;
	username: string;
	role: string;
}

interface MeetingState {
	allRoles: User[];
	meetings: Appointment[];
	isLoading: boolean;
	error: string | null;
	getAllRoles: () => Promise<void>;
	clearError: () => void;
}

export const useMeetings = create<MeetingState>()(
	devtools(
		persist(
			(set, get) => ({
				allRoles: [],
				meetings: [],
				isLoading: false,
				error: null,
				getAllRoles: async () => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.get(
							"/protected/roles"
						);

						set({ isLoading: false, allRoles: data?.roles });
					} catch (err) {
						const msg = getErrorMessage(err);
						set({ error: msg });
					}
				},

				// fetchMeetings: async () => {
				// 	try {
				// 		set({ isLoading: true, error: null });
				// 		const { data } = await axiosInstance.get("/appointments");
				// 		set({ meetings: data.appointments });
				// 	} catch (err) {
				// 		const msg = getErrorMessage(err);
				// 		set({ error: msg });
				// 	} finally {
				// 		set({ isLoading: false });
				// 	}
				// },

				// createMeeting: async (data) => {
				// 	try {
				// 		set({ isLoading: true, error: null });
				// 		const res = await axiosInstance.post("/appointments", data); // UNCOMMENT THIS
				// 		set((state) => ({
				// 			meetings: [res.data.appointment, ...state.meetings],
				// 		}));
				// 	} catch (err) {
				// 		const msg = getErrorMessage(err);
				// 		set({ error: msg });
				// 	} finally {
				// 		set({ isLoading: false });
				// 	}
				// },

				// updateStatus: async (id, status, priority) => {
				// 	try {
				// 		set({ isLoading: true });
				// 		const res = await axiosInstance.patch(
				// 			`/appointments/${id}`,
				// 			{
				// 				status,
				// 				priority,
				// 			}
				// 		);

				// 		set((state) => ({
				// 			meetings: state.meetings.map((appt) =>
				// 				appt._id === id ? res.data.appointment : appt
				// 			),
				// 		}));
				// 	} catch (err) {
				// 		const msg = getErrorMessage(err);
				// 		set({ error: msg });
				// 	} finally {
				// 		set({ isLoading: false });
				// 	}
				// },

				clearError: () => set({ error: null }),
			}),
			{
				name: "meetings-storage",
				partialize: (state) => ({
					meetings: state.meetings,
				}),
			}
		)
	)
);

const getErrorMessage = (err: AxiosError): string => {
	return (
		err?.response?.data?.message ||
		err?.message ||
		"Something went wrong. Try again."
	);
};

// fetchMeetings: () => Promise<void>;
// createMeeting: (data: Partial<Appointment>) => Promise<void>;
// updateStatus: (
// 	id: string,
// 	status: "approved" | "rejected",
// 	priority?: number
// ) => Promise<void>;
