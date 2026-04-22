import React from "react";
import { Pressable, Text } from "react-native";
import { TextLinkProps } from "./TextLink.types";
import { styles } from "./TextLink.styles";
import { useTheme } from "@theme/ThemeProvider";

const TextLink: React.FC<TextLinkProps> = ({ onPress, style, children }) => {
	const { theme } = useTheme();
	return (
		<Pressable onPress={onPress} style={style}>
			{({ pressed }) => (
				<Text
					style={[
						styles.text,
						{ color: theme.primary },
						pressed && styles.pressed,
					]}
				>
					{children}
				</Text>
			)}
		</Pressable>
	);
};

export default TextLink;
