import { Text, TextStyle, View } from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import ShadowCard from "@components/ShadowCard";
import TextLink from "@components/TextLink";
import { design } from "@theme/index";
import { styles } from "./MinistryCard.styles";
import MDIIcon from "@components/MDIIcon";
import {
	mdiAccountTieVoiceOutline,
	mdiCalendarBlankOutline,
	mdiClockOutline,
	mdiMapMarkerOutline,
	mdiTagOutline,
} from "@mdi/js";
import { MinistryCardProps } from "./MinistryCard.types";
import MinistryBadge from "../MinistryBadge";
import dayjs from "dayjs";
import CCFButton from "@components/CCFButton";

const formatDateRange = (startDate: Date, endDate?: Date) => {
	const start = dayjs(startDate);
	const end = endDate ? dayjs(endDate) : null;

	// No end date → single date
	if (!end || start.isSame(end, "day")) {
		return start.format("dddd, MMMM D, YYYY");
	}

	// Same month & year
	if (start.isSame(end, "month")) {
		return `${start.format("dddd, MMMM D")} - ${end.format("D, YYYY")}`;
	}

	// Same year
	if (start.isSame(end, "year")) {
		return `${start.format("dddd, MMMM D")} - ${end.format("MMMM D, YYYY")}`;
	}

	// Different year
	return `${start.format("dddd, MMMM D, YYYY")} - ${end.format(
		"dddd, MMMM D, YYYY",
	)}`;
};

const MinistryCard: React.FC<MinistryCardProps> = ({
	name,
	series,
	startDate,
	endDate,
	location,
	speaker,
}) => {
	const { theme } = useTheme();
	const start = dayjs(startDate);
	const end = dayjs(endDate);
	return (
		<ShadowCard style={{ rowGap: 4 }}>
			<MinistryBadge ministry={"B1G"} />
			<Text
				style={[
					{
						color: theme.text,
					},
					design.typography.h4 as TextStyle,
				]}
			>
				{name}
			</Text>
			{series && (
				<View style={[styles.textContainer, { gap: design.spacing.md }]}>
					<MDIIcon path={mdiTagOutline} color={theme.primary} size={20} />
					<TextLink>Series of: {series}</TextLink>
				</View>
			)}
			<View style={[styles.textContainer, { gap: design.spacing.md }]}>
				<MDIIcon path={mdiCalendarBlankOutline} color={theme.muted} size={20} />
				<Text
					style={[
						{
							color: theme.muted,
						},
						design.typography.body,
					]}
				>
					{formatDateRange(startDate, endDate)}
				</Text>
			</View>
			<View style={[styles.textContainer, { gap: design.spacing.md }]}>
				<MDIIcon path={mdiClockOutline} color={theme.muted} size={20} />
				<Text
					style={[
						{
							color: theme.muted,
						},
						design.typography.body,
					]}
				>
					{`${start.format("h:mm A")} - ${end.format("h:mm A")}`}
				</Text>
			</View>
			<View style={[styles.textContainer, { gap: design.spacing.md }]}>
				<MDIIcon path={mdiMapMarkerOutline} color={theme.muted} size={20} />
				<Text
					style={[
						{
							color: theme.muted,
						},
						design.typography.body,
					]}
				>
					{location}
				</Text>
			</View>
			<View
				style={[
					styles.textContainer,
					{ gap: design.spacing.md, marginBottom: design.spacing.md },
				]}
			>
				<MDIIcon
					path={mdiAccountTieVoiceOutline}
					color={theme.muted}
					size={20}
				/>
				<Text
					style={[
						{
							color: theme.muted,
						},
						design.typography.body,
					]}
				>
					{speaker}
				</Text>
			</View>
			<CCFButton title={"Register"} />
		</ShadowCard>
	);
};

export default MinistryCard;
