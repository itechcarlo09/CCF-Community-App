import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import MDIIcon from "@components/MDIIcon";
import { styles } from "./ModeCard.styles";
import { ModeCardProps } from "./ModeCard.types";
import { design } from "@theme/index";

const ModeCard: React.FC<ModeCardProps> = ({
	title,
	icon,
	isActive,
	onPress,
}) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity
			onPress={() => onPress(title)}
			style={[
				styles.card,
				{
					rowGap: design.spacing.sm,
					borderColor: isActive ? theme.active.borderColor : theme.border,
					padding: design.spacing.lg,
				},
				isActive && { backgroundColor: theme.active.backgroundColor },
			]}
		>
			<MDIIcon
				path={icon}
				size={22}
				color={isActive ? theme.active.textColor : theme.muted}
			/>

			<Text
				style={[
					{
						color: isActive ? theme.active.textColor : theme.muted,
					},
					styles.text,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default ModeCard;
