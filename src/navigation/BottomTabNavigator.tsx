import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../theme/ThemeProvider";
import MdiIcon from "../component/MdiIcon";
import { tabIconMap } from "../utils/tabIconMap";
import OtherScreen from "src/feature/others/view/OtherScreen";
import EventListScreen from "src/feature/event/view/EventListScreen";
import { DashboardScreen } from "src/feature/dashboard/view/DashboardScreen";
import UserListScreen from "src/feature/user/view/UserListScreen";
import DGroupListScreen from "src/feature/dgroup/view/DGroupListScreen";
import ProfileScreen from "@features/profile/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
	const { theme } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.background,
					borderTopColor: theme.muted,
				},
				tabBarActiveTintColor: theme.primary,
				tabBarInactiveTintColor: theme.muted,
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
				component={UserListScreen}
				options={{ title: "Members" }}
			/>
			<Tab.Screen
				name="DGroupTab"
				component={DGroupListScreen}
				options={{ title: "DGroups" }}
			/>
			<Tab.Screen
				name="OthersTab"
				component={OtherScreen}
				options={{ title: "Others" }}
			/>
			<Tab.Screen
				name="ProfileTab"
				component={ProfileScreen}
				options={{ title: "Profile" }}
			/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
