import React, { useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Text,
} from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import UserListItem from "./UserListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MdiIcon from "../../../components/MdiIcon";
import { mdiPlusBoxOutline } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import DropDownPicker from "react-native-dropdown-picker";

const Separator = () => <View style={styles.separator} />;

const UserScreen = ({ navigation }: any) => {
	const { users } = useUserViewModel();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("Asc");
	const [items, setItems] = useState([
		{ label: "Name A to Z", value: "Asc" },
		{ label: "Name Z to A", value: "Desc" },
	]);
	// const [refreshing, setRefreshing] = useState(false);
	// const Refresh = () => (
	// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

	// const onRefresh = useCallback(async () => {
	// 	setRefreshing(true);
	// 	refresh();
	// 	setRefreshing(false);
	// }, []);

	// if (loading) return <Loading />;

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<Text
				style={{
					marginHorizontal: 16,
					color: theme.text,
					fontWeight: "semibold",
					fontSize: 20,
					lineHeight: 32,
					marginBottom: 5,
				}}
			>
				Records
			</Text>
			<View style={[styles.sortContainer, { zIndex: 1 }]}>
				<View style={[styles.sortBox, { backgroundColor: theme.gray[200] }]}>
					<Text style={[styles.sortText, { color: theme.gray[900] }]}>
						Sort
					</Text>
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						style={[
							styles.dropdown,
							{ borderColor: theme.gray[200], borderWidth: 2 },
						]}
						containerStyle={{
							zIndex: 1000,
							width: 164,
						}}
						dropDownContainerStyle={{
							zIndex: 1000,
							borderColor: theme.gray[200],
							borderWidth: 2,
						}}
					/>
				</View>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() =>
						navigation.navigate("UserNavigator", {
							screen: "UserForm",
						})
					}
				>
					<MdiIcon path={mdiPlusBoxOutline} size={18} color={"#323232"} />
				</TouchableOpacity>
			</View>

			{/* Important: zIndex must be lower than the dropdown */}
			<FlatList
				data={users}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<UserListItem
						user={item}
						onPress={(id) =>
							navigation.navigate("UserNavigator", {
								screen: "UserForm",
								params: { id },
							})
						}
					/>
				)}
				ListHeaderComponent={<View style={{ height: 6 }} />}
				ListFooterComponent={<View style={{ height: 16 }} />}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={{ zIndex: 0 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sortContainer: {
		marginBottom: 10,
		marginHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sortBox: {
		height: 40,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	sortText: {
		fontWeight: "600",
		fontSize: 12,
		lineHeight: 16,
		marginRight: 8,
		textAlign: "center",
		width: 76,
	},
	dropdown: {
		minHeight: 40,
		borderRadius: 6,
		borderStartStartRadius: 0,
		borderStartEndRadius: 0,
	},
	addButton: {
		height: 42,
		width: 42,
		justifyContent: "center",
		marginLeft: 10,
	},
	separator: {
		height: 6,
	},
});

export default UserScreen;
