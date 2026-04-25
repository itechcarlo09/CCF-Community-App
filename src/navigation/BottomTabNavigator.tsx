import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../theme/ThemeProvider";
import MdiIcon from "../component/MdiIcon";
import { tabIconMap } from "../utils/tabIconMap";
import OtherScreen from "src/feature/others/view/OtherScreen";
import EventListScreen from "src/feature/event/view/EventListScreen";
import UserListScreen from "src/feature/user/view/UserListScreen";
import DGroupListScreen from "src/feature/dgroup/view/DGroupListScreen";
import ProfileScreen from "@features/profile/screens/ProfileScreen";
import { useAppMode } from "src/context/app-mode";
import { AppMode } from "@features/profile/components/ModeCard";
import HomeScreen from "@features/home/screens/HomeScreen";
import DashboardScreen from "@features/dashboard/screens/DashboardScreen";

const Tab = createBottomTabNavigator();

const TAB_CONFIG = {
	[AppMode.MemberMode]: [
		{ name: "EventTab", component: EventListScreen, title: "Events" },
		{ name: "HomeTab", component: HomeScreen, title: "Home" },
		{ name: "ProfileTab", component: ProfileScreen, title: "Profile" },
	],

	[AppMode.Management]: [
		{ name: "DashboardTab", component: DashboardScreen, title: "Dashboard" },
		{ name: "UserTab", component: UserListScreen, title: "Members" },
		{ name: "DGroupTab", component: DGroupListScreen, title: "DGroups" },
		{ name: "ProfileTab", component: ProfileScreen, title: "Profile" },
	],

	[AppMode.SuperAdmin]: [
		{ name: "UserTab", component: UserListScreen, title: "Members" },
		{ name: "DGroupTab", component: DGroupListScreen, title: "DGroups" },
		{ name: "EventTab", component: EventListScreen, title: "Events" },
		{ name: "OthersTab", component: OtherScreen, title: "Others" },
		{ name: "ProfileTab", component: ProfileScreen, title: "Profile" },
	],
};

function BottomTabNavigator() {
	const { theme } = useTheme();
	const { appMode } = useAppMode();
	const tabs = TAB_CONFIG[appMode] ?? TAB_CONFIG[AppMode.MemberMode];

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.background,
					borderTopColor: theme.muted,
				},
				tabBarActiveTintColor: theme.active.textColor,
				tabBarInactiveTintColor: theme.muted,
				tabBarIcon: ({ focused, color, size }) => {
					type TabName = (typeof bottomTabNames)[number];
					const iconConfig = tabIconMap[route.name as TabName];
					const iconName = focused ? iconConfig.focused : iconConfig.unfocused;

					return <MdiIcon path={iconName} size={size} color={color} />;
				},
			})}
		>
			<>
				{tabs.map((tab) => (
					<Tab.Screen
						key={tab.name}
						name={tab.name}
						component={tab.component}
						options={{ title: tab.title }}
					/>
				))}
			</>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
