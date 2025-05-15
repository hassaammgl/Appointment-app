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
	visitorCnic: string;
	purpose: string;
	status?: "pending" | "approved" | "rejected";
	priority: 0 | 1 | 2;
	createdBy: {
		_id: string;
		username: string;
	};
	to?: {
		_id: string;
		username: string;
	};
	notes: string;
	createdAt: string;
	updatedAt: string;
}
interface Appointment2 {
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
}

interface User {
	_id: string;
	email: string;
	username: string;
	role: string;
}

interface MeetingState {
	allRoles: User[];
	meetings: Appointment[];
	isLoading: boolean;
	page: number;
	totalMettings: number;
	limit: number;
	totalPages: number;
	message: string | null;
	error: string | null;
	getAllRoles: () => Promise<void>;
	createMeetingReq: (formData: Partial<Appointment2>) => Promise<void>;
	fetchAllReq: () => Promise<void>;
	cancelMeetingReq: (reqId: string) => Promise<void>;
	approveMeetingReq: (reqId: string) => Promise<void>;
	rejectMeetingReq: (reqId: string) => Promise<void>;
	updatePriority: (reqid: string, value: number) => Promise<void>;
	fetchAllReqsByRoles: (
		role: string,
		page: number,
		limit: number
	) => Promise<void>;
	clearError: () => void;
}

export const useMeetings = create<MeetingState>()(
	devtools(
		persist(
			(set) => ({
				allRoles: [],
				meetings: [],
				isLoading: false,
				page: 1,
				limit: 2,
				totalMettings: 0,
				totalPages: 0,
				message: null,
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
				createMeetingReq: async (formData) => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.post(
							"/protected/met-req",
							formData
						);

						set({ message: data?.message });
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
					} finally {
						set({ isLoading: false });
					}
				},
				cancelMeetingReq: async (reqid) => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.delete(
							`/protected/cancel-req/${reqid}`
						);
						set({ message: data?.message });
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
					} finally {
						set({ isLoading: false });
					}
				},
				approveMeetingReq: async (reqid) => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.put(
							`/protected/approve-req/${reqid}`
						);
						set({ message: data?.message });
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
					} finally {
						set({ isLoading: false });
					}
				},
				rejectMeetingReq: async (reqid) => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.put(
							`/protected/reject-req/${reqid}`
						);
						set({ message: data?.message });
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
					} finally {
						set({ isLoading: false });
					}
				},
				updatePriority: async (reqid, value) => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.put(
							`/protected/update-priority/${reqid}`,
							{
								data: value,
							}
						);
						set({ message: data?.message });
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
					} finally {
						set({ isLoading: false });
					}
				},
				fetchAllReq: async () => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.get(
							"/protected/get-all-reqs"
						);
						set({ meetings: data?.allMettings });
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
					} finally {
						set({ isLoading: false });
					}
				},
				fetchAllReqsByRoles: async (role, page, limit) => {
					try {
						set({ isLoading: true, error: null });
						const { data } = await axiosInstance.get(
							`/protected/get-reqs-by-roles/${role}/${page}/${limit}`
						);
						set({
							meetings: [data?.data],
							totalMettings: data?.total,
						});
					} catch (err: any) {
						const errorMessage = getErrorMessage(err);
						set({ error: errorMessage });
						throw new Error(errorMessage);
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
	)
);

const getErrorMessage = (err: AxiosError): string => {
	return (
		err?.response?.data?.message ||
		err?.message ||
		"Something went wrong. Try again."
	);
};
