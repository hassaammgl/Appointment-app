import { create } from "zustand";
import axios from "axios";
import { persist, devtools } from "zustand/middleware";
import type { MeetingState } from "@/types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://sapps.site/api/",
  withCredentials: true,
});

export const useMeetings = create<MeetingState>()(
  devtools(
    persist(
      (set) => ({
        allRoles: [],
        meetings: [],
        isLoading: false,
        message: null,
        error: null,
        getAllRoles: async () => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await axiosInstance.get("/meetings/roles", {
              headers: { "Cache-Control": "no-cache" },
            });

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
              "/meetings/met-req",
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
              `/meetings/cancel-req/${reqid}`
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
              `/meetings/approve-req/${reqid}`
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
              `/meetings/reject-req/${reqid}`
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
              `/meetings/update-priority/${reqid}`,
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
            const { data } = await axiosInstance.get("/meetings/get-all-reqs", {
              headers: { "Cache-Control": "no-cache" },
            });
            set({ meetings: data?.allMettings });
          } catch (err: any) {
            const errorMessage = getErrorMessage(err);
            set({ error: errorMessage });
            throw new Error(errorMessage);
          } finally {
            set({ isLoading: false });
          }
        },
        fetchAllReqsByRoles: async (userId) => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await axiosInstance.get(
              `/meetings/get-reqs-by-roles/${userId}`
            );
            set({
              meetings: data?.mettings,
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

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.message ??
      err.message ??
      "Something went wrong. Try again."
    );
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Something went wrong. Try again.";
};
