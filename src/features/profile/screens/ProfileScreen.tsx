import { toast } from "@component/toast/toast";
import ShadowCard from "@components/ShadowCard";
import { design } from "@theme/index";
import { useTheme } from "@theme/ThemeProvider";
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Platform,
	TextStyle,
	ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ModeCard, { AppMode } from "../components/ModeCard";
import {
	mdiAccountCircleOutline,
	mdiBellOutline,
	mdiCog,
	mdiCogOutline,
	mdiHelpCircleOutline,
	mdiShieldCrownOutline,
} from "@mdi/js";
import { useAppMode } from "src/context/app-mode";
import SettingsItemButton from "../components/SettingsItemButton";

// TODO: replace with your actual hooks
// import { useUser } from "../context/UserContext";
// import { useNavigation } from "@react-navigation/native";

const getInitials = (name?: string) => {
	if (!name) return "";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const { appMode, setAppMode } = useAppMode();
	// const [appMode, setAppMode] = useState<AppMode>(AppMode.MemberMode);
	const { theme } = useTheme();

	const user = {
		name: "John Doe",
		email: "john@example.com",
		avatar: "",
		roleBadge: "Member",
	};

	const handleModeToggle = (mode: AppMode) => {
		setAppMode(mode);
		toast.success(`Switched to ${mode}`);
	};

	const handleLogout = () => {
		toast.success("Logged out successfully");
	};

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
						Profile
					</Text>
					<Text
						style={[
							styles.subtitle,
							{ ...(design.typography.body as TextStyle) },
						]}
					>
						Manage your account and preferences
					</Text>
				</View>
			</LinearGradient>

			{/* Content */}
			<View
				style={[
					{
						paddingHorizontal: design.spacing.xl,
					},
					styles.content,
				]}
			>
				{/* Profile Card */}
				<ShadowCard
					containerStyle={{
						padding: design.spacing["2xl"],
					}}
				>
					<View style={[styles.row, { columnGap: design.spacing.lg }]}>
						<LinearGradient
							colors={["#00A6B6", "#58B9DA"]}
							style={styles.avatar}
						>
							{user.avatar ? (
								<Image
									source={{ uri: user.avatar }}
									style={styles.avatarImage}
								/>
							) : (
								<Text style={styles.avatarText}>{getInitials(user.name)}</Text>
							)}
						</LinearGradient>

						<View style={styles.userInfo}>
							<Text
								style={[
									{
										color: theme.text,
									},
									design.typography.h4 as TextStyle,
								]}
							>
								{user.name}
							</Text>
							<Text
								style={[
									{
										color: theme.muted,
										marginBottom: design.spacing.sm,
									},
									design.typography.body,
								]}
							>
								{user.email}
							</Text>

							<View style={[styles.badge, { backgroundColor: theme.badge }]}>
								<Text
									style={[
										design.typography.caption,
										{ color: theme.badgeText },
									]}
								>
									{user.roleBadge}
								</Text>
							</View>
						</View>
					</View>
				</ShadowCard>

				{/* App Mode */}
				<ShadowCard style={{ rowGap: design.spacing.md }}>
					<Text
						style={[
							{
								color: theme.text,
							},
							design.typography.h4 as TextStyle,
						]}
					>
						App Mode
					</Text>

					<View style={{ rowGap: design.spacing.md }}>
						<View style={styles.grid}>
							<ModeCard
								title={AppMode.MemberMode}
								icon={mdiAccountCircleOutline}
								isActive={appMode === AppMode.MemberMode}
								onPress={handleModeToggle}
							/>
							<ModeCard
								title={AppMode.Management}
								icon={mdiCogOutline}
								isActive={appMode === AppMode.Management}
								onPress={handleModeToggle}
							/>
						</View>
						<View style={styles.grid}>
							<ModeCard
								title={AppMode.SuperAdmin}
								icon={mdiShieldCrownOutline}
								isActive={appMode === AppMode.SuperAdmin}
								onPress={handleModeToggle}
							/>
						</View>
					</View>
				</ShadowCard>

				{/* Settings */}
				<ShadowCard style={{ rowGap: design.spacing.md }}>
					<Text
						style={[
							{
								color: theme.text,
							},
							design.typography.h4 as TextStyle,
						]}
					>
						Settings
					</Text>

					<View style={{ rowGap: design.spacing.xs }}>
						<SettingsItemButton title={"App Settings"} icon={mdiCogOutline} />
						<SettingsItemButton title={"Notifications"} icon={mdiBellOutline} />
						<SettingsItemButton
							title={"Help & Support"}
							icon={mdiHelpCircleOutline}
						/>
					</View>
				</ShadowCard>

				{/* Logout */}
				<TouchableOpacity style={styles.logout} onPress={handleLogout}>
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
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
		rowGap: 24,
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
		backgroundColor: "#FEF2F2",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},

	logoutText: {
		color: "#DC2626",
		fontWeight: "600",
	},
});
