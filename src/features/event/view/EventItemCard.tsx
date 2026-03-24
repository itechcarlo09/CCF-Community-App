import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { EventItemUI } from "../model/EventListItem";
import MdiIcon from "@components/MdiIcon";
import { mdiFileChartOutline, mdiPencilOutline } from "@mdi/js";

interface Props {
	item: EventItemUI;
	onPress?: () => void;
	onPressSeries?: () => void;
	onPressReport?: () => void;
	onPressEdit?: () => void;
}

export const EventItemCard: React.FC<Props> = ({
	item,
	onPress,
	onPressSeries,
	onPressReport,
	onPressEdit,
}) => {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			{/* HEADER */}
			<View style={styles.header}>
				<Text style={styles.title}>{item.eventTitle}</Text>

				<View style={styles.actions}>
					{/* REPORT ICON */}
					<TouchableOpacity onPress={onPressReport} style={styles.iconBtn}>
						<MdiIcon path={mdiFileChartOutline} size={18} color={"#555"} />
					</TouchableOpacity>

					{/* EDIT ICON */}
					<TouchableOpacity onPress={onPressEdit} style={styles.iconBtn}>
						<MdiIcon path={mdiPencilOutline} size={18} color={"#555"} />
					</TouchableOpacity>
				</View>
			</View>

			{/* SERIES */}
			{item.seriesTitle && (
				<TouchableOpacity onPress={onPressSeries}>
					<Text style={styles.series}>{item.seriesTitle}</Text>
				</TouchableOpacity>
			)}

			{/* DETAILS */}
			<View style={styles.details}>
				<Text style={styles.meta}>📍 {item.location}</Text>
				<Text style={styles.meta}>📅 {item.date.toDateString()}</Text>
				<Text style={styles.meta}>🎤 {item.speakers}</Text>
			</View>

			{/* ATTENDANCE */}
			<View style={styles.footer}>
				<Text style={styles.attendance}>
					First Timers: {item.firstTimeAttendees}
				</Text>
				<Text style={styles.attendance}>Regulars: {item.regularAttendees}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 16,
		elevation: 2,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	title: {
		fontSize: 16,
		fontWeight: "600",
		flex: 1,
		marginRight: 8,
	},

	actions: {
		flexDirection: "row",
	},

	iconBtn: {
		marginLeft: 10,
	},

	series: {
		marginTop: 6,
		color: "#3b82f6",
		fontWeight: "500",
	},

	details: {
		marginTop: 10,
	},

	meta: {
		fontSize: 13,
		color: "#666",
		marginBottom: 2,
	},

	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
		borderTopWidth: 0.5,
		borderTopColor: "#eee",
		paddingTop: 8,
	},

	attendance: {
		fontSize: 13,
		fontWeight: "500",
	},
});
