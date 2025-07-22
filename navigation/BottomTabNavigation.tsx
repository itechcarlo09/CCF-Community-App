import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../views/HomeScreen";
import EventNavigator from "./EventNavigation";
import { Alert, Button } from "react-native";
import EventScreen from "../views/Event/EventScreen";
import UserScreen from "../views/User/UserScreen";

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
					return <Ionicons name={"home-outline"} size={size} color={color} />;
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
				options={({ navigation }: any) => ({
					title: "Event",
					headerRight: () => (
						<Button
							onPress={() => navigation.navigate("EventNavigation")}
							title="Add Event"
							color="#000"
						/>
					),
				})}
			/>
			<Tab.Screen
				name="UserTab"
				component={UserScreen}
				options={({ navigation }: any) => ({
					title: "User",
					headerRight: () => (
						<Button
							onPress={() => navigation.navigate("UserNavigation")}
							title="Add User"
							color="#000"
						/>
					),
				})}
			/>
		</Tab.Navigator>
	);
}
