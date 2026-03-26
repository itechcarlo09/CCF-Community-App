import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MdiIcon from "@components/MdiIcon";
import {
	mdiFileChartOutline,
	mdiPencilOutline,
	mdiMapMarkerOutline,
	mdiCalendarClockOutline,
	mdiAccountVoice,
	mdiChevronRight,
} from "@mdi/js";
import { EventItemUI } from "../model/EventListItem";
import { useTheme } from "@theme/ThemeProvider";

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
	const { theme } = useTheme();

	const formatTime = (date: Date) => {
		const h = date.getHours();
		const m = date.getMinutes().toString().padStart(2, "0");
		const ampm = h >= 12 ? "PM" : "AM";
		return `${h % 12 || 12}:${m} ${ampm}`;
	};

	const renderMinistry = () => {
		if (!item.ministryText?.length) return null;

		if (item.ministryText.length === 1) {
			return item.ministryText[0];
		}

		if (item.ministryText.length === 2) {
			return `${item.ministryText[0]} × ${item.ministryText[1]}`;
		}

		const [main, ...rest] = item.ministryText;
		return `${main} +${rest.length}`;
	};

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			{/* TOP ROW */}
			<View style={styles.topRow}>
				{/* Ministry Chip */}
				<View style={styles.ministryChip}>
					<Text style={styles.ministryText}>{renderMinistry()}</Text>
				</View>

				{/* Actions */}
				<View style={styles.actions}>
					<TouchableOpacity onPress={onPressReport} style={styles.iconBtn}>
						<MdiIcon path={mdiFileChartOutline} size={18} color="#666" />
					</TouchableOpacity>

					<TouchableOpacity onPress={onPressEdit} style={styles.iconBtn}>
						<MdiIcon path={mdiPencilOutline} size={18} color="#666" />
					</TouchableOpacity>
				</View>
			</View>

			{/* TITLE */}
			<Text style={styles.title}>{item.eventTitle}</Text>

			{/* SERIES CHIP */}
			{item.seriesTitle && (
				<TouchableOpacity style={styles.seriesChip} onPress={onPressSeries}>
					<Text style={styles.seriesText}>{item.seriesTitle}</Text>

					<MdiIcon
						path={mdiChevronRight}
						size={16}
						color="#0284c7"
						style={styles.seriesIcon}
					/>
				</TouchableOpacity>
			)}

			{/* DETAILS */}
			<View style={styles.details}>
				<View style={styles.row}>
					<MdiIcon path={mdiMapMarkerOutline} size={16} color="#888" />
					<Text style={styles.meta}>{item.location}</Text>
				</View>

				<View style={styles.row}>
					<MdiIcon path={mdiCalendarClockOutline} size={16} color="#888" />
					<Text style={styles.meta}>
						{item.date.toDateString()} • {formatTime(item.date)}
					</Text>
				</View>

				<View style={styles.row}>
					<MdiIcon path={mdiAccountVoice} size={16} color="#888" />
					<Text style={[styles.meta, { color: theme.text }]}>
						{item.speakers}
					</Text>
				</View>
			</View>

			{/* FOOTER */}
			<View style={styles.footer}>
				<Text style={styles.attendance}>👋 {item.firstTimeAttendees}</Text>
				<Text style={styles.attendance}>🙋 {item.regularAttendees}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 16,
		marginVertical: 10,
		marginHorizontal: 16,
		elevation: 3,
	},

	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	ministryChip: {
		backgroundColor: "#f1f5f9",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
	},

	ministryText: {
		fontSize: 12,
		fontWeight: "600",
		color: "#334155",
	},

	actions: {
		flexDirection: "row",
		backgroundColor: "#f8fafc",
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 4,
	},

	iconBtn: {
		marginHorizontal: 4,
	},

	title: {
		fontSize: 17,
		fontWeight: "700",
		marginTop: 10,
		color: "#111",
	},

	seriesText: {
		fontSize: 12,
		color: "#0284c7",
		fontWeight: "600",
	},

	details: {
		marginTop: 12,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},

	meta: {
		marginLeft: 6,
		fontSize: 13,
		color: "#555",
	},

	footer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 12,
		borderTopWidth: 0.5,
		borderTopColor: "#eee",
		paddingTop: 8,
	},

	attendance: {
		marginLeft: 12,
		fontSize: 13,
		fontWeight: "600",
		color: "#222",
	},

	seriesChip: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		marginTop: 8,
		backgroundColor: "#e0f2fe",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
	},

	seriesIcon: {
		marginLeft: 4,
	},
});
