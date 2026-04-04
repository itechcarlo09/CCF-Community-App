import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChoiceChipProps } from "./types";
import { styles } from "./styles";
import { SelectionProps } from "src/types/selectionTypes";

const ChoiceChip: React.FC<ChoiceChipProps> = ({
	required,
	label,
	disabled = false,
	options,
	textStyle,
	onChange,
	name,
	value,
	touched,
	error,
}) => {
	const handleChange = (selectedItem: SelectionProps<string>) => {
		onChange(name, selectedItem.value);
	};

	return (
		<View>
			{label && (
				<View style={styles.labelRow}>
					<Text style={styles.label}>{label}</Text>
					{required && <Text style={styles.required}> *</Text>}
				</View>
			)}
			<View style={styles.dualFields}>
				{options.map((option, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.button,
							disabled && styles.disabled,
							{
								backgroundColor: value === option.value ? "#4F46E5" : "#FFF",
								borderColor: value === option.value ? "#4F46E5" : "#E0E0E0",
							},
							touched && error && styles.errorButton,
						]}
						onPress={() => {
							const newItem = option;
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
			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default ChoiceChip;
