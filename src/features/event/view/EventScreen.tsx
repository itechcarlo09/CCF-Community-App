import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import { useEventViewModel } from "../viewModel/useEventViewModel";
import { useTheme } from "../../../theme/ThemeProvider";
import EventListItem from "./EventListItem";
import useDebounce from "../../user/hooks/useDebounce";

const Separator = () => <View style={styles.separator} />;

const EventScreen = () => {
	const { events, refresh, loading, searchEvents } = useEventViewModel();
	const [refreshing, setRefreshing] = useState(false);
	const { theme } = useTheme();
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);

	useEffect(() => {
		searchEvents(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		refresh();
		setRefreshing(false);
	}, []);

	if (loading) {
		return <ActivityIndicator size="large" style={styles.loader} />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={events}
				ItemSeparatorComponent={Separator}
				refreshControl={Refresh()}
				renderItem={({ item }) => (
					<EventListItem event={item} onPress={() => {}} />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold", color: "#fff" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	card: {
		elevation: 6,
		padding: 16,
		marginVertical: 8,
		backgroundColor: "#c00b0bff",
		borderRadius: 8,
	},
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 14, color: "gray" },
	separator: {
		height: 12,
	},
});

export default EventScreen;
