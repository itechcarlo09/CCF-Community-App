import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../views/HomeScreen";
import UserScreen from "../features/user/view/UserScreen";
import EventScreen from "../features/event/view/EventScreen";
import { useTheme } from "../theme/ThemeProvider";
import MdiIcon from "../components/MdiIcon";
import { tabIconMap } from "../utils/tabIconMap";
import OtherScreen from "src/features/others/view/OtherScreen";
import EventListScreen from "src/features/event/view/EventListScreen";
import { DashboardScreen } from "src/features/dashboard/view/DashboardScreen";

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
				name="DashboardTab"
				component={DashboardScreen}
				options={{ title: "Dashboard" }}
			/>
			<Tab.Screen
				name="EventTab"
				component={EventListScreen}
				options={{ title: "Events" }}
			/>
			<Tab.Screen
				name="UserTab"
				component={UserScreen}
				options={{ title: "Members" }}
			/>
			<Tab.Screen
				name="DGroupTab"
				component={UserScreen}
				options={{ title: "DGroups" }}
			/>
			<Tab.Screen
				name="OthersTab"
				component={OtherScreen}
				options={{ title: "Others" }}
			/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
