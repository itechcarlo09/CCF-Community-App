import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { mdiMapMarkerOutline, mdiMicrophoneOutline } from "@mdi/js";
import MdiIcon from "../../../components/MdiIcon";
import { EventItemUI } from "../model/EventListItem";
import CircularDate from "../../../components/CircularDate";

interface Props {
	event: EventItemUI;
	onPress: (id?: number) => void;
}

const EventListItem = ({ event, onPress }: Props) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: theme.background }]}
			onPress={() => onPress(event.id)}
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
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	card: {
		borderRadius: 8,
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
});

export default EventListItem;
