import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MdiIcon from "@components/MdiIcon";
import { mdiFileChartOutline, mdiPencilOutline } from "@mdi/js";
import { EventItemUI } from "../model/EventListItem";
import { useTheme } from "@theme/ThemeProvider";

interface Props {
	item: EventItemUI;
	onPressSeries?: () => void;
	onPressReport?: () => void;
	onPressEdit?: () => void;
}

export const EventItemCard: React.FC<Props> = ({
	item,
	onPressSeries,
	onPressReport,
	onPressEdit,
}) => {
	const { theme } = useTheme();

	const renderMinistries = () => {
		if (!item.ministryText || item.ministryText.length === 0) return null;

		if (item.ministryText.length === 1) {
			return (
				<Text
					style={[
						styles.ministry,
						{ color: theme.textDanger.onDanger.secondary },
					]}
				>
					{item.ministryText[0]}
				</Text>
			);
		} else if (item.ministryText.length === 2) {
			return (
				<Text style={styles.ministry}>
					{item.ministryText[0]} x {item.ministryText[1]} Event
				</Text>
			);
		} else {
			const [main, ...partners] = item.ministryText;
			return (
				<Text style={styles.ministry}>
					{main} Event in partnership with {partners.join(", ")}
				</Text>
			);
		}
	};

	const formatTime = (date: Date) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";
		const h = hours % 12 || 12;
		const m = minutes.toString().padStart(2, "0");
		return `${h}:${m} ${ampm}`;
	};

	return (
		<View style={styles.card}>
			{/* MINISTRY */}
			{renderMinistries()}

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
				<Text style={styles.meta}>
					📅 {item.date.toDateString()} ⏰ {formatTime(item.date)}
				</Text>
				<Text style={styles.meta}>🎤 {item.speakers}</Text>
			</View>

			{/* ATTENDANCE */}
			<View style={styles.footer}>
				<Text style={styles.attendance}>
					First Timers: {item.firstTimeAttendees}
				</Text>
				<Text style={styles.attendance}>Regulars: {item.regularAttendees}</Text>
			</View>
		</View>
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

	ministry: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 6,
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
		color: "#3b82f6", // blue-500
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
