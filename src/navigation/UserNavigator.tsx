import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserFormScreen from "../features/user/view/UserFormScreen";
import DleaderScreen from "../features/user/view/DleaderScreen";
import UserDetailsScreen from "../features/user/view/UserDetailsScreen";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="UserForm" component={UserFormScreen} />
			<Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
			<Stack.Screen name="DleaderScreen" component={DleaderScreen} />
		</Stack.Navigator>
	);
}
