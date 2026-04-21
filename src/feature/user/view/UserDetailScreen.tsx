import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MdiIcon from "@component/MdiIcon";
import {
	mdiPencil,
	mdiPhoneOutline,
	mdiEmailOutline,
	mdiFacebook,
	mdiAccountOutline,
	mdiCalendarOutline,
	mdiGenderMaleFemale,
	mdiSchoolOutline,
	mdiBriefcaseOutline,
	mdiPlusCircleOutline,
	mdiAccountGroupOutline,
	mdiArrowUpBoldCircleOutline,
	mdiAccountSwitch,
	mdiAccountPlus,
	mdiAccountHeartOutline,
} from "@mdi/js";
import { useUserForm } from "../hooks/useUserForm";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserStackParamList } from "src/types/navigation";
import { mapUserToUI } from "../data/user.mapper";
import {
	formatDateRangeFromDate,
	formatFullDate,
} from "src/utils/dateFormatter";
import Loading from "@component/Loading";
import CircularImage from "@component/CircularImage";
import { EducationDTO, EmploymentDTO } from "../model/user";
import { showText } from "src/utils/errorUtils";

type UserRouteProp = RouteProp<UserStackParamList, "UserDetailScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

type WithEndDate = {
	endDate?: Date | null;
};

export const sortByEndDate = <T extends WithEndDate>(data: T[] = []): T[] => {
	return [...data].sort((a, b) => {
		const aEnd = a.endDate;
		const bEnd = b.endDate;

		// 1. Null/undefined first
		if (!aEnd && !bEnd) return 0;
		if (!aEnd) return -1;
		if (!bEnd) return 1;

		// 2. Sort descending (latest first)
		return new Date(bEnd).getTime() - new Date(aEnd).getTime();
	});
};

const UserDetailScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id, hasEditedUser } = route.params;

	// Load user & refresh
	const { isLoading, user, refreshUser, formik } = useUserForm({ userId: id });

	// Map user to UI
	const mappedUser = user ? mapUserToUI(user) : undefined;

	// Derive educations and employments directly
	const educations = user?.education
		? sortByEndDate<EducationDTO>(user.education)
		: [];
	const employments = user?.employment
		? sortByEndDate<EmploymentDTO>(user.employment)
		: [];

	const handleAssignDLeader = useCallback(() => {
		showText("DLeader assignment functionality not implemented.");
		// const gender = normalizeGender(user?.gender);
		// const safeId = Number(id) || NOID;
		// if (!gender) return;

		// navigation.navigate("DleaderScreen", {
		// 	id: safeId,
		// 	gender,
		// 	onSelect: async (selectedId: number) => {
		// 		formik.setFieldValue("dLeaderID", selectedId);
		// 		await formik.submitForm();
		// 		await refreshUser();
		// 	},
		// });
	}, [user?.gender, id, navigation, formik, refreshUser]);

	if (isLoading) return <Loading />;

	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<View style={styles.profileContainer}>
					<CircularImage
						uri={user?.profilePicture}
						size={48}
						fallbackText={mappedUser?.fallbackText}
					/>
					<View>
						<Text style={styles.title}>Account Details</Text>
						<Text style={styles.nameSmall}>{mappedUser?.fullName}</Text>
					</View>
				</View>
				<MdiIcon
					path={mdiPencil}
					size={22}
					onPress={() => {
						navigation.navigate("UserForm", {
							id,
							onSuccess: async () => {
								await refreshUser();
								hasEditedUser?.();
							},
						});
					}}
				/>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* PERSONAL INFO */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Personal Info</Text>
					<Text style={styles.name}>{mappedUser?.completeName}</Text>

					<View style={styles.row}>
						<MdiIcon path={mdiGenderMaleFemale} size={18} />
						<Text style={styles.text}>{user?.gender}</Text>
					</View>

					<View style={styles.row}>
						<MdiIcon path={mdiCalendarOutline} size={18} />
						<Text style={styles.text}>{formatFullDate(user?.birthDate)}</Text>
					</View>
				</View>

				{/* CONTACT */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Contact</Text>

					<View style={styles.row}>
						<MdiIcon path={mdiPhoneOutline} size={18} />
						<Text style={styles.text}>
							{user?.contactNumber ? `+63 ${user.contactNumber}` : "N/A"}
						</Text>
					</View>

					<View style={styles.row}>
						<MdiIcon path={mdiEmailOutline} size={18} />
						<Text style={styles.text}>{user?.email ?? "N/A"}</Text>
					</View>

					<View style={styles.row}>
						<MdiIcon path={mdiFacebook} size={18} />
						<Text style={styles.text}>{user?.facebookLink ?? "N/A"}</Text>
					</View>
				</View>

				{/* SPOUSE */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Spouse</Text>
						<MdiIcon path={mdiAccountHeartOutline} size={18} />
					</View>

					<View style={styles.listItem}>
						<MdiIcon path={mdiAccountOutline} size={18} />
						<View style={{ flex: 1 }}>
							<Text style={styles.textBold}>
								{mappedUser?.spouseName ?? "No spouse assigned"}
							</Text>
						</View>

						<MdiIcon
							path={mappedUser?.spouseName ? mdiAccountSwitch : mdiAccountPlus}
							size={18}
							onPress={() => {
								showText("Spouse assignment functionality not implemented.");
								// navigation.navigate("SpouseScreen", {
								// 	id: Number(id),
								// 	onSelect: async (selectedId: number) => {
								// 		formik.setFieldValue("spouseId", selectedId);
								// 		await formik.submitForm();
								// 		await refreshUser();
								// 	},
								// });
							}}
						/>
					</View>
				</View>

				{/* LEADER */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>DGroup Network</Text>
						<MdiIcon path={mdiAccountGroupOutline} size={18} />
					</View>
					<Text style={styles.subSectionTitle}>Leader</Text>

					<View style={styles.listItem}>
						<MdiIcon path={mdiArrowUpBoldCircleOutline} size={18} />
						<View style={{ flex: 1 }}>
							<Text style={styles.textBold}>
								{mappedUser?.dleaderName ?? "No leader assigned"}
							</Text>
						</View>
						<MdiIcon
							path={mappedUser?.dleaderName ? mdiAccountSwitch : mdiAccountPlus}
							size={18}
							onPress={handleAssignDLeader}
						/>
					</View>
				</View>

				{/* EMERGENCY */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Emergency</Text>

					<View style={styles.row}>
						<MdiIcon path={mdiAccountOutline} size={18} />
						<Text style={styles.text}>
							{user?.emergencyContactName ?? "N/A"}
						</Text>
					</View>

					<View style={styles.row}>
						<MdiIcon path={mdiPhoneOutline} size={18} />
						<Text style={styles.text}>
							{user?.emergencyContactNumber
								? `+63 ${user.emergencyContactNumber}`
								: "N/A"}
						</Text>
					</View>
				</View>

				{/* EDUCATION */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Education</Text>
						<MdiIcon
							path={mdiPlusCircleOutline}
							size={20}
							onPress={() =>
								navigation.navigate("EducationFormScreen", {
									accountId: id,
								})
							}
						/>
					</View>

					{educations.map((edu, index) => (
						<View key={index} style={styles.listItem}>
							<MdiIcon path={mdiSchoolOutline} size={18} />
							<View style={{ flex: 1 }}>
								<Text style={styles.textBold}>{edu.school.name}</Text>
								{edu.course && <Text style={styles.subText}>{edu.course}</Text>}
								<Text style={styles.yearText}>
									{formatDateRangeFromDate(edu.startDate, edu.endDate)}
								</Text>
							</View>
							<MdiIcon
								path={mdiPencil}
								size={18}
								onPress={() =>
									navigation.navigate("EducationFormScreen", {
										accountId: id,
										educationId: edu.id,
									})
								}
							/>
						</View>
					))}
				</View>

				{/* EMPLOYMENT */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Employment</Text>
						<MdiIcon
							path={mdiPlusCircleOutline}
							size={20}
							onPress={() =>
								navigation.navigate("EmploymentFormScreen", { accountId: id })
							}
						/>
					</View>

					{employments.map((job, index) => (
						<View key={index} style={styles.listItem}>
							<MdiIcon path={mdiBriefcaseOutline} size={18} />
							<View style={{ flex: 1 }}>
								<Text style={styles.textBold}>{job.position}</Text>
								<Text style={styles.subText}>{job.company.name}</Text>
								<Text style={styles.yearText}>
									{formatDateRangeFromDate(job.startDate, job.endDate)}
								</Text>
							</View>
							<MdiIcon
								path={mdiPencil}
								size={18}
								onPress={() =>
									navigation.navigate("EmploymentFormScreen", {
										accountId: id,
										employmentId: job.id,
									})
								}
							/>
						</View>
					))}
				</View>

				<View style={{ height: 30 }} />
			</ScrollView>
		</View>
	);
};

export default UserDetailScreen;

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
	actionText: { fontSize: 13, fontWeight: "600", color: "#2563EB" },
	emptyLeaderContainer: { paddingVertical: 8 },
	emptyText: { fontSize: 13, color: "#9CA3AF", marginBottom: 6 },
	assignBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
	assignText: { fontSize: 13, fontWeight: "600", color: "#2563EB" },
	profileContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
	yearText: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
	subSectionTitle: {
		fontSize: 13,
		fontWeight: "600",
		color: "#6B7280",
		marginTop: 6,
		marginBottom: 4,
	},
	membersHeader: { marginTop: 10 },
	nameSmall: { fontSize: 13, color: "#6B7280" },
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	title: { fontSize: 20, fontWeight: "700", color: "#111827" },
	iconBtn: { padding: 6, borderRadius: 20, backgroundColor: "#E5E7EB" },
	section: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		padding: 14,
		marginBottom: 12,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: "#6B7280",
		marginBottom: 6,
	},
	name: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 6 },
	row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
	text: { fontSize: 14, color: "#374151" },
	textBold: { fontSize: 14, fontWeight: "600", color: "#111827" },
	subText: { fontSize: 12, color: "#6B7280" },
	listItem: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 10,
		alignItems: "center",
	},
	addBtn: { padding: 4 },
});
