import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { UserStackParamList } from "../../../types/navigation";
import { useUserForm } from "../hooks/useUserForm";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Loading from "../../../components/Loading";

type UserRouteProp = RouteProp<UserStackParamList, "UserDetailsScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const UserDetailsScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id } = route.params;
	const { loading, user } = useUserForm({ userId: id });
	useEffect(() => {
		// Initial logic here (fetch, init, etc.)
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				keyboardShouldPersistTaps="handled"
			>
				<Text style={styles.title}>Screen Title</Text>

				<View style={styles.section}>
					<Text style={styles.text}>Your content goes here.</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	contentContainer: {
		padding: 16,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 16,
	},
	section: {
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
	},
});
