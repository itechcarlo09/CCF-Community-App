import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Linking,
} from "react-native";
import { useDashboardViewModel } from "../viewModel/useDashboardViewModel";
import Loading from "@component/Loading";
import DashboardCard from "./components/DataTile";
import { useTheme } from "@theme/ThemeProvider";
import MdiIcon from "@component/MdiIcon";
import {
	mdiAccountGroupOutline,
	mdiAccountTieOutline,
	mdiAccountVoice,
	mdiEmailOutline,
	mdiFacebookMessenger,
	mdiHandHeartOutline,
	mdiMessageTextOutline,
} from "@mdi/js";

export const DashboardScreen = () => {
	const { theme } = useTheme();
	const { loading, dashboard } = useDashboardViewModel();

	const handleOpen = (type: "sms" | "email" | "facebook") => {
		if (type === "sms") {
			Linking.openURL("sms:+63760767693");
		}
		if (type === "email") {
			Linking.openURL("mailto:itechcarlo@gmail.com");
		}
		if (type === "facebook") {
			Linking.openURL("https://www.facebook.com/renoriacarlo");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={[styles.header, { color: theme.text }]}>Dashboard</Text>

			{/* 🔥 CTA */}
			<View style={[styles.adContainer, { backgroundColor: theme.card }]}>
				{/* Badge */}
				<View style={styles.badge}>
					<Text style={styles.badgeText}>Volunteer Opportunity</Text>
				</View>

				<Text style={[styles.adTitle, { color: theme.text }]}>
					Improve this app with your UI/UX skills
				</Text>

				<Text style={[styles.adSubtitle, { color: theme.text }]}>
					Join as a volunteer and collaborate with the team.
				</Text>

				<Text style={[styles.adName, { color: theme.primary }]}>
					Carlo Renoria
				</Text>

				{/* Contact List */}
				<View style={styles.contactList}>
					<TouchableOpacity
						style={styles.contactItem}
						onPress={() => handleOpen("sms")}
					>
						<MdiIcon
							path={mdiMessageTextOutline}
							size={20}
							color={theme.primary}
						/>
						<Text style={[styles.contactText, { color: theme.text }]}>
							+63 760 767 693
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.contactItem}
						onPress={() => handleOpen("email")}
					>
						<MdiIcon path={mdiEmailOutline} size={20} color={theme.primary} />
						<Text style={[styles.contactText, { color: theme.text }]}>
							itechcarlo@gmail.com
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.contactItem}
						onPress={() => handleOpen("facebook")}
					>
						<MdiIcon
							path={mdiFacebookMessenger}
							size={20}
							color={theme.primary}
						/>
						<Text style={[styles.contactText, { color: theme.text }]}>
							facebook.com/renoriacarlo
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* 📊 Tiles */}
			{loading ? (
				<Loading />
			) : (
				<View style={styles.cardsContainer}>
					{[
						{
							title: "Members",
							value: dashboard?.totalAccounts ?? 0,
							icon: mdiAccountGroupOutline,
							color: "#4F8EF7",
						},
						{
							title: "Volunteers",
							value: 0,
							icon: mdiHandHeartOutline,
							color: "#34C759",
						},
						{
							title: "Facilitators",
							value: dashboard?.facilitators ?? 0,
							icon: mdiAccountVoice,
							color: "#34C759",
						},
						{
							title: "DLeaders",
							value: dashboard?.dLeaders ?? 0,
							icon: mdiAccountTieOutline,
							color: "#FF9500",
						},
					].map((item, index, arr) => {
						const isLast = index === arr.length - 1;
						const isOdd = arr.length % 2 !== 0;

						// If last item and odd → full width
						const isFullWidth = isLast && isOdd;

						return (
							<View
								key={item.title}
								style={[styles.cardWrapper, isFullWidth && styles.fullWidth]}
							>
								<DashboardCard {...item} />
							</View>
						);
					})}
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#F5F5F5",
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 16,
	},

	cardWrapper: {
		width: "48%",
	},

	fullWidth: {
		width: "100%",
	},

	// CTA
	adContainer: {
		borderRadius: 16,
		padding: 16,
		marginBottom: 20,
		elevation: 3,
	},
	adTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 6,
	},
	adSubtitle: {
		fontSize: 14,
		marginBottom: 6,
	},
	adName: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 12,
	},

	contactList: {
		rowGap: 10,
	},

	// Cards
	cardsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},

	badge: {
		alignSelf: "flex-start",
		backgroundColor: "#E8F0FE",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		marginBottom: 8,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "600",
		color: "#4F8EF7",
	},

	contactItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: "#E5E7EB",
	},

	contactText: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14,
	},
});
