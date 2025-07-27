import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserFormScreen from "../features/user/view/UserFormScreen";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="UserForm" component={UserFormScreen} />
		</Stack.Navigator>
	);
}
