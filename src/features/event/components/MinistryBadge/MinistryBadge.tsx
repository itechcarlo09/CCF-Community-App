import { View, Text } from "react-native";
import { styles } from "./MinistryBadge.styles";
import { useTheme } from "@theme/ThemeProvider";

export default function MinistryBadge({ ministry }: { ministry: string }) {
	const { theme } = useTheme();
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.badge,
					{ backgroundColor: theme.ministry.backgroundColor },
				]}
			>
				<Text style={[styles.text, { color: theme.ministry.textColor }]}>
					{ministry}
				</Text>
			</View>
		</View>
	);
}
