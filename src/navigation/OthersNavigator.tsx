import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MinistryPage } from "src/features/ministry/view/MinistryPage";
import CreateMinistryScreen from "src/features/ministry/view/MinistryFormScreem";
import { SchoolListScreen } from "src/features/schools/view/SchoolListScreen";
import { CompanyListScreen } from "src/features/company/view/CompanyListScreen";
import { SeriesListScreen } from "src/features/series/view/SeriesListScreen";
import { SpeakerListScreen } from "src/features/speaker/view/SpeakerListScreen";
import SchoolFormScreen from "src/features/schools/view/SchoolFormScreen";
import SchoolDetailsScreen from "src/features/schools/view/SchoolDetailScreen";
import CompanyFormScreen from "src/features/company/view/CompanyFormScreen";
import CompanyDetailsScreen from "src/features/company/view/CompanyDetailScreen";

const Stack = createNativeStackNavigator();

export default function OthersNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MinistryPage" component={MinistryPage} />
			<Stack.Screen
				name="CreateMinistryScreen"
				component={CreateMinistryScreen}
			/>
			<Stack.Screen name="SchoolListScreen" component={SchoolListScreen} />
			<Stack.Screen
				name="SchoolDetailsScreen"
				component={SchoolDetailsScreen}
			/>
			<Stack.Screen name="SchoolFormScreen" component={SchoolFormScreen} />
			<Stack.Screen name="CompanyListScreen" component={CompanyListScreen} />
			<Stack.Screen
				name="CompanyDetailsScreen"
				component={CompanyDetailsScreen}
			/>
			<Stack.Screen name="CompanyFormScreen" component={CompanyFormScreen} />
			<Stack.Screen name="SeriesListScreen" component={SeriesListScreen} />
			<Stack.Screen name="SpeakerListScreen" component={SpeakerListScreen} />
		</Stack.Navigator>
	);
}
