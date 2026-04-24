import React from "react";
import {
	TouchableOpacity,
	Text,
	View,
	StyleSheet,
	Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@theme/ThemeProvider";
import { styles } from "./SettingsItemButton.styles";
import { SettingsItemButtonProps } from ".";
import MdiIcon from "@component/MdiIcon";
import { mdiChevronRight, mdiCog } from "@mdi/js";

const SettingsItemButton: React.FC<SettingsItemButtonProps> = ({
	title = "App Settings",
	icon,
	onPress,
}) => {
	const { theme } = useTheme();

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				pressed && { backgroundColor: theme.itemPressed },
			]}
		>
			<View style={styles.iconLeft}>
				<MdiIcon path={icon} size={20} color={theme.button} />
			</View>

			<Text style={[styles.label, { color: theme.text }]}>{title}</Text>

			<View style={styles.iconRight}>
				<MdiIcon path={mdiChevronRight} size={20} color={theme.muted} />
			</View>
		</Pressable>
	);
};

export default SettingsItemButton;
