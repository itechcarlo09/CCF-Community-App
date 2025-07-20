import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventScreen from "../views/Event/EventScreen";
import EventFormScreen from "../views/Event/EventFormScreen";

const Stack = createNativeStackNavigator();

export default function EventNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="EventForm" component={EventFormScreen} />
		</Stack.Navigator>
	);
}
