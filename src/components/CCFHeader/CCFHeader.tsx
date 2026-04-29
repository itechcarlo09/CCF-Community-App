// UserListHeader.tsx
import React from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mdiPlus } from "@mdi/js";

import CCFTextInput from "@components/CCFTextInput";
import MDIIcon from "@components/MDIIcon";
import { useTheme } from "@theme/ThemeProvider";
import { design } from "@theme/index";

interface UserListHeaderProps {
	searchText: string;
	onChangeSearch: (text: string) => void;
	onAddPress: () => void;
	style?: ViewStyle;
	placeholder?: string;
}

const CCFHeader: React.FC<UserListHeaderProps> = ({
	searchText,
	onChangeSearch,
	onAddPress,
	style,
	placeholder,
}) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	return (
		<View
			style={[
				{
					paddingTop: insets.top,
					backgroundColor: theme.background,
					borderBottomColor: theme.muted,
					borderBottomWidth: 0.3,
					paddingBottom: design.spacing.md,
					paddingHorizontal: design.spacing.lg,
					flexDirection: "row",
					alignItems: "center",
					columnGap: design.spacing.md,
				},
				style,
			]}
		>
			<CCFTextInput
				placeholder={placeholder}
				isSearch
				value={searchText}
				onChangeText={onChangeSearch}
				containerStyle={{ flex: 1 }}
			/>

			<MDIIcon
				path={mdiPlus}
				size={22}
				color={theme.white}
				onPress={onAddPress}
			/>
		</View>
	);
};

export default CCFHeader;
