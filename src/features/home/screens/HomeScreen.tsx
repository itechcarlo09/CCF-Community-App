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
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mdiQrcode } from "@mdi/js";
import { useAppMode } from "src/context/app-mode";
import { AppMode } from "@features/profile/components/ModeCard";
import MDIIcon from "@components/MDIIcon";
import QRCodeSection from "../components/QRCode";
import CCFButton from "@components/CCFButton";

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

const HomeScreen = () => {
	const insets = useSafeAreaInsets();
	const { appMode, setAppMode } = useAppMode();
	const { theme } = useTheme();
	const [showQR, setShowQR] = useState(false);

	const members = ["Joshua Analupa", "Aldrin Amurao", "Kristianne Magtangob"];

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
						Hi, Caloy
					</Text>
					<Text
						style={[
							styles.subtitle,
							{ ...(design.typography.body as TextStyle) },
						]}
					>
						Welcome to CCF Tandang Sora!
					</Text>
				</View>
			</LinearGradient>

			{/* Content */}
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
				{/* App Mode */}
				<ShadowCard style={{ rowGap: design.spacing.md }}>
					<View
						style={{ justifyContent: "space-between", flexDirection: "row" }}
					>
						<View style={{ rowGap: design.spacing.xs }}>
							<Text
								style={[
									{
										color: theme.text,
									},
									design.typography.h4 as TextStyle,
								]}
							>
								Carlo Renoria
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
								Your Attendance QR
							</Text>
						</View>
						<MDIIcon
							path={mdiQrcode}
							size={design.spacing.xl}
							color={theme.primary}
						/>
					</View>
					<QRCodeSection showQR={showQR} />
					<View style={{ flexDirection: "row", columnGap: design.spacing.md }}>
						<CCFButton
							title={`${showQR ? "Hide" : "Show"} QR`}
							style={{ flex: 1 }}
							onPress={() => setShowQR((prev) => !prev)}
						/>
						<CCFButton
							title={"Scan QR"}
							variant="outline"
							style={{ flex: 1 }}
							onPress={() => toast.default("Scan QR is not yet implemented.")}
						/>
					</View>
				</ShadowCard>
				<ShadowCard style={{ rowGap: design.spacing.md }}>
					<Text
						style={[
							{
								color: theme.text,
							},
							design.typography.h4 as TextStyle,
						]}
					>
						Upline DGroup
					</Text>
					<View>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.bodyLg as TextStyle,
							]}
						>
							TRIBO UNO
						</Text>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.body as TextStyle,
							]}
						>
							Leader: Paulo Perez & Rina Perez
						</Text>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.body as TextStyle,
							]}
						>
							Next Meeting: May 10, Sunday, 6PM at CCF Commonwealth
						</Text>
					</View>
				</ShadowCard>
				<ShadowCard style={{ rowGap: design.spacing.md }}>
					<Text
						style={[
							{
								color: theme.text,
							},
							design.typography.h4 as TextStyle,
						]}
					>
						Downline DGroup
					</Text>
					<View>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.bodyLg as TextStyle,
							]}
						>
							Overcomers
						</Text>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.body as TextStyle,
							]}
						>
							Next Meeting: May 10, Sunday, 6PM at CCF Commonwealth
						</Text>
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.body as TextStyle,
							]}
						>
							Members:
						</Text>
						{members.length > 0 &&
							members.map((member, index) => (
								<Text
									key={index}
									style={[
										{
											color: theme.text,
											fontStyle: "italic",
										},
										design.typography.bodySm as TextStyle,
									]}
								>
									{member}
								</Text>
							))}
					</View>
				</ShadowCard>
			</View>
		</ScrollView>
	);
};

export default HomeScreen;

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
});
