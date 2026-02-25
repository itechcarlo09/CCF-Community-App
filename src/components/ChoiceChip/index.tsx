import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChoiceChipProps } from "./types";
import { styles } from "./styles";
import { DropdownOption } from "../../types/dropdownOption";
import { useTheme } from "../../theme/ThemeProvider";

const Button: React.FC<ChoiceChipProps> = ({
	required,
	label,
	disabled = false,
	options,
	textStyle,
	onChange,
	name,
	value,
	error,
}) => {
	const { theme } = useTheme();

	const handleChange = (selectedItem: DropdownOption<string>) => {
		onChange(name, selectedItem.value);
	};

	return (
		<View>
			{label && (
				<Text style={[styles.label, { color: theme.slate[700] }]}>
					{label}
					{required && <Text style={{ color: theme.blue[500] }}> *</Text>}
				</Text>
			)}
			<View style={styles.dualFields}>
				{options.map((option) => (
					<TouchableOpacity
						style={[
							styles.button,
							disabled && styles.disabled,
							{
								backgroundColor: value === option.value ? "#007AFF" : "#E0E0E0",
								borderColor: value === option.value ? "#007AFF" : "#E0E0E0",
							},
							error && styles.errorButton,
						]}
						onPress={() => {
							const newItem = option; // For simplicity, just select the first item
							handleChange(newItem);
						}}
						activeOpacity={0.7}
					>
						<View style={styles.content}>
							<Text
								style={[
									styles.text,
									textStyle,
									{
										color: value === option.value ? "#fff" : "#000",
									},
								]}
							>
								{option.value}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default Button;
