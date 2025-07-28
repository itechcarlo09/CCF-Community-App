import React, { createContext, useContext, useState, ReactNode } from "react";
import { darkColors, lightColors, ThemeType } from "./colors";

type ThemeContextType = {
	theme: ThemeType;
	isDarkMode: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: lightColors,
	isDarkMode: false,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => setIsDarkMode((prev) => !prev);

	return (
		<ThemeContext.Provider
			value={{
				theme: isDarkMode ? darkColors : lightColors,
				isDarkMode,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
