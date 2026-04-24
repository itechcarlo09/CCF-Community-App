import React, { createContext, useState, ReactNode } from "react";
import { AppModeContextType } from "./appMode.types";
import { AppMode } from "@features/profile/components/ModeCard";

export const AppModeContext = createContext<AppModeContextType | undefined>(
	undefined,
);

export const AppModeProvider = ({ children }: { children: ReactNode }) => {
	const [appMode, setAppMode] = useState<AppMode>(AppMode.MemberMode);

	return (
		<AppModeContext.Provider value={{ appMode, setAppMode }}>
			{children}
		</AppModeContext.Provider>
	);
};
