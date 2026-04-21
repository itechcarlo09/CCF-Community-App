import MdiIcon from "@component/MdiIcon";
import { useTheme } from "@theme/ThemeProvider";
import React from "react";
import {
	View,
	StyleSheet,
	Text,
	SectionList,
	TouchableOpacity,
} from "react-native";
import { OTHERS_SECTIONS } from "src/types/enums/OtherSection";

const OtherScreen = ({ navigation }: any) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<SectionList
				sections={OTHERS_SECTIONS}
				keyExtractor={(item) => item.key}
				renderItem={() => null}
				renderSectionHeader={({ section }) => (
					<View style={{ rowGap: 8, marginTop: 16 }} key={section.title}>
						<Text style={[styles.title, { color: theme.text }]}>
							{section.title}
						</Text>

						<View style={{ flexDirection: "row", gap: 12 }}>
							{section.data.map((item) => (
								<TouchableOpacity
									style={styles.itemContainer}
									onPress={() =>
										navigation.navigate("OthersNavigator", {
											screen: item.screen,
										})
									}
									key={item.key}
								>
									<View style={styles.iconContainer}>
										<MdiIcon
											path={item.icon ?? ""}
											size={20}
											color={"#323232"}
										/>
									</View>

									<View style={styles.textContainer}>
										<Text style={styles.title}>{item.label}</Text>
										<Text style={styles.description}>{item.description}</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default OtherScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
		marginVertical: 12,
	},
	// SECTION
	sectionContainer: {
		marginBottom: 24,
	},
	sectionHeader: {
		fontSize: 14,
		fontWeight: "600",
		color: "#6B7280",
		marginBottom: 12,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	// ROW
	row: {
		flexDirection: "row",
		flexWrap: "wrap", // allows 2 per row or more
		gap: 12,
	},

	// ITEM
	itemContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		padding: 14,
		borderRadius: 12,
		backgroundColor: "#FFFFFF",

		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
	},

	// ICON
	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: 10,
		backgroundColor: "#F3F4F6",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},

	// TEXT
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 2,
	},
	description: {
		fontSize: 12,
		color: "#6B7280",
	},
});
