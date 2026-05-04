import React from "react";
import { Pressable, Text, View, ViewStyle, StyleProp } from "react-native";
import { useFormikContext } from "formik";
import { useTheme } from "@theme/ThemeProvider";

type ChoiceItem = {
	label: string;
	value: string;
};

type CCFChoiceChipProps = {
	name?: string; // optional for Formik mode
	items: ChoiceItem[];

	// Standalone mode
	value?: string | string[];
	onChange?: (value: string | string[]) => void;

	multiple?: boolean;
	error?: string;
	style?: StyleProp<ViewStyle>;
};

const CCFChoiceChip: React.FC<CCFChoiceChipProps> = ({
	name,
	items,
	value,
	onChange,
	multiple = false,
	error,
	style,
}) => {
	const { theme, isDarkMode } = useTheme();

	// Try Formik context safely
	let formik: any = null;

	try {
		formik = useFormikContext<any>();
	} catch {
		formik = null;
	}

	const isFormikMode = !!formik && !!name;

	const selectedValue = isFormikMode ? formik.values[name!] : value;

	const fieldError =
		isFormikMode && formik.touched[name!] && formik.errors[name!]
			? formik.errors[name!]
			: error;

	const updateValue = (newValue: string | string[]) => {
		if (isFormikMode) {
			formik.setFieldValue(name!, newValue);
			formik.setFieldTouched(name!, true);
		} else {
			onChange?.(newValue);
		}
	};

	const handleSelect = (itemValue: string) => {
		if (multiple) {
			const current = Array.isArray(selectedValue) ? selectedValue : [];

			const exists = current.includes(itemValue);

			const updated = exists
				? current.filter((x) => x !== itemValue)
				: [...current, itemValue];

			updateValue(updated);
		} else {
			updateValue(itemValue);
		}
	};

	const isSelected = (itemValue: string) => {
		if (multiple) {
			return Array.isArray(selectedValue) && selectedValue.includes(itemValue);
		}

		return selectedValue === itemValue;
	};

	return (
		<View style={style}>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					gap: 10,
				}}
			>
				{items.map((item) => {
					const active = isSelected(item.value);

					return (
						<Pressable
							key={item.value}
							onPress={() => handleSelect(item.value)}
							style={({ pressed }) => ({
								paddingVertical: 10,
								paddingHorizontal: 16,
								borderRadius: 999,
								borderWidth: 1.5,
								flex: 1,
								borderColor: active
									? theme.primary
									: fieldError
									? theme.error
									: theme.border,
								backgroundColor: active
									? theme.primary
									: isDarkMode
									? theme.card
									: theme.white,
								opacity: pressed ? 0.8 : 1,
							})}
						>
							<Text
								style={{
									textAlign: "center",
									fontWeight: "600",
									color: active ? theme.white : theme.text,
								}}
							>
								{item.label}
							</Text>
						</Pressable>
					);
				})}
			</View>

			{!!fieldError && (
				<Text
					style={{
						color: theme.error,
						fontSize: 12,
						marginTop: 6,
					}}
				>
					{fieldError}
				</Text>
			)}
		</View>
	);
};

export default CCFChoiceChip;
