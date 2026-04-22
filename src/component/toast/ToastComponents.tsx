import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const ToastComponent = ({ toast }: any) => {
	const translateY = useRef(new Animated.Value(100)).current; // start below screen

	useEffect(() => {
		if (toast.visible) {
			Animated.timing(translateY, {
				toValue: -50, // move up into view
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(translateY, {
				toValue: 100, // move down (hide)
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [toast.visible]);

	const backgroundColor = toast.type === "success" ? "#4CAF50" : "#F44336";

	return (
		<Animated.View
			style={[
				styles.container,
				{ transform: [{ translateY }], backgroundColor },
			]}
		>
			<Text style={styles.text}>{toast.message}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0, // 👈 move to bottom
		width: width * 0.9,
		alignSelf: "center",
		padding: 16,
		borderRadius: 10,
		elevation: 5,
	},
	text: {
		color: "#fff",
		fontWeight: "600",
	},
});
