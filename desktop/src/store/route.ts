import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { RouteState } from "@/types";

export const useRoute = create<RouteState>()(
    devtools(
        (set) => ({
            route: '/login',
            setRoute: (route) => set({ route: route })
        }),
    )
);


