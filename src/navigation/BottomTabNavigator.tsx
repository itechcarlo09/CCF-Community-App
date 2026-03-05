import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../views/HomeScreen";
import UserScreen from "../features/user/view/UserScreen";
import EventScreen from "../features/event/view/EventScreen";
import { useTheme } from "../theme/ThemeProvider";
import MdiIcon from "../components/MdiIcon";
import { tabIconMap } from "../utils/tabIconMap";
import DashboardScreen from "../features/dashboard/view/DashboardScreen";

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
					type TabName = (typeof bottomTabNames)[number];
					const iconConfig = tabIconMap[route.name as TabName];
					const iconName = focused ? iconConfig.focused : iconConfig.unfocused;

					return <MdiIcon path={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="HomeTab"
				component={DashboardScreen}
				options={{ title: "Home" }}
			/>
			<Tab.Screen
				name="EventTab"
				component={EventScreen}
				options={{ title: "Events" }}
			/>
			<Tab.Screen
				name="UserTab"
				component={UserScreen}
				options={{ title: "Records" }}
			/>
			<Tab.Screen
				name="AccountTab"
				component={UserScreen}
				options={{ title: "Account" }}
			/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
