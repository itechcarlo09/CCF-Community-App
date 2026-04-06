import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
} from "react-native";

interface DropdownItem {
	label: string;
	value: any;
	disabled?: boolean;
}

interface DropdownProps {
	items: DropdownItem[];
	value: any;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	title?: string; // 👈 modal title
	error?: string;
	touched?: boolean;
	required?: boolean;
	helperText?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
	items,
	value,
	onChange,
	placeholder = "Select",
	label,
	title,
	error,
	touched,
	required = false,
	helperText,
}) => {
	const [open, setOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

	useEffect(() => {
		const selectedItem = items.find((item) => item.value === value);
		setSelectedLabel(selectedItem?.label || null);
	}, [value, items]);

	return (
		<View>
			{/* Label */}
			{label && (
				<View style={styles.labelRow}>
					<Text style={styles.label}>{label}</Text>
					{required && <Text style={styles.required}> *</Text>}
				</View>
			)}

			{/* Input */}
			<TouchableOpacity
				style={[styles.input, touched && error && { borderColor: "#EF4444" }]}
				onPress={() => setOpen(true)}
			>
				<Text style={selectedLabel ? styles.value : styles.placeholder}>
					{selectedLabel || placeholder}
				</Text>
			</TouchableOpacity>

			{/* Helper */}
			{!error && helperText && (
				<Text style={styles.helperText}>{helperText}</Text>
			)}

			{/* Error */}
			{touched && error && <Text style={styles.errorText}>{error}</Text>}

			{/* Modal */}
			<Modal visible={open} transparent animationType="fade">
				<TouchableOpacity
					style={styles.overlay}
					activeOpacity={1}
					onPress={() => setOpen(false)}
				>
					<View style={styles.modal}>
						{/* Title */}
						{title && <Text style={styles.modalTitle}>{title}</Text>}

						<FlatList
							data={items}
							keyExtractor={(item) => String(item.value)}
							renderItem={({ item }) => {
								const isSelected = item.value === value;

								return (
									<TouchableOpacity
										style={[
											styles.item,
											isSelected && styles.selectedItem,
											item.disabled && styles.disabledItem,
										]}
										disabled={item.disabled}
										onPress={() => {
											onChange(item.value);
											setOpen(false);
										}}
									>
										<Text
											style={[
												styles.itemText,
												item.disabled && styles.disabledText,
											]}
										>
											{item.label}
										</Text>

										{/* Checkmark */}
										{isSelected && <Text style={styles.check}>✓</Text>}
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	labelRow: { flexDirection: "row", marginBottom: 4 },
	label: { fontSize: 12, color: "#6B7280" },
	required: { color: "#EF4444", fontWeight: "600" },

	input: {
		height: 48,
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 10, // 👈 softer
		paddingHorizontal: 12,
		justifyContent: "center",
		backgroundColor: "#FFFFFF",
	},

	value: {
		color: "#111827",
		fontSize: 14,
	},

	placeholder: {
		color: "#9CA3AF",
		fontSize: 14,
	},

	helperText: {
		color: "#6B7280",
		fontSize: 12,
		marginTop: 4,
	},

	errorText: {
		color: "#EF4444",
		fontSize: 12,
		marginTop: 4,
	},

	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		padding: 20,
	},

	modal: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16, // 👈 modern
		maxHeight: "60%",
		paddingVertical: 8,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	},

	modalTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
		paddingHorizontal: 16,
		paddingBottom: 8,
	},

	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 16,
	},

	selectedItem: {
		backgroundColor: "#EFF6FF", // light blue
	},

	itemText: {
		fontSize: 14,
		color: "#111827",
	},

	check: {
		color: "#2563EB",
		fontWeight: "600",
	},

	disabledItem: {
		opacity: 0.4,
	},

	disabledText: {
		color: "#9CA3AF",
	},
});
