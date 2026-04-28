import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import MdiIcon from "@component/MdiIcon";
import { mdiPencil, mdiAccountOutline, mdiMagnify } from "@mdi/js";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OtherStackParamList } from "src/types/navigation";
import { NOID } from "src/types/globalTypes";
import { useSchoolForm } from "../hooks/useSchoolForm";
import Loading from "@component/Loading";
import { getAcronym } from "src/utils/stringUtils";
import { useSchoolViewModel } from "../viewModel/useSchoolViewModel";
import { StudentItemUI } from "../model/SchoolListItem";
import useDebounce from "@features/member/hooks/useDebounce";

type SchoolRouteProp = RouteProp<OtherStackParamList, "SchoolDetailsScreen">;
type NavProp = NativeStackNavigationProp<OtherStackParamList>;

export const SchoolDetailsScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<SchoolRouteProp>();
	const { id, enrolledCount, graduatesCount } = route.params || {};
	const { school, loading } = useSchoolForm({
		schoolId: id ? id : NOID,
	});
	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState<"enrolled" | "past">("enrolled");
	const {
		enrolled,
		graduates,
		enrolledLoading,
		graduatesLoading,
		fetchMoreEnrolled,
		fetchMoreGraduates,
		searchSchools,
	} = useSchoolViewModel({
		schoolId: id ? id : NOID,
		enableEnrolled:
			search.trim().length > 0
				? true
				: enrolledCount > 0 && activeTab === "enrolled",
		enableGraduates:
			search.trim().length > 0
				? true
				: graduatesCount > 0 && activeTab === "past",
	});

	const data = activeTab === "enrolled" ? enrolled : graduates;
	const listLoading =
		activeTab === "enrolled" ? enrolledLoading : graduatesLoading;
	const loadMore =
		activeTab === "enrolled" ? fetchMoreEnrolled : fetchMoreGraduates;

	const debouncedSearchTerm = useDebounce(search, 500);
	useEffect(() => {
		searchSchools(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const renderListItem = (item: StudentItemUI) => (
		<View style={styles.listItem}>
			<MdiIcon path={mdiAccountOutline} size={18} style={{ marginRight: 8 }} />
			<Text style={styles.listItemText}>{item.fullName}</Text>
		</View>
	);

	if (loading) return <Loading />;

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.schoolInfo}>
					<View style={styles.logoPlaceholder}>
						<Text style={styles.logoPlaceholderText}>
							{getAcronym(
								school?.acronym ? school.acronym : undefined,
								school?.name,
							)}
						</Text>
					</View>
					<View style={styles.schoolDetails}>
						<Text style={styles.schoolName}>
							{school?.name}
							{school?.acronym ? `(${school.acronym})` : ""}
						</Text>
						<Text style={styles.schoolAddress}>{school?.address}</Text>
					</View>
				</View>
				<MdiIcon
					path={mdiPencil}
					size={22}
					onPress={() => navigation.navigate("SchoolFormScreen", { id })}
				/>
			</View>

			{/* Search */}
			<View style={styles.searchMainCard}>
				<MdiIcon path={mdiMagnify} size={20} color="#9CA3AF" />
				<TextInput
					style={styles.input}
					placeholder={`Search ${
						activeTab === "enrolled" ? "Enrolled" : "Graduated"
					}...`}
					placeholderTextColor="#9CA3AF"
					value={search}
					onChangeText={setSearch}
				/>
			</View>

			{/* Tabs */}
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "enrolled" && styles.activeTab]}
					onPress={() => setActiveTab("enrolled")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "enrolled" && styles.activeTabText,
						]}
					>
						Enrolled ({search.trim() ? enrolled.length : enrolledCount})
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.tab, activeTab === "past" && styles.activeTab]}
					onPress={() => setActiveTab("past")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "past" && styles.activeTabText,
						]}
					>
						Graduated/Been ({search.trim() ? graduates.length : graduatesCount})
					</Text>
				</TouchableOpacity>
			</View>

			{listLoading ? (
				<ActivityIndicator style={{ marginVertical: 16 }} size="large" />
			) : (
				<FlatList
					data={data}
					keyExtractor={(item) => item.id.toString()}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
					renderItem={({ item }) => renderListItem(item)}
					ListEmptyComponent={
						loading ? <ActivityIndicator /> : <Text>No records</Text>
					}
				/>
			)}
			<View style={{ height: 30 }} />
		</View>
	);
};

export default SchoolDetailsScreen;

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	schoolInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
	schoolDetails: { marginLeft: 16, flex: 1 },
	logo: { width: 64, height: 64, borderRadius: 32 },
	logoPlaceholder: {
		width: 64,
		height: 64,
		borderRadius: 12,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
	},
	logoPlaceholderText: { fontSize: 24, color: "#fff", fontWeight: "bold" },
	schoolName: { fontSize: 20, fontWeight: "700", color: "#111827" },
	schoolAddress: { color: "#555" },
	tabContainer: { flexDirection: "row", marginBottom: 12 },
	tab: {
		flex: 1,
		paddingVertical: 8,
		alignItems: "center",
		borderBottomWidth: 2,
		borderBottomColor: "transparent",
	},
	activeTab: { borderBottomColor: "#2563EB" },
	tabText: { fontSize: 14, color: "#6B7280" },
	activeTabText: { color: "#2563EB", fontWeight: "700" },
	listItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 12,
		marginBottom: 8,
		borderRadius: 12,
	},
	listItemText: { fontSize: 14, color: "#111827" },
	searchMainCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 12,
		marginBottom: 12,
		height: 48,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},

	input: {
		flex: 1,
		marginLeft: 8,
		fontSize: 14,
		color: "#111827",
	},
});
