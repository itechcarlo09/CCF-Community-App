import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../views/HomeScreen";
import EventScreen from "../views/EventScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: "#007bff",
				tabBarInactiveTintColor: "gray",
				tabBarIcon: ({ color, size }) => {
					let iconName = "home-outline";
					if (route.name === "HomeTab") iconName = "home-outline";
					else if (route.name === "EventTab") iconName = "person-outline";
					else if (route.name === "SettingsTab") iconName = "settings-outline";
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="HomeTab"
				component={HomeScreen}
				options={{ title: "Home" }}
			/>
			<Tab.Screen
				name="EventTab"
				component={EventScreen}
				options={{ title: "Event" }}
			/>
		</Tab.Navigator>
	);
}
