import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SettingsState } from "@/types";


export const useSettings = create<SettingsState>()(
	persist(
		(set) => ({
			settings: {
				addNotes: false,
				addPersonCnic: false,
				addPurpose: false,
				addPersonContact: false,
			},
			updateSetting: (key, value) =>
				set((state) => ({
					settings: {
						...state.settings,
						[key]: value,
					},
				})),
			resetSettings: () =>
				set({
					settings: {
						addNotes: false,
						addPersonCnic: false,
						addPurpose: false,
						addPersonContact: false,
					},
				}),
		}),
		{
			name: "settings-storage",
		}
	)
);
