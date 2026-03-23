import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import {
	mdiArrowRight,
	mdiMapMarkerOutline,
	mdiMicrophoneOutline,
} from "@mdi/js";
import MdiIcon from "../../../components/MdiIcon";
import { EventItemUI } from "../model/EventListItem";
import CircularDate from "../../../components/CircularDate";
import Button from "../../../components/Button";
import SeriesButton from "./Components/SeriesButton";

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
				</View>
				{(event.location || event.speakers) && (
					<View style={styles.detailsContainer}>
						{event.location && (
							<View
								style={[
									styles.detailsItemContainer,
									{ backgroundColor: theme.gray[200] },
								]}
							>
								<MdiIcon path={mdiMapMarkerOutline} size={12} color="#323232" />
								<Text style={[styles.detailsText, { color: theme.text }]}>
									{event.location}
								</Text>
							</View>
						)}
						{event.speakers && (
							<View
								style={[
									styles.detailsItemContainer,
									{ backgroundColor: theme.gray[200] },
								]}
							>
								<MdiIcon
									path={mdiMicrophoneOutline}
									size={12}
									color="#323232"
								/>
								<Text style={[styles.detailsText, { color: theme.text }]}>
									{event.speakers}
								</Text>
							</View>
						)}
					</View>
				)}
				{event.seriesTitle && <SeriesButton name={event.seriesTitle} />}
				{(event.firstTimeAttendees > 0 || event.regularAttendees > 0) && (
					<View style={styles.countContainer}>
						{event.firstTimeAttendees > 0 && (
							<View>
								<Text style={[styles.countText, { color: theme.gray[500] }]}>
									First Time Attendees
								</Text>
								<Text style={[styles.countNumber, { color: theme.text }]}>
									{event.firstTimeAttendees}
								</Text>
							</View>
						)}
						{event.regularAttendees > 0 && (
							<View>
								<Text style={[styles.countText, { color: theme.gray[500] }]}>
									Regular
								</Text>
								<Text style={[styles.countNumber, { color: theme.text }]}>
									{event.regularAttendees}
								</Text>
							</View>
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
	detailsItemContainer: {
		borderRadius: 16,
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 4,
		columnGap: 2,
	},
	detailsText: {
		fontSize: 12,
		lineHeight: 16,
	},
	countContainer: {
		flexDirection: "row",
		columnGap: 16,
	},
	countText: {
		fontSize: 12,
		lineHeight: 16,
	},
	countNumber: {
		fontSize: 18,
		lineHeight: 28,
		fontWeight: "bold",
	},
});

export default EventListItem;
