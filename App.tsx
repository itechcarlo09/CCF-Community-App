/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@component/toast/ToastContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<KeyboardProvider>
				<SafeAreaProvider>
					<ThemeProvider>
						<ToastProvider>
							<RootNavigator />
						</ToastProvider>
					</ThemeProvider>
				</SafeAreaProvider>
			</KeyboardProvider>
		</QueryClientProvider>
	);
}

export default App;
