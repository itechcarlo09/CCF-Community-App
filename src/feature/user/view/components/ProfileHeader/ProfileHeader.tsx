import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { ProfileHeaderProps } from "./ProfileHeader.types";
import CircularImage from "../../../../../components/CircularImage";
import { styles } from "./ProfileHeader.styles";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	name,
	ministry,
	uri,
	fallbackText,
}) => {
	const { theme } = useTheme();

	return (
		<View style={styles.profileContainer}>
			<CircularImage uri={uri} size={80} fallbackText={fallbackText} />
			<View>
				<Text style={[styles.nameText, { color: theme.text }]}>{name}</Text>
				<Text style={[styles.ministryText, { color: theme.gray[500] }]}>
					{ministry} Ministry
				</Text>
			</View>
		</View>
	);
};

export default ProfileHeader;
