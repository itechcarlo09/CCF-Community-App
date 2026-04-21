import { useTheme } from "@theme/ThemeProvider";
import { Text, TextStyle } from "react-native";
import { DescriptionProps } from ".";
import { design } from "@theme/index";

const Description: React.FC<DescriptionProps> = ({ value, style }) => {
	const { theme } = useTheme();
	return (
		<Text
			style={[
				{
					...(design.typography.body as TextStyle),
					color: theme.text,
				},
				style,
			]}
		>
			{value}
		</Text>
	);
};

export default Description;
