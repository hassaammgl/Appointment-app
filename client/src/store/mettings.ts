import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { persist } from "zustand/middleware";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true,
});

export interface Appointment {
	_id: string;
	visitorName: string;
	purpose: string;
	time: string;
	status: "pending" | "approved" | "rejected";
	priority: number;
	createdAt: string;
	updatedAt: string;
	receptionist: string; // user ID
	ceo: string; // user ID
}

interface MeetingState {
	meetings: Appointment[];
	isLoading: boolean;
	error: string | null;
	fetchMeetings: () => Promise<void>;
	createMeeting: (data: Partial<Appointment>) => Promise<void>;
	updateStatus: (
		id: string,
		status: "approved" | "rejected",
		priority?: number
	) => Promise<void>;
	clearError: () => void;
}

const getErrorMessage = (err: AxiosError): string => {
	return (
		err?.response?.data?.message ||
		err?.message ||
		"Something went wrong. Try again."
	);
};

export const useMeetings = create<MeetingState>()(
	persist(
		(set, get) => ({
			meetings: [],
			isLoading: false,
			error: null,

			fetchMeetings: async () => {
				try {
					set({ isLoading: true, error: null });
					const { data } = await axiosInstance.get("/appointments");
					set({ meetings: data.appointments });
				} catch (err: ) {
					const msg = getErrorMessage(err);
					set({ error: msg });
				} finally {
					set({ isLoading: false });
				}
			},

			createMeeting: async (data) => {
				try {
					set({ isLoading: true, error: null });
					const res = await axiosInstance.post("/appointments", data);
					set((state) => ({
						meetings: [res.data.appointment, ...state.meetings],
					}));
				} catch (err) {
					const msg = getErrorMessage(err);
					set({ error: msg });
				} finally {
					set({ isLoading: false });
				}
			},

			updateStatus: async (id, status, priority) => {
				try {
					set({ isLoading: true });
					const res = await axiosInstance.patch(
						`/appointments/${id}`,
						{
							status,
							priority,
						}
					);

					set((state) => ({
						meetings: state.meetings.map((appt) =>
							appt._id === id ? res.data.appointment : appt
						),
					}));
				} catch (err) {
					const msg = getErrorMessage(err);
					set({ error: msg });
				} finally {
					set({ isLoading: false });
				}
			},

			clearError: () => set({ error: null }),
		}),
		{
			name: "meetings-storage",
			partialize: (state) => ({
				meetings: state.meetings,
			}),
		}
	)
);
