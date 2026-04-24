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
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
	const [appMode, setAppMode] = useState<"member" | "management">("member");
	const { theme } = useTheme();

	const user = {
		name: "John Doe",
		email: "john@example.com",
		avatar: "",
		roleBadge: "Member",
	};

	const handleModeToggle = (mode: "member" | "management") => {
		setAppMode(mode);
		toast.success(`Switched to ${mode}`);
	};

	const handleLogout = () => {
		toast.success("Logged out successfully");
	};

	return (
		<View style={styles.container}>
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
							paddingTop: insets.top,
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
					styles.content,
					{
						paddingHorizontal: design.spacing.xl,
						backgroundColor: theme.background,
					},
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
								style={{
									color: theme.text,
									...(design.typography.h4 as TextStyle),
								}}
							>
								{user.name}
							</Text>
							<Text
								style={{
									color: theme.muted,
									...(design.typography.body as TextStyle),
								}}
							>
								{user.email}
							</Text>

							<View style={styles.badge}>
								<Text style={styles.badgeText}>{user.roleBadge}</Text>
							</View>
						</View>
					</View>
				</ShadowCard>

				{/* App Mode */}
				<ShadowCard>
					<Text style={styles.sectionTitle}>App Mode</Text>

					<View style={styles.grid}>
						{/* Member */}
						<TouchableOpacity
							onPress={() => handleModeToggle("member")}
							style={[
								styles.modeCard,
								appMode === "member" && styles.modeActivePrimary,
							]}
						>
							<Text
								style={[
									styles.modeText,
									appMode === "member" && styles.modeTextPrimary,
								]}
							>
								Member Mode
							</Text>
						</TouchableOpacity>

						{/* Management */}
						<TouchableOpacity
							onPress={() => handleModeToggle("management")}
							style={[
								styles.modeCard,
								appMode === "management" && styles.modeActiveSecondary,
							]}
						>
							<Text
								style={[
									styles.modeText,
									appMode === "management" && styles.modeTextSecondary,
								]}
							>
								Management
							</Text>
						</TouchableOpacity>
					</View>
				</ShadowCard>

				{/* Settings */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Settings</Text>

					<TouchableOpacity style={styles.item}>
						<Text style={styles.itemText}>App Settings</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.item}>
						<Text style={styles.itemText}>Notifications</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.item}>
						<Text style={styles.itemText}>Help & Support</Text>
					</TouchableOpacity>
				</View>

				{/* Logout */}
				<TouchableOpacity style={styles.logout} onPress={handleLogout}>
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
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
		backgroundColor: "#EFF6FF",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 999,
		alignSelf: "flex-start",
	},

	badgeText: {
		color: "#1D4ED8",
		fontSize: 12,
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
		color: "#323232",
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
