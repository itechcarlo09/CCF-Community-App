import { AppMode } from "@features/profile/components/ModeCard";

export type AppModeContextType = {
	appMode: AppMode;
	setAppMode: (mode: AppMode) => void;
};
