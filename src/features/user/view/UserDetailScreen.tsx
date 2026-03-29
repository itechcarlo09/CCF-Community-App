import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import MdiIcon from "@components/MdiIcon";
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
} from "@mdi/js";
import { useUserForm } from "../hooks/useUserForm";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserStackParamList } from "src/types/navigation";
import { RecordItemUI } from "../model/RecordListItem";
import { mapUserToUI } from "../data/user.mapper";
import {
	formatDateRangeFromDate,
	formatFullDate,
} from "src/utils/dateFormatter";
import Loading from "@components/Loading";
import CircularImage from "@components/CircularImage";
import { EducationDTO, EmploymentDTO } from "../model/user";
import { NOID } from "src/types/globalTypes";
import { normalizeGender } from "src/utils/stringUtils";

type UserRouteProp = RouteProp<UserStackParamList, "UserDetailScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

type WithEndDate = {
	endDate?: string | null;
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
	const { loading, user, refreshUser, formik } = useUserForm({ userId: id });
	const [mappedUser, setMappedUser] = useState<RecordItemUI>();
	const [mappedDMembers, setMappedDMembers] = useState<RecordItemUI[]>();
	const hasMember = user && user.dGroupMembers && user.dGroupMembers.length > 0;
	const educations =
		user && user.education && user.education.length > 0
			? sortByEndDate(user.education)
			: [];
	const employments =
		user && user.employment && user.employment.length > 0
			? sortByEndDate(user.employment)
			: [];

	useEffect(() => {
		user ? setMappedUser(mapUserToUI(user)) : null;
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

	const handleAssignDLeader = useCallback(() => {
		const gender = normalizeGender(user?.gender);
		const parsedId = Number(id);
		const safeId = !isNaN(parsedId) ? parsedId : NOID;

		if (!gender) return; // optionally show Toast

		navigation.navigate("DleaderScreen", {
			id: safeId,
			gender,
			onSelect: (selectedId: number) => {
				formik.setFieldValue("dLeaderID", selectedId);
				formik.submitForm().then(() => {
					refreshUser();
				});
			},
		});
	}, [user?.gender, id, navigation, formik]);

	if (loading) {
		return <Loading />;
	}

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

				<TouchableOpacity
					style={styles.iconBtn}
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
				>
					<MdiIcon path={mdiPencil} size={22} />
				</TouchableOpacity>
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
						<Text style={styles.text}>{user ? user.email : ""}</Text>
					</View>

					<View style={styles.row}>
						<MdiIcon path={mdiFacebook} size={18} />
						<Text style={styles.text}>
							{user?.facebookLink ? user?.facebookLink : "N/A"}
						</Text>
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
						<TouchableOpacity onPress={handleAssignDLeader}>
							<Text style={styles.actionText}>
								{mappedUser?.dleaderName ? "Change" : "Assign"}
							</Text>
						</TouchableOpacity>
					</View>
					{/* // TODO: Implement Members Lazy Load */}
					{/* MEMBERS */}
					{/* <View style={styles.membersHeader}>
						<Text style={styles.subSectionTitle}>
							Members ({dMembers.length})
						</Text>
					</View>

					{dMembers.map((member) => (
						<View key={member.id} style={styles.listItem}>
							<MdiIcon path={mdiAccountCircleOutline} size={18} />
							<Text style={styles.text}>{member.name}</Text>
						</View>
					))} */}
				</View>

				{/* EMERGENCY */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Emergency</Text>

					<View style={styles.row}>
						<MdiIcon path={mdiAccountOutline} size={18} />
						<Text style={styles.text}>
							{user?.emergencyContactName ? user.emergencyContactName : "N/A"}
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

						<TouchableOpacity style={styles.addBtn}>
							<MdiIcon path={mdiPlusCircleOutline} size={20} />
						</TouchableOpacity>
					</View>

					{educations.map((edu, index) => (
						<View key={index} style={styles.listItem}>
							<MdiIcon path={mdiSchoolOutline} size={18} />

							<View style={{ flex: 1 }}>
								<Text style={styles.textBold}>{edu.course}</Text>
								<Text style={styles.subText}>{edu.school.name}</Text>

								<Text style={styles.yearText}>
									{formatDateRangeFromDate(edu.startDate, edu.endDate)}
								</Text>
							</View>
						</View>
					))}
				</View>

				{/* EMPLOYMENT */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Employment</Text>

						<TouchableOpacity style={styles.addBtn}>
							<MdiIcon path={mdiPlusCircleOutline} size={20} />
						</TouchableOpacity>
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
	actionText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#2563EB",
	},
	emptyLeaderContainer: {
		paddingVertical: 8,
	},

	emptyText: {
		fontSize: 13,
		color: "#9CA3AF",
		marginBottom: 6,
	},

	assignBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},

	assignText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#2563EB",
	},

	profileContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},

	yearText: {
		fontSize: 12,
		color: "#9CA3AF",
		marginTop: 2,
	},

	subSectionTitle: {
		fontSize: 13,
		fontWeight: "600",
		color: "#6B7280",
		marginTop: 6,
		marginBottom: 4,
	},

	membersHeader: {
		marginTop: 10,
	},

	nameSmall: {
		fontSize: 13,
		color: "#6B7280",
	},

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

	title: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111827",
	},

	iconBtn: {
		padding: 6,
		borderRadius: 20,
		backgroundColor: "#E5E7EB",
	},

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

	name: {
		fontSize: 18,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 6,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 6,
	},

	text: {
		fontSize: 14,
		color: "#374151",
	},

	textBold: {
		fontSize: 14,
		fontWeight: "600",
		color: "#111827",
	},

	subText: {
		fontSize: 12,
		color: "#6B7280",
	},

	listItem: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 10,
	},

	addBtn: {
		padding: 4,
	},
});
