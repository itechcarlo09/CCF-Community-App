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

const Stack = createNativeStackNavigator();

function App() {
	const isDarkMode = useColorScheme() === "dark";

	return <RootNavigator />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
