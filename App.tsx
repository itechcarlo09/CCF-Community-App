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

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<KeyboardProvider>
				<ThemeProvider>
					<ToastProvider>
						<RootNavigator />
					</ToastProvider>
				</ThemeProvider>
			</KeyboardProvider>
		</QueryClientProvider>
	);
}

export default App;
