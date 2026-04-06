import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DleaderScreen from "../features/user/view/DleaderScreen";
import UserDetailScreen from "src/features/user/view/UserDetailScreen";
import UserDetailFormScreen from "src/features/user/view/UserDetailFormScreen";
import EducationFormScreen from "src/features/user/view/UserEducationFormScreen";
import { SchoolListScreen } from "src/features/schools/view/SchoolListScreen";
import SchoolFormScreen from "src/features/schools/view/SchoolFormScreen";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="UserForm" component={UserDetailFormScreen} />
			<Stack.Screen
				name="EducationFormScreen"
				component={EducationFormScreen}
			/>
			<Stack.Screen name="UserDetailsScreen" component={UserDetailScreen} />
			<Stack.Screen name="DleaderScreen" component={DleaderScreen} />
			<Stack.Screen name="SchoolListScreen" component={SchoolListScreen} />
			<Stack.Screen name="SchoolFormScreen" component={SchoolFormScreen} />
		</Stack.Navigator>
	);
}
