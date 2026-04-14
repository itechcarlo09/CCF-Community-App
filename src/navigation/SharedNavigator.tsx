import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolFormScreen from "src/features/schools/view/SchoolFormScreen";
import CompanyFormScreen from "src/features/company/view/CompanyFormScreen";

const Stack = createNativeStackNavigator();

export default function SharedNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SchoolFormScreen" component={SchoolFormScreen} />
			<Stack.Screen name="CompanyFormScreen" component={CompanyFormScreen} />
		</Stack.Navigator>
	);
}
