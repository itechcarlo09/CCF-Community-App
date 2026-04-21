import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ShimmerSkeleton } from "../../../../../component/ShimmerSkeleton";
import { useTheme } from "../../../../../theme/ThemeProvider";

const UserLoaderItem = () => {
	const { theme } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.background }]}>
			<View style={{ flexDirection: "row", columnGap: 12 }}>
				<ShimmerSkeleton
					style={{
						height: 45,
						width: 45,
						borderRadius: 45 / 2,
					}}
				/>
				<View style={{ rowGap: 2 }}>
					<ShimmerSkeleton
						style={{ height: 20, width: 120, borderRadius: 8 }}
					/>
					<ShimmerSkeleton style={{ height: 20, width: 80, borderRadius: 8 }} />
				</View>
			</View>

			<View style={{ rowGap: 8 }}>
				<ShimmerSkeleton
					style={{
						height: 16,
						width: 80,
						borderRadius: 4.5,
						alignSelf: "flex-end",
					}}
				/>
				<View style={{ rowGap: 2 }}>
					<ShimmerSkeleton
						style={{ height: 16, width: 100, borderRadius: 4.5 }}
					/>
					<ShimmerSkeleton
						style={{ height: 16, width: 100, borderRadius: 4.5 }}
					/>
				</View>
			</View>
		</View>
	);
};

const UserLoader = () => {
	return (
		<FlatList
			data={Array.from({ length: 10 })}
			keyExtractor={(_, index) => index.toString()}
			renderItem={() => <UserLoaderItem />}
			contentContainerStyle={{ paddingVertical: 8 }}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default UserLoader;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 16,
		marginBottom: 12,
		borderRadius: 8,
	},
});
