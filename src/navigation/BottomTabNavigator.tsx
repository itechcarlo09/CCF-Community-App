import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native";
import HomeScreen from "../../views/HomeScreen";
import UserScreen from "../features/user/view/UserScreen";
import EventScreen from "../features/event/view/EventScreen";
import { useTheme } from "../theme/ThemeProvider";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
	const { theme } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: theme.blue[500],
				tabBarInactiveTintColor: theme.text,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName = "home";
					if (route.name === "HomeTab")
						iconName = focused ? "home" : "home-outline";
					else if (route.name === "EventTab")
						iconName = focused ? "calendar-clear" : "calendar-clear-outline";
					else if (route.name === "UserTab")
						iconName = focused ? "documents" : "documents-outline";
					else if (route.name === "AccountTab")
						iconName = focused ? "person-circle" : "person-circle-outline";
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="HomeTab" component={HomeScreen} />
			<Tab.Screen name="EventTab" component={EventScreen} />
			<Tab.Screen name="UserTab" component={UserScreen} />
			<Tab.Screen name="AccountTab" component={UserScreen} />
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
