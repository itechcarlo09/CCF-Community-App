import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { CustomSelectFieldProps } from "./types";
import { styles } from "./styles";
import { useTheme } from "../../theme/ThemeProvider";

const SelectField: React.FC<CustomSelectFieldProps> = ({
	onPress,
	required,
	label,
	disabled = false,
	value,
	error,
}) => {
	const { theme } = useTheme();

	return (
		<View>
			{label && (
				<Text style={[styles.label, { color: theme.slate[700] }]}>
					{label}
					{required && <Text style={{ color: theme.blue[500] }}> *</Text>}
				</Text>
			)}
			<TouchableOpacity
				style={[
					styles.button,
					disabled && styles.disabled,
					{
						borderColor: error ? theme.icon.danger.tertiary : theme.slate[500],
					},
				]}
				onPress={onPress}
				activeOpacity={0.7}
			>
				<View style={styles.content}>
					{value ? (
						<Text style={[styles.text, { color: theme.slate[900] }]}>
							{value}
						</Text>
					) : (
						<Text style={[styles.text, { color: theme.slate[400] }]}>
							Select a leader
						</Text>
					)}
				</View>
			</TouchableOpacity>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default SelectField;
