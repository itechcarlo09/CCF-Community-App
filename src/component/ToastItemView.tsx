import { useTheme } from "@theme/ThemeProvider";
import React, { useEffect, useRef } from "react";
import {
	Animated,
	Text,
	StyleSheet,
	PanResponder,
	View,
	Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ICONS: any = {
	success: "✓",
	error: "!",
	default: "i",
};

export const ToastItemView = ({ toast, index, total, remove }: any) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const translateY = useRef(new Animated.Value(-10)).current;
	const opacity = useRef(new Animated.Value(0)).current;
	const translateX = useRef(new Animated.Value(0)).current;

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		Animated.parallel([
			Animated.spring(translateY, {
				toValue: 0,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 180,
				useNativeDriver: true,
			}),
		]).start();

		timeoutRef.current = setTimeout(() => {
			handleRemove();
		}, 4000);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const handleRemove = () => {
		Animated.parallel([
			Animated.timing(opacity, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(translateY, {
				toValue: -10,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start(() => remove(toast.id));
	};

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10,
			onPanResponderMove: (_, g) => translateX.setValue(g.dx),
			onPanResponderRelease: (_, g) => {
				if (Math.abs(g.dx) > 120) {
					Animated.timing(translateX, {
						toValue: g.dx > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
						duration: 180,
						useNativeDriver: true,
					}).start(() => remove(toast.id));
				} else {
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		}),
	).current;

	// 🔥 Overlap / Sonner stacking effect
	const stackOffset = index * 8;
	const scale = 1 - index * 0.04;
	const opacityStack = 1 - index * 0.12;

	const getToastBackground = (type: "success" | "error" | "default") => {
		switch (type) {
			case "success":
				return theme.success.backgroundColor;
			case "error":
				return theme.error.backgroundColor;
			case "default":
			default:
				return theme.default.backgroundColor;
		}
	};

	const getToastBorder = (type: "success" | "error" | "default") => {
		switch (type) {
			case "success":
				return theme.success.borderColor;
			case "error":
				return theme.error.borderColor;
			case "default":
			default:
				return theme.default.borderColor;
		}
	};

	const getToastText = (type: "success" | "error" | "default") => {
		switch (type) {
			case "success":
				return theme.success.textColor;
			case "error":
				return theme.error.textColor;
			case "default":
			default:
				return theme.default.textColor;
		}
	};

	const getToastIconBackground = (type: "success" | "error" | "default") => {
		switch (type) {
			case "success":
				return "rgba(34,197,94,0.15)";
			case "error":
				return "rgba(239,68,68,0.15)";
			case "default":
			default:
				return "rgba(100,116,139,0.15)";
		}
	};

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[
				styles.toast,
				{
					backgroundColor: getToastBackground(toast.type),
					borderColor: getToastBorder(toast.type),
					marginTop: insets.top + 10,
					zIndex: total - index,
					opacity: Animated.multiply(opacity, opacityStack),
					transform: [
						{ translateY },
						{ translateX },
						{ translateY: stackOffset },
						{ scale },
					],
				},
			]}
		>
			<View style={styles.inner}>
				<View
					style={[
						styles.iconWrap,
						{ backgroundColor: getToastIconBackground(toast.type) },
					]}
				>
					<Text style={[styles.icon, { color: getToastText(toast.type) }]}>
						{ICONS[toast.type]}
					</Text>
				</View>

				<Text style={[styles.message, { color: getToastText(toast.type) }]}>
					{toast.message}
				</Text>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	toast: {
		position: "absolute",
		width: "92%",
		backgroundColor: "#111",
		borderRadius: 14,

		paddingVertical: 12,
		paddingHorizontal: 14,

		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },

		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.06)",
	},

	inner: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	iconWrap: {
		width: 26,
		height: 26,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	icon: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 14,
	},

	message: {
		color: "#fff",
		fontSize: 13,
		fontWeight: "500",
		flexShrink: 1,
	},
});
