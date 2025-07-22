import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../../../firebase/firestore/types/User";
import CircularImage from "../../../components/CircularImage";

interface Props {
	user: User;
	onPress: (id?: string) => void;
}

const UserListItem = ({ user, onPress }: Props) => (
	<TouchableOpacity style={styles.card} onPress={() => onPress(user.id)}>
		<View>
			<CircularImage
				uri={""}
				size={50}
				fallbackText={`${user.firstName[0]}${user.lastName[0]}`}
			/>
		</View>
		<Text style={styles.text}>
			{user.firstName} {user.middleName ? user.middleName[0] + ". " : ""}
			{user.lastName}
		</Text>
	</TouchableOpacity>
);

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
});

export default UserListItem;
