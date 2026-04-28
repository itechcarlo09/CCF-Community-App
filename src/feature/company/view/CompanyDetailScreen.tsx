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
import Loading from "@component/Loading";
import { getAcronym } from "src/utils/stringUtils";

// 👉 Replace with your actual hooks
import { useCompanyForm } from "../hooks/useCompanyForm";
import { useCompanyViewModel } from "../viewModel/useCompanyViewModel";
import { EmployeeItemUI } from "../model/CompanyListUI";
import useDebounce from "@features/member/hooks/useDebounce";

type CompanyRouteProp = RouteProp<OtherStackParamList, "CompanyDetailsScreen">;
type NavProp = NativeStackNavigationProp<OtherStackParamList>;

export const CompanyDetailsScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<CompanyRouteProp>();
	const { id, employeesCount, formerEmployeesCount } = route.params || {};

	const { company, loading } = useCompanyForm({
		companyId: id ? id : NOID,
	});

	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState<"current" | "past">("current");

	const {
		activeEmployees,
		inactiveEmployees,
		activeLoading,
		inactiveLoading,
		fetchMoreActiveEmployees,
		fetchMoreInactiveEmployees,
		searchEmployees,
	} = useCompanyViewModel({
		companyId: id ? id : NOID,
		enableActiveEmployees:
			search.trim().length > 0
				? true
				: employeesCount > 0 && activeTab === "current",
		enableInactiveEmployees:
			search.trim().length > 0
				? true
				: formerEmployeesCount > 0 && activeTab === "past",
	});

	const data = activeTab === "current" ? activeEmployees : inactiveEmployees;
	const listLoading = activeTab === "current" ? activeLoading : inactiveLoading;
	const loadMore =
		activeTab === "current"
			? fetchMoreActiveEmployees
			: fetchMoreInactiveEmployees;

	const debouncedSearchTerm = useDebounce(search, 500);

	useEffect(() => {
		searchEmployees(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const renderListItem = (item: EmployeeItemUI) => (
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
				<View style={styles.companyInfo}>
					<View style={styles.logoPlaceholder}>
						<Text style={styles.logoPlaceholderText}>
							{getAcronym(
								company?.acronym ? company.acronym : undefined,
								company?.name,
							)}
						</Text>
					</View>

					<View style={styles.companyDetails}>
						<Text style={styles.companyName}>
							{company?.name}
							{company?.acronym ? ` (${company.acronym})` : ""}
						</Text>
						<Text style={styles.companyAddress}>{company?.address}</Text>
					</View>
				</View>

				<MdiIcon
					path={mdiPencil}
					size={22}
					onPress={() => navigation.navigate("CompanyFormScreen", { id })}
				/>
			</View>

			{/* Search */}
			<View style={styles.searchMainCard}>
				<MdiIcon path={mdiMagnify} size={20} color="#9CA3AF" />
				<TextInput
					style={styles.input}
					placeholder={`Search ${
						activeTab === "current" ? "Employees" : "Past Employees"
					}...`}
					placeholderTextColor="#9CA3AF"
					value={search}
					onChangeText={setSearch}
				/>
			</View>

			{/* Tabs */}
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "current" && styles.activeTab]}
					onPress={() => setActiveTab("current")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "current" && styles.activeTabText,
						]}
					>
						Employees ({search.trim() ? activeEmployees.length : employeesCount}
						)
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
						Former Employees (
						{search.trim() ? inactiveEmployees.length : formerEmployeesCount})
					</Text>
				</TouchableOpacity>
			</View>

			{/* List */}
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

export default CompanyDetailsScreen;

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},

	companyInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
	companyDetails: { marginLeft: 16, flex: 1 },

	logoPlaceholder: {
		width: 64,
		height: 64,
		borderRadius: 12,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
	},

	logoPlaceholderText: {
		fontSize: 24,
		color: "#fff",
		fontWeight: "bold",
	},

	companyName: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111827",
	},

	companyAddress: { color: "#555" },

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
