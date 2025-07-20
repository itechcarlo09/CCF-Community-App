import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigation";
import LoginScreen from "../views/LoginScreen";
import HomeScreen from "../views/HomeScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="BottomNavigation" component={BottomTabNavigator} />
		</Stack.Navigator>
	);
}
