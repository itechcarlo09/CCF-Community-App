import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootNavigator() {
	return (
		// <Stack.Navigator
		// 	initialRouteName="Login"
		// 	screenOptions={{ headerShown: false }}
		// >
		// 	<Stack.Screen name="Login" component={LoginScreen} />
		// 	<Stack.Screen name="AppNavigator" component={AppNavigator} />
		// </Stack.Navigator>
		<GestureHandlerRootView>
			<NavigationContainer>
				{/* {user ? <AppNavigator /> : <AuthNavigator />} */}
				<AppNavigator />
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}
