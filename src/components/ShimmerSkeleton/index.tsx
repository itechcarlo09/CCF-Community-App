import React from "react";
import {
	View,
	StyleSheet,
	ViewProps,
	Falsy,
	RecursiveArray,
	RegisteredStyle,
	ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { getBackgroundColor, adjustColor } from "../../utils/colorUtils";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export const ShimmerSkeleton: React.FC<ViewProps> = ({ style }) => {
	const translateX = useSharedValue(-150);
	const baseColor = getBackgroundColor(style);
	const highlightColor = adjustColor(baseColor, 20);

	React.useEffect(() => {
		translateX.value = withRepeat(
			withTiming(150, {
				duration: 1200,
				easing: Easing.linear,
			}),
			-1,
			false,
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<View style={[styles.container, style]}>
			<AnimatedGradient
				colors={[baseColor, highlightColor, baseColor]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={[styles.gradient, animatedStyle]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E1E9EE",
		overflow: "hidden",
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
		width: "200%", // 👈 important
	},
});
