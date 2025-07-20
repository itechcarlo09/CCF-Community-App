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

const Stack = createNativeStackNavigator();

function App() {
	const isDarkMode = useColorScheme() === "dark";

	return (
		// <View style={styles.container}>
		// 	<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
		// 	<NewAppScreen templateFileName="App.tsx" />
		// </View>
		// <LoginView />
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
