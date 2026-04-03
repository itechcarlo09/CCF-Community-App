import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Gender from "./enums/Gender";

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
	UserNavigator: undefined;
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
	UserForm: { id?: number; onSuccess?: () => void } | undefined;
	UserDetailScreen: { id: number; hasEditedUser: () => void };
	DleaderScreen: {
		id: number;
		gender: Gender;
		onSelect: (id: number, fullName: string) => void;
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
// Event Stack (nested stack for user-related screens)
// -----------------------------
export type EventStackParamList = {
	EventForm: { id?: number; onSuccess?: () => void } | undefined;
	EventList: undefined;
};

export type EventNavigationProp<
	T extends keyof EventStackParamList = keyof EventStackParamList,
> = NativeStackNavigationProp<EventStackParamList, T>;
export type EventRouteProp<T extends keyof EventStackParamList> = RouteProp<
	EventStackParamList,
	T
>;

// -----------------------------
// DGroup Stack (nested stack for user-related screens)
// -----------------------------
export type DgroupStackParamList = {
	DGroupForm: { id?: number; onSuccess?: () => void } | undefined;
	DGroupListScreen: undefined;
};

export type DgrouptNavigationProp<
	T extends keyof DgroupStackParamList = keyof DgroupStackParamList,
> = NativeStackNavigationProp<DgroupStackParamList, T>;
export type DgroupRouteProp<T extends keyof DgroupStackParamList> = RouteProp<
	DgroupStackParamList,
	T
>;

// -----------------------------
// Other Stack (nested stack for user-related screens)
// -----------------------------
export type OtherStackParamList = {
	MinistryPage: undefined;
	SchoolListScreen: undefined;
	SchoolDetailsScreen: {
		id: number;
		enrolledCount: number;
		graduatesCount: number;
	};
	SchoolFormScreen: { id?: number } | undefined;
};

export type OtherNavigationProp<
	T extends keyof OtherStackParamList = keyof OtherStackParamList,
> = NativeStackNavigationProp<OtherStackParamList, T>;
export type OtherRouteProp<T extends keyof OtherStackParamList> = RouteProp<
	OtherStackParamList,
	T
>;

// -----------------------------
// ReactNavigation Root
// -----------------------------
declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends RootStackParamList,
				AppStackParamList,
				AuthStackParamList,
				UserStackParamList,
				EventStackParamList,
				OtherStackParamList {}
	}
}
