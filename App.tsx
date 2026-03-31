/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<KeyboardProvider>
					<ThemeProvider>
						<SafeAreaView style={{ flex: 1 }}>
							<RootNavigator />
						</SafeAreaView>
					</ThemeProvider>
				</KeyboardProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}

export default App;
