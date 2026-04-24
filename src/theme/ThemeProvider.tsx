import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Appearance, useColorScheme } from "react-native";
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
	const systemTheme = useColorScheme(); // "light" | "dark"
	const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

	// Sync with system theme on mount + change
	useEffect(() => {
		setIsDarkMode(systemTheme === "dark");

		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setIsDarkMode(colorScheme === "dark");
		});

		return () => subscription.remove();
	}, [systemTheme]);

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
