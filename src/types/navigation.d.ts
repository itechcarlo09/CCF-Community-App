import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {};

export type AuthStackParamList = {
	Login: undefined;
	// Register: undefined;
	// ForgotPassword: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<
	AuthStackParamList,
	T
>;

export type AppStackParamList = {
	Login: undefined;
	BottomNavigator: undefined;
	EventNavigator: undefined;
	UserNavigator: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export type AppRouteProp<T extends keyof AppStackParamList> = RouteProp<
	AppStackParamList,
	T
>;

export type UserStackParamList = {
	UserForm: { id?: string }; // Optional id for editing existing user
};

export type UserNavigationProp = NativeStackNavigationProp<UserStackParamList>;
export type UserRouteProp<T extends keyof UserStackParamList> = RouteProp<
	UserStackParamList,
	T
>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
