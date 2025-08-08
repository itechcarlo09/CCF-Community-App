import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUserForm } from "../hooks/useUserForm";
import TextField from "../../../components/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserStackParamList } from "../../../types/navigation";
import { DatePickerField } from "../../../components/DatePicker";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import DropDownPicker from "react-native-dropdown-picker";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;

const UserFormScreen = () => {
	const route = useRoute<UserRouteProp>();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("Male");
	const [items, setItems] = useState([
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	]);
	const { id } = route.params || {};
	const { formik, loading } = useUserForm({ userId: id });

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.headerRow}>
				<MdiIcon path={mdiArrowLeft} size={24} color="#323232" />
				<Text style={[styles.title, { color: theme.text }]}>
					Add New Record
				</Text>
				<View style={styles.placeholder} />
			</View>
			<View
				style={[
					styles.fieldsContainer,
					{ backgroundColor: theme.background, borderColor: theme.gray[200] },
				]}
			>
				<Text style={[styles.subTitle, { color: theme.text }]}>
					Basic Information
				</Text>
				<TextField
					placeholder="Enter First Name"
					label="First Name"
					required={true}
					value={formik.values.firstName}
					onChangeText={formik.handleChange("firstName")}
					error={formik.errors.firstName}
					touched={formik.touched.firstName}
					name={"firstName"}
				/>
				<TextField
					placeholder="Enter Middle Name"
					label="Middle Name"
					value={formik.values.middleName}
					onChangeText={formik.handleChange("middleName")}
					error={formik.errors.middleName}
					touched={formik.touched.middleName}
					name={"middleName"}
				/>
				<TextField
					placeholder="Enter Last Name"
					label="Last Name"
					required={true}
					value={formik.values.lastName}
					onChangeText={formik.handleChange("lastName")}
					error={formik.errors.lastName}
					touched={formik.touched.lastName}
					name={"lastName"}
				/>
				<View style={styles.dualFields}>
					<DatePickerField
						name="birthdate"
						label="Birthdate"
						required={true}
						value={formik.values.birthdate}
						error={formik.errors.birthdate}
						touched={formik.touched.birthdate}
						onChange={formik.setFieldValue}
					/>
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
							zIndex: 1,
							width: 164,
						}}
						dropDownContainerStyle={{
							zIndex: 1,
							borderColor: theme.gray[200],
							borderWidth: 2,
						}}
					/>
				</View>
				<Button
					title={"Submit"}
					onPress={formik.handleSubmit as any}
					disabled={loading}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16, rowGap: 17 },
	fieldsContainer: { borderRadius: 6, padding: 24, rowGap: 8 },
	text: { fontSize: 18, fontWeight: "bold" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between", // or 'center' with absolute-positioned icon
		height: 32,
	},
	icon: {
		width: 16,
	},
	title: {
		position: "absolute",
		left: 0,
		right: 0,
		textAlign: "center",
		fontSize: 20,
		lineHeight: 32,
		fontWeight: 600,
	},
	subTitle: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 600,
	},
	placeholder: {
		width: 24, // Same width as the icon to keep center alignment
	},
	dualFields: {
		columnGap: 12,
		flexDirection: "row",
	},
	dropdown: {
		minHeight: 40,
		borderRadius: 6,
		borderStartStartRadius: 0,
		borderStartEndRadius: 0,
	},
});

export default UserFormScreen;
