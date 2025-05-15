import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
	addNotes: boolean;
	addPersonCnic: boolean;
	addPurpose: boolean;
	addPersonContact: boolean;
}

interface SettingsState {
	settings: Settings;
	updateSetting: (key: keyof Settings, value: boolean) => void;
	resetSettings: () => void;
}

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
