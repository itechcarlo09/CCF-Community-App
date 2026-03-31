import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DGroupListScreen from "src/features/dgroup/view/DGroupListScreen";

const Stack = createNativeStackNavigator();

export default function DGroupNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="DGroupListScreen" component={DGroupListScreen} />
		</Stack.Navigator>
	);
}
