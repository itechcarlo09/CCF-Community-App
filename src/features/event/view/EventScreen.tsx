import React, { useCallback, useState } from "react";
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

const Separator = () => <View style={styles.separator} />;

const EventScreen = () => {
	const { events, refresh, loading } = useEventViewModel();
	const [refreshing, setRefreshing] = useState(false);
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);

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
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={Separator}
				refreshControl={Refresh()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.card}
						onPress={() => console.log(item.id)}
					>
						<Text style={styles.text}>🎉 Are you ready for {item.name}!</Text>
					</TouchableOpacity>
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
		height: 1,
		marginHorizontal: 16,
	},
});

export default EventScreen;
