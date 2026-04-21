import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	Modal,
	FlatList,
	StyleSheet,
} from "react-native";

export const CustomDropdown = ({
	data,
	onSelect,
}: {
	data: string[];
	onSelect: (item: string) => void;
}) => {
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState<string | null>(null);

	const handleSelect = (item: string) => {
		setSelected(item);
		onSelect(item);
		setVisible(false);
	};

	return (
		<View style={styles.container}>
			{/* Selected Item */}
			<Pressable style={styles.dropdown} onPress={() => setVisible(true)}>
				<Text style={styles.dropdownText}>
					{selected ?? "Select an option"}
				</Text>
			</Pressable>

			{/* Modal for dropdown list */}
			<Modal
				transparent
				visible={visible}
				animationType="fade"
				onRequestClose={() => setVisible(false)}
			>
				<Pressable style={styles.overlay} onPress={() => setVisible(false)}>
					<View style={styles.listContainer}>
						<FlatList
							data={data}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<Pressable
									style={styles.item}
									onPress={() => handleSelect(item)}
								>
									<Text style={styles.itemText}>{item}</Text>
								</Pressable>
							)}
						/>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 200,
	},
	dropdown: {
		padding: 12,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
	},
	dropdownText: {
		fontSize: 16,
		color: "#333",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	listContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		width: 200,
		maxHeight: 250,
		elevation: 5,
	},
	item: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	itemText: {
		fontSize: 16,
	},
});
