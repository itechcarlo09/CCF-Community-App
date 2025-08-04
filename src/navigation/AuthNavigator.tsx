// src/navigation/AuthNavigator.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/view/LoginScreen";

export type AuthStackParamList = {
	Login: undefined;
	// Register: undefined;
	// ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: true,
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ title: "Sign In" }}
			/>
			{/* <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} /> */}
			{/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset Password' }} /> */}
		</Stack.Navigator>
	);
};

export default AuthNavigator;
