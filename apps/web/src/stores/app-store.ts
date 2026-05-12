import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
	workspaceName: string;
	smartNotificationsEnabled: boolean;
	lastSavedAt: string | null;
	setWorkspaceName: (name: string) => void;
	setSmartNotificationsEnabled: (enabled: boolean) => void;
	savePreferences: () => void;
};

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			workspaceName: 'Kara local',
			smartNotificationsEnabled: false,
			lastSavedAt: null,
			setWorkspaceName: (name) => {
				set({ workspaceName: name });
			},
			setSmartNotificationsEnabled: (enabled) => {
				set({ smartNotificationsEnabled: enabled });
			},
			savePreferences: () => {
				set({ lastSavedAt: new Date().toISOString() });
			},
		}),
		{
			name: 'kara-app-store',
			partialize: (state) => ({
				workspaceName: state.workspaceName,
				smartNotificationsEnabled: state.smartNotificationsEnabled,
				lastSavedAt: state.lastSavedAt,
			}),
		},
	),
);
