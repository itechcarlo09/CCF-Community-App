import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserFormScreen from "../features/user/view/UserFormScreen";
import DleaderScreen from "../features/user/view/DleaderScreen";
import UserDetailsScreen from "../features/user/view/UserDetailsScreen";
import UserDetailScreen from "src/features/user/view/UserDetailScreen";
import UserDetailFormScreen from "src/features/user/view/UserDetailFormScreen";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="UserForm" component={UserDetailFormScreen} />
			<Stack.Screen name="UserDetailsScreen" component={UserDetailScreen} />
			<Stack.Screen name="DleaderScreen" component={DleaderScreen} />
		</Stack.Navigator>
	);
}
