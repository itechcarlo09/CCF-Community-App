import React from "react";
import { Switch, View, Text, StyleSheet } from "react-native";

interface ModernSwitchProps {
	value: boolean;
	onValueChange: (val: boolean) => void;
	label?: string;
}

export const ModernSwitch: React.FC<ModernSwitchProps> = ({
	value,
	onValueChange,
	label,
}) => {
	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<Switch
				value={value}
				onValueChange={onValueChange}
				trackColor={{ false: "#E5E7EB", true: "#2563EB" }} // track colors
				thumbColor={value ? "#FFFFFF" : "#F9FAFB"} // thumb color
				ios_backgroundColor="#E5E7EB" // iOS background when off
				// optional size tweak for modern look
				style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	label: {
		fontSize: 14,
		color: "#111827",
		fontWeight: "500",
	},
});
