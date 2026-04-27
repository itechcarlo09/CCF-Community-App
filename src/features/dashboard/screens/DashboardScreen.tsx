import ShadowCard from "@components/ShadowCard";
import { design } from "@theme/index";
import { useTheme } from "@theme/ThemeProvider";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TextStyle,
	ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatItem from "../components/StatItem";
import { useDashboardViewModel } from "../viewModel/useDashboardViewModel";

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const { loading, dashboard } = useDashboardViewModel();

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: theme.background }]}
		>
			{/* Header */}
			<LinearGradient
				colors={["#00A6B6", "#58B9DA"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
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
						style={[styles.title, { ...(design.typography.h1 as TextStyle) }]}
					>
						Dashboard
					</Text>
					<Text
						style={[
							styles.subtitle,
							{ ...(design.typography.body as TextStyle) },
						]}
					>
						Here's your church overview
					</Text>
				</View>
			</LinearGradient>

			<View
				style={[
					{
						paddingHorizontal: design.spacing.xl,
						marginBottom: design.spacing.xl,
						rowGap: design.spacing.xl,
					},
					styles.content,
				]}
			>
				<ShadowCard style={{ rowGap: design.spacing.md }}>
					<Text
						style={[
							{
								color: theme.text,
							},
							design.typography.h4 as TextStyle,
						]}
					>
						Quick stats
					</Text>

					<View style={{ rowGap: design.spacing.md }}>
						<StatItem
							label={"Members"}
							value={dashboard?.totalAccounts ?? 0}
							change={""}
						/>
						<StatItem
							label={"DGroups"}
							value={dashboard?.dLeaders ?? 0}
							change={""}
						/>
						<StatItem
							label={"Facilitators"}
							value={dashboard?.facilitators ?? 0}
							change={""}
						/>
						<StatItem label={"Volunteers"} value={"200"} change={""} />
					</View>
				</ShadowCard>
			</View>
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 80,
	},
	header: {
		paddingBottom: 80,
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

	grid: {
		flexDirection: "row",
		gap: 12,
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
});
