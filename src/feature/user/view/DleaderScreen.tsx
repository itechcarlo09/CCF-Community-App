import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, RefreshControl } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import UserListItem from "./UserListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";
import Loading from "../../../component/Loading";
import { SearchField } from "../../../component/SearchField";
import useDebounce from "../hooks/useDebounce";
import { UserStackParamList } from "../../../types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RecordItemUI } from "../model/RecordListItem";
import MdiIcon from "../../../component/MdiIcon";
import { mdiArrowLeft } from "@mdi/js";
import Gender from "../../../types/enums/Gender";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type UserRouteProp = RouteProp<UserStackParamList, "DleaderScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;
const Separator = () => <View style={styles.separator} />;
const defaultId = 0;

const DleaderScreen = ({ navigation }: any) => {
	const { getDLeaders, loading } = useUserViewModel();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const route = useRoute<UserRouteProp>();
	const { id, gender, onSelect } = route.params;
	const [Dleaders, setDLeaders] = useState<RecordItemUI[]>([]);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	const [refreshing, setRefreshing] = useState(false);
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setDLeaders(await getDLeaders(id ?? defaultId, gender));
		setRefreshing(false);
	}, []);

	useEffect(() => {
		getDLeaders(id ?? defaultId, gender).then(setDLeaders);
	}, [debouncedSearchTerm]);

	const handleSelect = (id: number, fullName: string) => {
		onSelect(id, fullName);
		navigation.goBack();
	};

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.headerRow}>
				<Text style={[styles.title, { color: theme.text }]}>
					Select Discipleship Leaders
				</Text>
				<MdiIcon
					path={mdiArrowLeft}
					size={24}
					color="#323232"
					onPress={navigation.goBack}
				/>
				<View style={styles.placeholder} />
			</View>
			<View style={styles.sortContainer}>
				<View
					style={[styles.sortBox, { backgroundColor: theme.gray[200] }]}
				></View>
				<SearchField
					onChangeText={(value) => setSearch(value)}
					value={search}
					onCancel={() => setSearch("")}
				/>
			</View>

			{/* Important: zIndex must be lower than the dropdown */}
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={Dleaders}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<UserListItem
							user={item}
							onPress={() => handleSelect(item.id, item.fullName)}
						/>
					)}
					refreshControl={Refresh()}
					ListHeaderComponent={<View style={{ height: 6 }} />}
					ListFooterComponent={<View style={{ height: 16 }} />}
					ItemSeparatorComponent={Separator}
					contentContainerStyle={{ zIndex: 0 }}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sortContainer: {
		marginBottom: 10,
		marginHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	sortBox: {
		height: 40,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	sortText: {
		fontWeight: "600",
		fontSize: 12,
		lineHeight: 16,
		marginRight: 8,
		textAlign: "center",
		width: 76,
	},
	dropdown: {
		minHeight: 40,
		borderRadius: 6,
		borderStartStartRadius: 0,
		borderStartEndRadius: 0,
	},
	addButton: {
		height: 42,
		width: 42,
		justifyContent: "center",
		marginLeft: 10,
	},
	separator: {
		height: 6,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
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
	placeholder: {
		width: 24,
	},
});
export default DleaderScreen;
