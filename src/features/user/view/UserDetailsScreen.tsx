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
import { SlidingTabs } from "../../../components/SlidingTabs";
import ProfileHeader from "./components/ProfileHeader";
import BasicInformationRO from "./components/BasicInformationRO";
import { formatFullDate } from "../../../utils/dateFormatter";
import ContactInformation from "./components/ContactInformationRO";

type UserRouteProp = RouteProp<UserStackParamList, "UserDetailsScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;
const TABS_SELECTIONS = ["Profile", "Dgroup Network"];

const UserDetailsScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { theme } = useTheme();
	const { id, hasEditedUser } = route.params;
	const { loading, user, refreshUser } = useUserForm({ userId: id });
	const [mappedUser, setMappedUser] = useState<RecordItemUI>();
	const [tab, setTab] = useState<number>(0);
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

			<SlidingTabs
				tabs={TABS_SELECTIONS}
				onChange={(index) => {
					setTab(index);
				}}
			/>

			{tab == 0 && (
				<ScrollView
					contentContainerStyle={[
						styles.body,
						{ backgroundColor: theme.background, borderColor: theme.border },
					]}
				>
					<View style={{ rowGap: 24 }}>
						<ProfileHeader
							name={mappedUser ? mappedUser.fullName : ""}
							ministry={mappedUser ? mappedUser.ministryText : ""}
							uri={""}
							fallbackText={mappedUser ? mappedUser?.fallbackText : ""}
						/>
						<View style={{ rowGap: 28 }}>
							<BasicInformationRO
								firstName={user ? user.firstName : ""}
								middleName={user?.middleName}
								lastName={user ? user.lastName : ""}
								birthDay={user ? formatFullDate(user.birthDate) : ""}
								gender={user ? user?.gender : ""}
								dLeaderFullName={mappedUser?.dleaderName}
								onPress={() => {
									navigation.navigate("UserForm", {
										id,
										onSuccess: () => {
											if (hasEditedUser) {
												hasEditedUser();
											}
											refreshUser();
										},
									});
								}}
							/>
							<ContactInformation
								email={user ? user.email : ""}
								facebookLink={user?.facebookLink}
								emergencyName={user?.emergencyContactName}
								emergencyContact={user?.emergencyContactNumber}
							/>
						</View>
					</View>
				</ScrollView>
			)}
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
	body: {
		flexGrow: 1,
		borderWidth: 1,
		borderRadius: 8,
		padding: 24,
	},
});
