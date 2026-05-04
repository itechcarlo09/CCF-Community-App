// CCFHeader.tsx
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mdiArrowLeft, mdiPlus } from "@mdi/js";

import CCFTextInput from "@components/CCFTextInput";
import MDIIcon from "@components/MDIIcon";
import { useTheme } from "@theme/ThemeProvider";
import { design } from "@theme/index";

interface CCFHeaderProps {
	// common
	style?: ViewStyle;
	title?: string;

	// back button
	showBack?: boolean;
	onBackPress?: () => void;

	// search mode
	searchText?: string;
	onChangeSearch?: (text: string) => void;
	placeholder?: string;
	enableSearch?: boolean;

	// add button
	showAdd?: boolean;
	onAddPress?: () => void;
}

const CCFHeader: React.FC<CCFHeaderProps> = ({
	style,
	title,

	showBack = false,
	onBackPress,

	searchText = "",
	onChangeSearch,
	placeholder = "Search",
	enableSearch = false,

	showAdd = false,
	onAddPress,
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
			{/* Back */}
			{showBack && (
				<TouchableOpacity onPress={onBackPress}>
					<MDIIcon path={mdiArrowLeft} size={22} color={theme.text} />
				</TouchableOpacity>
			)}

			{/* Search or Title */}
			{enableSearch ? (
				<CCFTextInput
					placeholder={placeholder}
					isSearch
					value={searchText}
					onChangeText={onChangeSearch}
					containerStyle={{ flex: 1 }}
				/>
			) : (
				<View style={{ flex: 1 }}>
					<Text style={[design.typography.h3, { color: theme.text }]}>
						{title}
					</Text>
				</View>
			)}

			{/* Add */}
			{showAdd && (
				<MDIIcon
					path={mdiPlus}
					size={22}
					color={theme.white}
					onPress={onAddPress}
				/>
			)}
		</View>
	);
};

export default CCFHeader;
