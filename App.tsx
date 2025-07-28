/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigator from "./src/navigation/RootNavigator";
import { ThemeProvider } from "./src/theme/ThemeProvider";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<ThemeProvider>
			<RootNavigator />
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
