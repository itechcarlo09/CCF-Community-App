import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MinistryPage } from "src/features/ministry/view/MinistryPage";

const Stack = createNativeStackNavigator();

export default function OthersNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MinistryPage" component={MinistryPage} />
		</Stack.Navigator>
	);
}
