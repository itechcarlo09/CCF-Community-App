import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CircularImage from "../../../components/CircularImage";
import { UserUI } from "../viewModel/useUserViewModel";

interface Props {
	user: UserUI;
	onPress: (id?: string) => void;
}

const UserListItem = ({ user, onPress }: Props) => {
	return (
		<TouchableOpacity style={styles.card} onPress={() => onPress(user.id)}>
			<CircularImage uri={""} size={50} fallbackText={user.fallbackText} />
			<View>
				<Text style={styles.text}>{user.fullName}</Text>
				<Text style={styles.detailText}>{user.ageText}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		elevation: 6,
		padding: 16,
		marginVertical: 8,
		backgroundColor: "#c00b0bff",
		borderRadius: 8,
		flexDirection: "row",
		columnGap: 12,
		marginHorizontal: 16,
	},
	text: { fontSize: 18, fontWeight: "bold", color: "#fff" },
	detailText: { fontSize: 12, color: "#fff" },
});

export default UserListItem;
