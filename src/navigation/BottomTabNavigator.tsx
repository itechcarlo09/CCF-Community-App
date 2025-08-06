import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../views/HomeScreen";
import UserScreen from "../features/user/view/UserScreen";
import EventScreen from "../features/event/view/EventScreen";
import { useTheme } from "../theme/ThemeProvider";
import MdiIcon from "../components/MdiIcon";
import { tabIconMap } from "../utils/tabIconMap";

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
			<Tab.Screen name="HomeTab" component={HomeScreen} />
			<Tab.Screen name="EventTab" component={EventScreen} />
			<Tab.Screen name="UserTab" component={UserScreen} />
			<Tab.Screen name="AccountTab" component={UserScreen} />
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
