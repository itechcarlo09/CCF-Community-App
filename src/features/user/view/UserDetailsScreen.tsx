import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { UserStackParamList } from "../../../types/navigation";
import { useUserForm } from "../hooks/useUserForm";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Loading from "../../../components/Loading";
import { RecordItemUI } from "../model/RecordListItem";
import { mapUserToUI } from "../data/user.mapper";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft, mdiStar } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import { ICONSIZE } from "../../../types/globalTypes";
import { SlidingTabs } from "../../../components/SlidingTabs";
import ProfileHeader from "./components/ProfileHeader";
import BasicInformationRO from "./components/BasicInformationRO";
import { ageNow, formatFullDate } from "../../../utils/dateFormatter";
import ContactInformation from "./components/ContactInformationRO";
import Educations from "./components/EducationRO";
import dayjs from "dayjs";
import Works from "./components/WorkRO";
import UserListItem from "./UserListItem";

type UserRouteProp = RouteProp<UserStackParamList, "UserDetailsScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;
const TABS_SELECTIONS = ["Profile", "Dgroup Network"];

const UserDetailsScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { theme } = useTheme();
	const { id, hasEditedUser } = route.params;
	const { loading, user, refreshUser } = useUserForm({ userId: id });
	const [mappedDLeader, setMappedDLeader] = useState<RecordItemUI>();
	const [mappedUser, setMappedUser] = useState<RecordItemUI>();
	const [mappedDMembers, setMappedDMembers] = useState<RecordItemUI[]>();
	const [tab, setTab] = useState<number>(0);
	const hasMember = user && user.dGroupMembers && user.dGroupMembers.length > 0;
	useEffect(() => {
		// Initial logic here (fetch, init, etc.)
	}, []);

	useEffect(() => {
		user ? setMappedUser(mapUserToUI(user)) : null;
		user &&
			user.dGroupLeader &&
			setMappedDLeader({
				...mapUserToUI({
					id: user.dGroupLeaderId ? user.dGroupLeaderId : 0,
					firstName: user.dGroupLeader.firstName,
					lastName: user.dGroupLeader.lastName,
					middleName: user.dGroupLeader.middleName,
				}),
				membershipType: "DLeader",
			});
		hasMember &&
			setMappedDMembers(
				user.dGroupMembers?.map((e) => {
					return {
						...mapUserToUI({
							id: e.id,
							firstName: e.firstName,
							lastName: e.lastName,
							middleName: e.middleName,
						}),
						membershipType: "DMember",
					};
				}),
			);
	}, [user]);

	const goToUserDetails = (id: number) => {
		navigation.push("UserDetailsScreen", {
			id,
			hasEditedUser: () => {
				if (hasEditedUser) {
					hasEditedUser();
				}
				refreshUser();
			},
		});
	};

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

			{tab == 0 ? (
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
								age={user ? ageNow(user.birthDate) : ""}
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
							<Educations
								educations={
									user?.education?.length
										? user.education.map((e) => ({
												school: e.school.name,
												degree: e.course,
												startYear: dayjs(e.startYear).year().toString(),
												endYear: dayjs(e.endYear).year().toString(),
										  }))
										: []
								}
							/>
							<Works
								works={
									user?.employment?.length
										? user.employment.map((e) => ({
												position: e.position,
												company: e.company.name,
												startYear: dayjs(e.startYear).year().toString(),
												endYear: dayjs(e.endYear).year().toString(),
										  }))
										: []
								}
							/>
						</View>
					</View>
				</ScrollView>
			) : (
				<ScrollView>
					<View style={{ rowGap: 8 }}>
						{mappedDLeader && (
							<View style={styles.dgroupAlignment}>
								<View style={{ alignItems: "center" }}>
									<View
										style={[
											styles.circleIdentifier,
											{ backgroundColor: theme.gray[300] },
										]}
									/>
									<View
										style={[styles.line, { backgroundColor: theme.gray[300] }]}
									/>
								</View>
								<View style={{ rowGap: 13, flex: 1 }}>
									<Text
										style={[styles.dgroupTitleText, { color: theme.gray[500] }]}
									>
										DGroup Upline
									</Text>
									{mappedDLeader && (
										<UserListItem
											user={mappedDLeader}
											isForNetwork
											style={{ marginHorizontal: 0 }}
											onPress={goToUserDetails}
										/>
									)}
								</View>
							</View>
						)}
						{mappedUser && (
							<View style={styles.dgroupAlignment}>
								<View style={{ alignItems: "center", alignSelf: "flex-start" }}>
									<View
										style={[
											styles.circleIdentifier,
											{
												backgroundColor: theme.gray[300],
											},
										]}
									>
										<MdiIcon path={mdiStar} size={18} color={theme.white} />
									</View>
									{hasMember && (
										<View
											style={[
												styles.line,
												{ backgroundColor: theme.gray[300] },
											]}
										/>
									)}
								</View>
								<View style={{ rowGap: 13, flex: 1 }}>
									<Text
										style={[styles.dgroupTitleText, { color: theme.gray[500] }]}
									>
										Me
									</Text>
									<UserListItem
										user={mappedUser}
										isForNetwork
										isCurrent
										style={{ marginHorizontal: 0 }}
									/>
								</View>
							</View>
						)}
						{hasMember && (
							<View style={styles.dgroupAlignment}>
								<View style={{ alignItems: "center", alignSelf: "flex-start" }}>
									<View
										style={[
											styles.circleIdentifier,
											{ backgroundColor: theme.gray[300] },
										]}
									/>
								</View>
								<View style={{ rowGap: 13, flex: 1 }}>
									<Text
										style={[styles.dgroupTitleText, { color: theme.gray[500] }]}
									>
										{`DGroup Downline (${user?.dGroupMembers?.length})`}
									</Text>
									{mappedDMembers?.map((mappedUser) => (
										<UserListItem
											key={mappedUser.id}
											user={mappedUser}
											isForNetwork
											style={{ marginHorizontal: 0 }}
											onPress={goToUserDetails}
										/>
									))}
								</View>
							</View>
						)}
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
	dgroupAlignment: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 8,
	},
	dgroupTitleText: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 600,
	},
	circleIdentifier: {
		height: 23,
		width: 23,
		borderRadius: 23 / 2,
		justifyContent: "center",
	},
	line: {
		marginTop: 4,
		flex: 1,
		width: 1,
	},
});
