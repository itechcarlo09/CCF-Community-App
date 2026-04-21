import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import {
	mdiMapMarkerOutline,
	mdiMicrophoneOutline,
	mdiPencilOutline,
} from "@mdi/js";
import { EventItemUI } from "../model/EventListItem";
import CircularDate from "../../../component/CircularDate";
import SeriesButton from "./Components/SeriesButton";
import AttendanceView from "./Components/AttendanceView";
import EventDetailView from "./Components/EventDetailView";
import MdiIcon from "../../../component/MdiIcon";

interface Props {
	event: EventItemUI;
	onPress: (id?: number) => void;
}

const EventListItem = ({ event, onPress }: Props) => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				styles.card,
				{ backgroundColor: theme.background, borderColor: theme.border },
			]}
			// onPress={() => onPress(event.id)}
		>
			<Text
				style={[
					styles.header,
					styles.text,
					{ color: theme.white, backgroundColor: theme.error },
				]}
			>
				{event.ministryText}
			</Text>
			<View style={styles.body}>
				<View style={styles.dateAndTitle}>
					<CircularDate date={event.date} size={45} />
					<Text style={[styles.eventTitle, styles.flex, { color: theme.text }]}>
						{event.eventTitle}
					</Text>
					<MdiIcon
						onPress={onPress}
						path={mdiPencilOutline}
						size={24}
						color="#323232"
					/>
				</View>
				{(event.location || event.speakers) && (
					<View style={styles.detailsContainer}>
						{event.location && (
							<EventDetailView
								iconPath={mdiMapMarkerOutline}
								text={event.location}
							/>
						)}
						{event.speakers && (
							<EventDetailView
								iconPath={mdiMicrophoneOutline}
								text={event.speakers}
							/>
						)}
					</View>
				)}
				{event.seriesTitle && <SeriesButton name={event.seriesTitle} />}
				{(event.firstTimeAttendees > 0 || event.regularAttendees > 0) && (
					<View style={styles.attendanceContainer}>
						{event.firstTimeAttendees > 0 && (
							<AttendanceView
								title={"First Time Attendees"}
								count={event.firstTimeAttendees}
							/>
						)}
						{event.regularAttendees > 0 && (
							<AttendanceView
								title={"Regular"}
								count={event.regularAttendees}
							/>
						)}
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	card: {
		borderRadius: 8,
		borderWidth: 1,
		columnGap: 12,
		marginHorizontal: 16,
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 8,
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	body: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		rowGap: 10,
	},
	text: { fontSize: 18, fontWeight: "bold" },
	eventTitle: { fontSize: 24, fontWeight: "bold" },
	dateAndTitle: { columnGap: 10, flexDirection: "row" },
	detailsContainer: {
		gap: 5,
		flexDirection: "row",
		flexWrap: "wrap",
	},

	attendanceContainer: {
		flexDirection: "row",
		columnGap: 16,
	},
});

export default EventListItem;
