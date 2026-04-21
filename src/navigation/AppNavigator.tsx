import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import EventNavigator from "./EventNavigator";
import UserNavigator from "./UserNavigator";
import OthersNavigator from "./OthersNavigator";
import DGroupNavigator from "./DGroupNavigator";
import LoginScreen from "src/features/auth/screens/LoginScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="BottomNavigator" component={BottomTabNavigator} />
			<Stack.Screen name="EventNavigator" component={EventNavigator} />
			<Stack.Screen name="UserNavigator" component={UserNavigator} />
			<Stack.Screen name="DGroupNavigator" component={DGroupNavigator} />
			<Stack.Screen name="OthersNavigator" component={OthersNavigator} />
			{/* <Stack.Screen name="SharedNavigator" component={SharedNavigator} /> */}
		</Stack.Navigator>
	);
}

export default AppNavigator;
