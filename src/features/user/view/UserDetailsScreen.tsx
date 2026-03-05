import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
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
import CircularImage from "../../../components/CircularImage";
import { RecordItemUI } from "../model/RecordListItem";
import { mapUserToUI } from "../data/user.mapper";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import { ICONSIZE } from "../../../types/globalTypes";

type UserRouteProp = RouteProp<UserStackParamList, "UserDetailsScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const UserDetailsScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { theme } = useTheme();
	const { id } = route.params;
	const { loading, user } = useUserForm({ userId: id });
	const [mappedUser, setMappedUser] = useState<RecordItemUI>();
	useEffect(() => {
		// Initial logic here (fetch, init, etc.)
	}, []);

	useEffect(() => {
		user ? setMappedUser(mapUserToUI(user)) : null;
	}, [user]);

	if (loading) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerRow}>
				<Text style={[styles.title, { color: theme.text }]}>User Details</Text>
				<MdiIcon
					path={mdiArrowLeft}
					size={ICONSIZE}
					color="#323232"
					onPress={navigation.goBack}
				/>
				<View style={{ width: ICONSIZE }} />
			</View>
		</SafeAreaView>
	);
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		rowGap: 17,
		paddingVertical: 12,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		position: "absolute",
		left: 0,
		right: 0,
		textAlign: "center",
		fontSize: 20,
		lineHeight: 32,
		fontWeight: 600,
	},
});
