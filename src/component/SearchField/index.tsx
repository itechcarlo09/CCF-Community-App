import React from "react";
import { View, TextInput, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../theme/ThemeProvider";
import { styles } from "./styles";
import { CustomSearchFieldProps } from "./types";

export const SearchField: React.FC<CustomSearchFieldProps> = ({
	value,
	onChangeText,
	onCancel,
	style,
}) => {
	const { theme } = useTheme();
	return (
		<View style={[styles.container, style]}>
			<Ionicons name="search" size={20} style={styles.icon} />
			<TextInput
				style={[styles.input, { color: theme.slate[900] }]}
				value={value}
				onChangeText={onChangeText}
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
};
