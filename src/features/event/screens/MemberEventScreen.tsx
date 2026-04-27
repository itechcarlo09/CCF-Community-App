import { toast } from "@component/toast/toast";
import ShadowCard from "@components/ShadowCard";
import { design } from "@theme/index";
import { useTheme } from "@theme/ThemeProvider";
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TextStyle,
	ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mdiQrcode } from "@mdi/js";
import MDIIcon from "@components/MDIIcon";
import CCFButton from "@components/CCFButton";
import MinistryBadge from "../components/MinistryBadge";
import TextLink from "@components/TextLink";
import MinistryCard from "../components/MinistryCard";
import dayjs from "dayjs";

const MemberEventScreen = () => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const [showQR, setShowQR] = useState(false);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: theme.background }]}
		>
			<View style={{ rowGap: design.spacing.lg }}>
				<View>
					<View
						style={[
							styles.header,
							{
								paddingTop:
									insets.top +
									(Platform.OS === "android" ? design.spacing.lg : 0),
								paddingHorizontal: design.spacing.xl,
							},
						]}
					>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.h3 as TextStyle,
							]}
						>
							For You
						</Text>
					</View>

					<View
						style={[
							{
								paddingHorizontal: design.spacing.xl,
								marginBottom: design.spacing.xl,
								rowGap: design.spacing.xl,
							},
						]}
					>
						<MinistryCard
							name={"Young Professionals Meetup: Building Kingdom Careers"}
							series="Kingdom Living"
							startDate={dayjs().toDate()}
							endDate={dayjs().add(2, "hour").toDate()}
							location={"Fellowship Hall, 3rd Floor"}
							speaker={"Pastor Mark Chen"}
						/>
						<MinistryCard
							name={"Young Professionals Meetup: Building Kingdom Careers"}
							series="Kingdom Living"
							startDate={dayjs().toDate()}
							endDate={dayjs().add(2, "hour").toDate()}
							location={"Fellowship Hall, 3rd Floor"}
							speaker={"Pastor Mark Chen"}
						/>
					</View>
				</View>
				<View>
					<View
						style={[
							styles.header,
							{
								paddingHorizontal: design.spacing.xl,
							},
						]}
					>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.h3 as TextStyle,
							]}
						>
							Upcoming Events
						</Text>
					</View>
					<View
						style={[
							{
								paddingHorizontal: design.spacing.xl,
								marginBottom: design.spacing.xl,
								rowGap: design.spacing.xl,
							},
						]}
					>
						<MinistryCard
							name={"Young Professionals Meetup: Building Kingdom Careers"}
							series="Kingdom Living"
							startDate={dayjs().toDate()}
							endDate={dayjs().add(2, "hour").toDate()}
							location={"Fellowship Hall, 3rd Floor"}
							speaker={"Pastor Mark Chen"}
						/>
						<MinistryCard
							name={"Young Professionals Meetup: Building Kingdom Careers"}
							series="Kingdom Living"
							startDate={dayjs().toDate()}
							endDate={dayjs().add(2, "hour").toDate()}
							location={"Fellowship Hall, 3rd Floor"}
							speaker={"Pastor Mark Chen"}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default MemberEventScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingBottom: 12,
	},
	title: {
		color: "#FFF",
		marginBottom: 8,
	},
	subtitle: {
		color: "rgba(255,255,255,0.8)",
	},

	content: {
		marginTop: -48,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
	},

	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		alignItems: "center",
		justifyContent: "center",
	},

	avatarImage: {
		width: "100%",
		height: "100%",
		borderRadius: 40,
	},

	avatarText: {
		color: "#FFF",
		fontSize: 24,
		fontWeight: "600",
	},

	userInfo: {
		flex: 1,
	},

	badge: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 999,
		alignSelf: "flex-start",
	},

	section: {
		backgroundColor: "#FFF",
		borderRadius: 16,
		padding: 16,
		marginBottom: 24,
		// 🔥 iOS shadow (stronger so it's visible)
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },

		elevation: 4,
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 12,
	},

	grid: {
		flexDirection: "row",
		gap: 12,
	},

	modeCard: {
		flex: 1,
		padding: 16,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#E5E7EB",
		alignItems: "center",
	},

	modeActivePrimary: {
		borderColor: "#00A6B6",
		backgroundColor: "rgba(0,166,182,0.05)",
	},

	modeActiveSecondary: {
		borderColor: "#58B9DA",
		backgroundColor: "rgba(88,185,218,0.05)",
	},

	modeText: {
		color: "#6B7280",
	},

	modeTextPrimary: {
		color: "#00A6B6",
	},

	modeTextSecondary: {
		color: "#58B9DA",
	},

	item: {
		paddingVertical: 12,
	},

	itemText: {
		fontSize: 14,
		color: "#323232",
	},

	logout: {
		padding: 16,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},

	logoutText: {
		color: "#DC2626",
		fontWeight: "600",
	},
	divider: {
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
	},
});
