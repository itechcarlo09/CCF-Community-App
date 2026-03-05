import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	LayoutChangeEvent,
	Animated,
} from "react-native";

interface SlidingTabsProps {
	tabs: string[];
	onChange?: (index: number) => void;
	initialIndex?: number;
}

export const SlidingTabs: React.FC<SlidingTabsProps> = ({
	tabs,
	onChange,
	initialIndex = 0,
}) => {
	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const [containerWidth, setContainerWidth] = useState(0);

	const translateX = useRef(new Animated.Value(0)).current;

	const HORIZONTAL_PADDING = 4;

	const usableWidth = containerWidth - HORIZONTAL_PADDING * 2;
	const tabWidth = usableWidth / tabs.length;

	useEffect(() => {
		if (!containerWidth) return;

		Animated.spring(translateX, {
			toValue: activeIndex * tabWidth,
			useNativeDriver: true,
		}).start();
	}, [activeIndex, containerWidth]);

	const onLayout = (event: LayoutChangeEvent) => {
		setContainerWidth(event.nativeEvent.layout.width);
	};

	const handlePress = (index: number) => {
		setActiveIndex(index);
		onChange?.(index);
	};

	return (
		<View>
			<View
				style={[styles.container, { padding: HORIZONTAL_PADDING }]}
				onLayout={onLayout}
			>
				{containerWidth > 0 ? (
					<Animated.View
						style={[
							styles.indicator,
							{
								width: tabWidth,
								transform: [{ translateX }],
							},
						]}
					/>
				) : null}

				{tabs.map((tab, index) => {
					const isActive = index === activeIndex;

					return (
						<TouchableOpacity
							key={index}
							style={styles.tab}
							activeOpacity={0.7}
							onPress={() => handlePress(index)}
						>
							<Text
								style={[styles.label, { fontWeight: isActive ? "600" : "400" }]}
							>
								{tab}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#E5E7EB",
		borderRadius: 14,
		position: "relative",
	},
	tab: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	label: {
		fontSize: 16,
		color: "#111827",
	},
	indicator: {
		position: "absolute",
		left: 4,
		top: 4,
		bottom: 4,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		zIndex: 1,
	},
});
