// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";

// // Axios instance with credentials for session cookies
// const axiosInstance = axios.create({
// 	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
// 	withCredentials: true, // 🍪👈 super important
// });

// interface User {
// 	_id: string;
// 	email: string;
// 	username: string;
// 	role: string;
// }

// interface AuthState {
// 	user: User | null;
// 	isAuthenticated: boolean;
// 	isLoading: boolean;
// 	error: string | null;
// 	login: (email: string, password: string) => Promise<void>;
// 	signup: (
// 		email: string,
// 		password: string,
// 		username: string,
// 		role: string
// 	) => Promise<void>;
// 	logout: () => Promise<void>;
// 	checkAuth: () => Promise<void>;
// 	clearError: () => void;
// }

// export const useAuth = create<AuthState>()(
// 	persist(
// 		(set, get) => ({
// 			user: null,
// 			isAuthenticated: false,
// 			isLoading: false,
// 			error: null,

// 			login: async (email, password) => {
// 				try {
// 					set({ isLoading: true, error: null });
// 					const { data } = await axiosInstance.post("/auth/login", {
// 						email,
// 						password,
// 					});

// 					// ✅ Cookie is now stored in browser by default
// 					set({ user: data.user, isAuthenticated: true });
// 				} catch (err: any) {
// 					set({
// 						error: err.response?.data?.message || "Login failed",
// 					});
// 				} finally {
// 					set({ isLoading: false });
// 				}
// 			},

// 			signup: async (email, password, username, role) => {
// 				try {
// 					set({ isLoading: true, error: null });
// 					const { data } = await axiosInstance.post(
// 						"/auth/register",
// 						{
// 							email,
// 							password,
// 							username,
// 							role,
// 						}
// 					);

// 					// ✅ Session cookie stored, user returned
// 					set({ user: data.user, isAuthenticated: true });
// 				} catch (err: any) {
// 					set({
// 						error: err.response?.data?.message || "Signup failed",
// 					});
// 				} finally {
// 					set({ isLoading: false });
// 				}
// 			},

// 			logout: async () => {
// 				try {
// 					await axiosInstance.post("/auth/logout"); // 👈 server should clear session
// 				} catch (err) {
// 					console.error("Logout error:", err);
// 				} finally {
// 					set({ user: null, isAuthenticated: false });
// 				}
// 			},

// 			checkAuth: async () => {
// 				try {
// 					set({ isLoading: true });
// 					const { data } = await axiosInstance.get("/auth/me");
// 					set({ user: data.user, isAuthenticated: true });
// 				} catch {
// 					get().logout();
// 				} finally {
// 					set({ isLoading: false });
// 				}
// 			},

// 			clearError: () => set({ error: null }),
// 		}),
// 		{
// 			name: "auth-storage",
// 			partialize: (state) => ({
// 				user: state.user,
// 				isAuthenticated: state.isAuthenticated,
// 			}),
// 		}
// 	)
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true,
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
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	clearError: () => void;
}

// 🔥 Central error parser
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

			signup: async (email, password, username, role) => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.post(
						"/auth/register",
						{
							email,
							password,
							username,
							role,
						}
					);

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
