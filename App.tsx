/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/LoginScreen";
import HomeScreen from "./views/HomeScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigation";
import RootNavigator from "./navigation/RootNavigation";

const Stack = createNativeStackNavigator();

function App() {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
