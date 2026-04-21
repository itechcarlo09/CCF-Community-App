import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventFormScreen from "../feature/event/view/EventFormScreen";

const Stack = createNativeStackNavigator();

function EventNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="EventForm" component={EventFormScreen} />
		</Stack.Navigator>
	);
}

export default EventNavigator;
