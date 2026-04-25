import React from "react";
import { Text, TextStyle, View } from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { DGroupDetailProps } from "./DGroupDetail.types";
import { styles } from "./DGroupDetail.styles";
import MDIIcon from "@components/MDIIcon";
import { design } from "@theme/index";

const DGroupDetail: React.FC<DGroupDetailProps> = ({ icon, value, title }) => {
	const { theme } = useTheme();
	return (
		<View style={[styles.container, { columnGap: design.spacing.md }]}>
			<MDIIcon
				path={icon}
				size={18}
				color={theme.muted}
				style={{ alignSelf: "baseline", paddingTop: 2 }}
			/>
			<View style={{ flex: 1, paddingRight: design.spacing.xl }}>
				<Text
					style={[
						{
							color: theme.muted,
						},
						design.typography.body,
					]}
				>
					{title}
				</Text>
				{typeof value === "string" ? (
					<Text
						style={[
							{
								color: theme.text,
							},
							design.typography.body as TextStyle,
						]}
					>
						{value}
					</Text>
				) : (
					value.map((item, index) => (
						<Text
							style={[
								{
									color: theme.text,
								},
								design.typography.body as TextStyle,
							]}
						>
							{item}
						</Text>
					))
				)}
			</View>
		</View>
	);
};

export default DGroupDetail;
