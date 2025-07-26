import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
	return (
		// <Stack.Navigator
		// 	initialRouteName="Login"
		// 	screenOptions={{ headerShown: false }}
		// >
		// 	<Stack.Screen name="Login" component={LoginScreen} />
		// 	<Stack.Screen name="AppNavigator" component={AppNavigator} />
		// </Stack.Navigator>
		<NavigationContainer>
			{/* {user ? <AppNavigator /> : <AuthNavigator />} */}
			<AppNavigator />
		</NavigationContainer>
	);
}
