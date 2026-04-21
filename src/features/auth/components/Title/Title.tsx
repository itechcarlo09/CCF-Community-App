import { useTheme } from "@theme/ThemeProvider";
import { Text } from "react-native";
import { TitleProps } from ".";
import { styles } from "./Title.styles";

const Title: React.FC<TitleProps> = ({
	value = "CCF Community App",
	style,
}) => {
	const { theme } = useTheme();
	return (
		<Text
			style={[
				styles.title,
				{
					color: theme.text,
				},
				style,
			]}
		>
			{value}
		</Text>
	);
};

export default Title;
