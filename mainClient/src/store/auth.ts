import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

interface User {
	_id: string;
	email: string;
	username: string;
	role: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (
		email: string,
		password: string,
		username: string,
		role: string
	) => Promise<void>;
	logout: () => void;
	checkAuth: () => Promise<void>;
	clearError: () => void;
}

export const useAuth = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			login: async (email, password) => {
				try {
					set({ isLoading: true, error: null });
					const { data } = await axiosInstance.post("/auth/login", {
						email,
						password,
					});

					axiosInstance.defaults.headers.common[
						"Authorization"
					] = `Bearer ${data.token}`;
					set({ user: data.user, isAuthenticated: true });
				} catch (err: any) {
					set({
						error: err.response?.data?.message || "Login failed",
					});
				} finally {
					set({ isLoading: false });
				}
			},

			signup: async (email, password, username) => {
				try {
					set({ isLoading: true, error: null });
					const { data } = await axiosInstance.post(
						"/auth/register",
						{ email, password, username }
					);

					axiosInstance.defaults.headers.common[
						"Authorization"
					] = `Bearer ${data.token}`;
					set({ user: data.user, isAuthenticated: true });
				} catch (err: any) {
					set({
						error: err.response?.data?.message || "Signup failed",
					});
				} finally {
					set({ isLoading: false });
				}
			},

			logout: () => {
				set({ user: null, isAuthenticated: false });
				delete axiosInstance.defaults.headers.common["Authorization"];
				localStorage.removeItem("token");
			},

			checkAuth: async () => {
				try {
					set({ isLoading: true });
					const { data } = await axiosInstance.get("/auth/me");
					set({ user: data.user, isAuthenticated: true });
				} catch {
					get().logout();
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
		}
	)
);
