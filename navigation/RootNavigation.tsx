import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigation";
import LoginScreen from "../views/LoginScreen";
import EventNavigator from "./EventNavigation";
import UserNavigator from "./UserNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="BottomNavigation" component={BottomTabNavigator} />
			<Stack.Screen name="EventNavigation" component={EventNavigator} />
			<Stack.Screen name="UserNavigation" component={UserNavigator} />
		</Stack.Navigator>
	);
}
