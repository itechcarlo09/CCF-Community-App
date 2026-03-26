import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MdiIcon from "@components/MdiIcon";
import { mdiArrowLeft, mdiPlus } from "@mdi/js";

interface Props {
	title: string;
	onBack: () => void;
	onAdd?: () => void;
}

const MinistryPageHeader: React.FC<Props> = ({ title, onBack, onAdd }) => {
	return (
		<View style={styles.container}>
			{/* Left: Back Button */}
			<TouchableOpacity style={styles.sideButton} onPress={onBack}>
				<MdiIcon path={mdiArrowLeft} size={24} color="#111827" />
			</TouchableOpacity>

			{/* Center: Title */}
			<View style={styles.center}>
				<Text numberOfLines={1} style={styles.title}>
					{title}
				</Text>
			</View>

			{/* Right: Add Button */}
			<TouchableOpacity style={styles.sideButton} onPress={onAdd}>
				{onAdd && <MdiIcon path={mdiPlus} size={24} color="#4f46e5" />}
			</TouchableOpacity>
		</View>
	);
};

export default MinistryPageHeader;

const styles = StyleSheet.create({
	container: {
		height: 56,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e5e7eb",
	},
	sideButton: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
	},
	center: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
	},
});
