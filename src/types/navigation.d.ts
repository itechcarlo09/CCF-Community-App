import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// -----------------------------
// Root Stack (if you have multiple stacks, like Auth + App)
// -----------------------------
export type RootStackParamList = {
	AuthStack: undefined;
	AppStack: undefined;
};

// -----------------------------
// Auth Stack
// -----------------------------
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

// -----------------------------
// App Stack (main app navigation)
// -----------------------------
export type AppStackParamList = {
	Login: undefined;
	BottomNavigator: undefined;
	EventNavigator: undefined;
	UserNavigator: undefined; // This links to UserStack
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export type AppRouteProp<T extends keyof AppStackParamList> = RouteProp<
	AppStackParamList,
	T
>;

// -----------------------------
// User Stack (nested stack for user-related screens)
// -----------------------------
export type UserStackParamList = {
	UserForm: { id?: string; onSuccess?: () => void } | undefined;
	DleaderScreen: {
		id?: string;
		onSelect: (id: string, fullName: string) => void;
	}; // make id optional
};

export type UserNavigationProp<
	T extends keyof UserStackParamList = keyof UserStackParamList,
> = NativeStackNavigationProp<UserStackParamList, T>;
export type UserRouteProp<T extends keyof UserStackParamList> = RouteProp<
	UserStackParamList,
	T
>;

// -----------------------------
// Merge UserStack into ReactNavigation Root
// -----------------------------
declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends RootStackParamList,
				AppStackParamList,
				AuthStackParamList,
				UserStackParamList {}
	}
}
