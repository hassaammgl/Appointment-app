import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { RouteState } from "@/types";

export const useRoute = create<RouteState>()(
    devtools(
        persist(
            (set) => ({
                route: '/login',
                setRoute: (route) => set({ route: route })
            }),
            {
                name: "meetings-storage",
                partialize: (state) => ({
                    route: state.route,
                }),
            }
        )
    )
);


