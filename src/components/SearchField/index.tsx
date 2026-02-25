import React, { useRef, useState } from "react";
import {
	Animated,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Pressable,
	Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../theme/ThemeProvider";

export function SearchField({ value, onChange, onCancel }) {
	const { theme } = useTheme();
	return (
		<View style={styles.container}>
			<Ionicons name="search" size={20} style={styles.icon} />
			<TextInput
				style={[styles.input, { color: theme.slate[900] }]}
				value={value}
				onChangeText={onChange}
				placeholder="Search"
				placeholderTextColor={theme.slate[400]}
			/>

			{value?.length > 0 && (
				<Pressable onPress={() => onCancel("")}>
					<Ionicons name="close-circle" size={20} color={theme.slate[400]} />
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 8,
		alignItems: "center",
		flex: 1,
	},
	icon: { marginRight: 8, color: "#888" },
	input: { flex: 1, fontSize: 16, fontWeight: 400 },
	cancel: { marginLeft: 12, color: "blue" },
});
