import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUserForm } from "../hooks/useUserForm";
import TextField from "../../../components/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserStackParamList } from "../../../types/navigation";
import { DatePickerField } from "../../../components/DatePicker";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import { DropdownPickerField } from "../../../components/DropdownPicker";
import Button from "../../../components/Button";
import Gender from "../../../types/enums/Gender";
import { DropdownOption } from "../../../types/dropdownOption";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { ScrollView } from "react-native-gesture-handler";
import Title from "./components/Title";
import InputType from "../../../types/enums/InputType";
import { formatPhoneNumber } from "../../../utils/stringUtils";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;

const genderOptions: DropdownOption<Gender>[] = [
	{ label: Gender.Male, value: Gender.Male },
	{ label: Gender.Female, value: Gender.Female },
];

const UserFormScreen = () => {
	const { dLeaderOptions } = useUserViewModel();
	const route = useRoute<UserRouteProp>();
	const [dLeaders, setDLeaders] = useState<DropdownOption[]>([]);
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const { id } = route.params || {};
	const { formik, loading } = useUserForm({ userId: id });

	useEffect(() => {
		setDLeaders(dLeaderOptions);
	}, [dLeaderOptions]);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={insets.top} // adjust if header present
		>
			<View
				style={[
					styles.container,
					{ paddingTop: insets.top, paddingBottom: insets.bottom },
				]}
			>
				<View style={styles.headerRow}>
					<MdiIcon path={mdiArrowLeft} size={24} color="#323232" />
					<Text style={[styles.title, { color: theme.text }]}>
						Add New Record
					</Text>
					<View style={styles.placeholder} />
				</View>

				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={[
						styles.fieldsContainer,
						{
							backgroundColor: theme.background,
							borderColor: theme.gray[200],
						},
					]}
				>
					<View style={styles.fieldGap}>
						<Title title={"Basic Information"} />
						<TextField
							placeholder="Enter First Name"
							label="First Name"
							required
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
							required
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
								required
								value={formik.values.birthdate}
								error={formik.errors.birthdate}
								touched={formik.touched.birthdate}
								onChange={formik.setFieldValue}
							/>
							<DropdownPickerField
								name={"gender"}
								label="Gender"
								placeholder="Gender"
								containerStyle={styles.genderContainer}
								required
								value={formik.values.gender}
								error={formik.errors.gender}
								touched={formik.touched.gender}
								onChange={formik.setFieldValue}
								options={genderOptions}
							/>
						</View>
						<DropdownPickerField
							name={"leaderId"}
							placeholder="Select DGroup Leader"
							label="DGroup Leader"
							required
							searchable
							value={formik.values.leaderId}
							error={formik.errors.leaderId}
							touched={formik.touched.leaderId}
							onChange={formik.setFieldValue}
							options={dLeaders}
						/>
						<Title title={"Contact Information"} />
						<TextField
							placeholder="XXX-XXX-XXXX"
							label="Contact Number"
							required
							inputType={InputType.Phone}
							value={formik.values.contactNumber}
							onChangeText={(text) =>
								formik.setFieldValue("contactNumber", formatPhoneNumber(text))
							}
							error={formik.errors.contactNumber}
							touched={formik.touched.contactNumber}
							name={"contactNumber"}
						/>
						<TextField
							placeholder="Enter Email"
							label="Email"
							required
							value={formik.values.email}
							onChangeText={formik.handleChange("email")}
							error={formik.errors.email}
							touched={formik.touched.email}
							name={"email"}
						/>
						<TextField
							placeholder="Enter Facebook Link"
							label="Facebook Link"
							required
							value={formik.values.facebook}
							onChangeText={formik.handleChange("facebook")}
							error={formik.errors.facebook}
							touched={formik.touched.facebook}
							name={"facebook"}
						/>
						<TextField
							placeholder="Enter Contact Person"
							label="Contact Person in case of emergency"
							required
							value={formik.values.emergencyPerson}
							onChangeText={formik.handleChange("emergencyPerson")}
							error={formik.errors.emergencyPerson}
							touched={formik.touched.emergencyPerson}
							name={"emergencyPerson"}
						/>
						<TextField
							placeholder="XXX-XXX-XXXX"
							label="Number of Contact Person"
							required
							inputType={InputType.Phone}
							value={formik.values.emergencyNumber}
							onChangeText={(text) =>
								formik.setFieldValue("emergencyNumber", formatPhoneNumber(text))
							}
							error={formik.errors.emergencyNumber}
							touched={formik.touched.emergencyNumber}
							name={"emergencyNumber"}
						/>
						<Button
							title="Submit"
							style={[styles.saveBtn, { backgroundColor: theme.blue[500] }]}
							onPress={formik.handleSubmit as any}
							disabled={loading}
						/>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
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
	genderContainer: {
		width: 130,
		zIndex: 1000,
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
	saveBtn: {
		marginTop: 16,
	},
	fieldGap: { rowGap: 8 },
});

export default UserFormScreen;
