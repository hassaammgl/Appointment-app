/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { AuthState } from "@/types";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined");
}

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const getErrorMessage = (err: any): string => {
  return (
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong. Please try again."
  );
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      organization: null,
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await axiosInstance.post("/auth/login", {
            email,
            password,
          });

          set({ user: data.user, isAuthenticated: true });
        } catch (err: any) {
          const errorMessage = getErrorMessage(err);
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      signup: async (email, password, username, role, organization) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await axiosInstance.post("/auth/register", {
            email,
            password,
            username,
            role,
            organization: organization,
          });

          set({ user: data.user, isAuthenticated: true });
        } catch (err: any) {
          const errorMessage = getErrorMessage(err);
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const { data } = await axiosInstance.get("/auth/me");
          set({ user: data.user, isAuthenticated: true });
        } catch {
          await get().logout(); // logout clears state too
        } finally {
          set({ isLoading: false });
        }
      },

      getOrganization: async () => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await axiosInstance.get(
            "/protected/get-organization",
          );
          set({ organization: data.organization });
        } catch (err: any) {
          const errorMessage = getErrorMessage(err);
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      renewOrganization: async (id) => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await axiosInstance.post(
            `/protected/renew/${id}/org`,
          );
          set({ organization: data.organization });
        } catch (err: any) {
          const errorMessage = getErrorMessage(err);
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },
      saveUserDevice: async (userId, onesignalId) => {
        try {
          set({ isLoading: true, error: null });
          await axiosInstance.put("/auth/add-user-device-id", {
            deviceId: onesignalId,
            userId,
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
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
