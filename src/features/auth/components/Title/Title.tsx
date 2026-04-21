import { useTheme } from "@theme/ThemeProvider";
import { Text, TextStyle } from "react-native";
import { TitleProps } from ".";
import { design } from "@theme/index";

const Title: React.FC<TitleProps> = ({ children, style }) => {
	const { theme } = useTheme();
	return (
		<Text
			style={[
				{
					...(design.typography.h1 as TextStyle),
					color: theme.text,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};

export default Title;
