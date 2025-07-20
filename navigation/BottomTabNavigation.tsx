import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../views/HomeScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: "#007bff",
				tabBarInactiveTintColor: "gray",
				tabBarIcon: ({ color, size }) => {
					let iconName = "";
					if (route.name === "HomeTab") iconName = "home-outline";
					else if (route.name === "ProfileTab") iconName = "person-outline";
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
		</Tab.Navigator>
	);
}
