import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, RefreshControl } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import UserListItem from "./UserListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";
import Loading from "../../../components/Loading";
import { SearchField } from "../../../components/SearchField";
import useDebounce from "../hooks/useDebounce";
import { UserStackParamList } from "../../../types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RecordItemUI } from "../model/RecordListItem";

type UserRouteProp = RouteProp<UserStackParamList, "DleaderScreen">;

const Separator = () => <View style={styles.separator} />;

const DleaderScreen = ({ navigation }: any) => {
	const { getDLeaders, loading } = useUserViewModel();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const route = useRoute<UserRouteProp>();
	const { id, onSelect } =
		(route.params as {
			id: string;
			onSelect: (id: string, fullName: string) => void;
		}) || {};
	const [Dleaders, setDLeaders] = useState<RecordItemUI[]>([]);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	const [refreshing, setRefreshing] = useState(false);
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setDLeaders(await getDLeaders(id));
		setRefreshing(false);
	}, []);

	useEffect(() => {
		getDLeaders(id).then(setDLeaders);
	}, []);

	const handleSelect = (id: string, fullName: string) => {
		onSelect(id, fullName);
		navigation.goBack();
	};

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<Text
				style={{
					marginHorizontal: 16,
					color: theme.text,
					fontWeight: "semibold",
					fontSize: 20,
					lineHeight: 32,
					marginBottom: 5,
				}}
			>
				Discipleship Leaders
			</Text>
			<SearchField
				style={{ marginHorizontal: 16, marginBottom: 10 }}
				onChangeText={(value) => setSearch(value)}
				value={search}
				onCancel={() => setSearch("")}
			/>

			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={Dleaders}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<UserListItem
							user={item}
							onPress={() => handleSelect(item.id.toString(), item.fullName)}
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
});
export default DleaderScreen;
