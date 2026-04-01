import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MinistryPage } from "src/features/ministry/view/MinistryPage";
import CreateMinistryScreen from "src/features/ministry/view/MinistryFormScreem";
import { SchoolListScreen } from "src/features/schools/view/SchoolListScreen";

const Stack = createNativeStackNavigator();

export default function OthersNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MinistryPage" component={MinistryPage} />
			<Stack.Screen
				name="CreateMinistryScreen"
				component={CreateMinistryScreen}
			/>
			<Stack.Screen name="SchoolListScreen" component={SchoolListScreen} />
		</Stack.Navigator>
	);
}
