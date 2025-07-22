import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../../../firebase/firestore/types/User";
import CircularImage from "../../../components/CircularImage";
import { Timestamp } from "@react-native-firebase/firestore";
import dayjs from "dayjs";

interface Props {
	user: User;
	onPress: (id?: string) => void;
}

const calculateAge = (birthDate: Date): number | null => {
	if (!birthDate) return null;

	const date =
		birthDate instanceof Timestamp ? birthDate.toDate() : new Date(birthDate);

	return dayjs().diff(dayjs(date), "year");
};

const UserListItem = ({ user, onPress }: Props) => {
	const age = calculateAge(user.birthDate);
	return (
		<TouchableOpacity style={styles.card} onPress={() => onPress(user.id)}>
			<View>
				<CircularImage
					uri={""}
					size={50}
					fallbackText={`${user.firstName[0]}${user.lastName[0]}`}
				/>
			</View>
			<View>
				<Text style={styles.text}>
					{user.lastName} {user.firstName}{" "}
					{user.middleName ? user.middleName[0] + ". " : ""}
				</Text>
				<Text style={styles.detailText}>
					{age !== null ? `• ${age} yrs old` : ""}
				</Text>
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
