import React, { useState, useEffect } from "react";
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
}

interface DropdownProps {
	items: DropdownItem[];
	value: any;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
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

			{/* Touchable for dropdown */}
			<TouchableOpacity
				style={[styles.touchable, touched && error && { borderColor: "red" }]}
				onPress={() => setOpen(true)}
			>
				<Text style={{ color: selectedLabel ? "#111827" : "#9CA3AF" }}>
					{selectedLabel || placeholder}
				</Text>
			</TouchableOpacity>

			{/* Helper text */}
			{!error && helperText && (
				<Text style={styles.helperText}>{helperText}</Text>
			)}

			{/* Error text */}
			{touched && error && <Text style={styles.errorText}>{error}</Text>}

			{/* Modal */}
			<Modal visible={open} transparent animationType="fade">
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setOpen(false)}
				>
					<View style={styles.modalContent}>
						<FlatList
							data={items}
							keyExtractor={(item) => String(item.value)}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.item}
									onPress={() => {
										onChange(item.value);
										setOpen(false);
									}}
								>
									<Text style={styles.itemText}>{item.label}</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	labelRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
	label: { fontSize: 12, color: "#6B7280" },
	required: { color: "#EF4444", fontSize: 14, fontWeight: "600" },
	touchable: {
		height: 48,
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		paddingHorizontal: 10,
		justifyContent: "center",
		backgroundColor: "#FFFFFF",
	},
	helperText: { color: "#6B7280", fontSize: 12, marginTop: 4 },
	errorText: { color: "red", fontSize: 12, marginTop: 4 },
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.2)",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	modalContent: {
		backgroundColor: "#fff",
		borderRadius: 8,
		maxHeight: "50%",
	},
	item: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	itemText: { fontSize: 14, color: "#111827" },
});
