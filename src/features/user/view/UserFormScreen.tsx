import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	Platform,
	FlatList,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useUserForm } from "../hooks/useUserForm";
import TextField from "../../../components/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserStackParamList } from "../../../types/navigation";
import { DatePickerField } from "../../../components/DatePicker";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft, mdiPlus, mdiTrashCanOutline } from "@mdi/js";
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
import { getIn } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomDropdown } from "../../../components/CustomDropdown/CustomDropdown";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;

const genderOptions: DropdownOption<Gender>[] = [
	{ label: Gender.Male, value: Gender.Male },
	{ label: Gender.Female, value: Gender.Female },
];

const UserFormScreen = () => {
	const { dLeaderOptions } = useUserViewModel();
	const navigation = useNavigation();
	const route = useRoute<UserRouteProp>();
	const [dLeaders, setDLeaders] = useState<DropdownOption[]>([]);
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const { id } = route.params || {};
	const {
		formik,
		loading,
		educationFields,
		employmentFields,
		addEducationField,
		removeEducationField,
		addEmploymentField,
		removeEmploymentField,
		updateEducationEndYears,
		updateEmploymentEndYears,
	} = useUserForm({
		userId: id,
	});

	useEffect(() => {
		setDLeaders(dLeaderOptions);
	}, [dLeaderOptions]);

	return (
		<View
			style={[
				styles.container,
				{ paddingTop: insets.top, paddingBottom: insets.bottom },
			]}
		>
			<View style={styles.headerRow}>
				<Text style={[styles.title, { color: theme.text }]}>
					Add New Record
				</Text>
				<MdiIcon
					path={mdiArrowLeft}
					size={24}
					color="#323232"
					onPress={navigation.goBack}
				/>
				<View style={styles.placeholder} />
			</View>

			<KeyboardAwareScrollView
				enableOnAndroid
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={[
					styles.fieldsContainer,
					{ backgroundColor: theme.background, borderColor: theme.gray[200] },
				]}
			>
				{/* Basic Information Fields */}
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
						<CustomDropdown
							data={["Option 1", "Option 2", "Option 3"]}
							onSelect={(value) => console.log("Selected:", value)}
						/>
					</View>
					{/* <DropdownPickerField
						name={"leaderId"}
						placeholder="Select DGroup Leader"
						label="DGroup Leader"
						searchable
						valueField={formik.values.leaderId}
						error={formik.errors.leaderId}
						touched={formik.touched.leaderId}
						onChange={formik.setFieldValue}
						options={dLeaders}
						labelField={""}
					/> */}
					<Title title={"Contact Information"} />
					<TextField
						placeholder="XXX-XXX-XXXX"
						label="Contact Number"
						// required
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
						// required
						value={formik.values.email}
						onChangeText={formik.handleChange("email")}
						error={formik.errors.email}
						touched={formik.touched.email}
						name={"email"}
					/>
					<TextField
						placeholder="Enter Facebook Link"
						label="Facebook Link"
						// required
						value={formik.values.facebook}
						onChangeText={formik.handleChange("facebook")}
						error={formik.errors.facebook}
						touched={formik.touched.facebook}
						name={"facebook"}
					/>
					<TextField
						placeholder="Enter Contact Person"
						label="Contact Person in case of emergency"
						// required
						value={formik.values.emergencyPerson}
						onChangeText={formik.handleChange("emergencyPerson")}
						error={formik.errors.emergencyPerson}
						touched={formik.touched.emergencyPerson}
						name={"emergencyPerson"}
					/>
					<TextField
						placeholder="XXX-XXX-XXXX"
						label="Number of Contact Person"
						// required
						inputType={InputType.Phone}
						value={formik.values.emergencyNumber}
						onChangeText={(text) =>
							formik.setFieldValue("emergencyNumber", formatPhoneNumber(text))
						}
						error={formik.errors.emergencyNumber}
						touched={formik.touched.emergencyNumber}
						name={"emergencyNumber"}
					/>
					{/* Education header */}
					{/* <View style={[styles.headerRow, { marginTop: 24 }]}>
						<Title title={"Education"} />
						<Button
							title={"Add Education"}
							onPress={addEducationField}
							style={{
								backgroundColor: theme.background,
								borderWidth: 1,
								borderColor: theme.slate[500],
							}}
							textStyle={{ color: theme.text }}
							icon={<MdiIcon path={mdiPlus} size={24} color={theme.text} />}
						/>
					</View>

					{educationFields && educationFields.length > 0 && (
						<FlatList
							data={educationFields}
							ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
							keyExtractor={(item, index) => item.title || index.toString()}
							renderItem={({ item, index }) => (
								<View style={styles.fieldGap}>
									<View style={[styles.headerRow]}>
										<Title title={`Education ${index + 1}`} />
										<MdiIcon
											path={mdiTrashCanOutline}
											size={24}
											color={theme.text}
											onPress={() => {
												removeEducationField(item.title);
												formik.setFieldValue(item.title, undefined);
											}}
										/>
									</View>
									<TextField
										placeholder="Enter school"
										label="School"
										required
										value={formik.values?.[`${item.title}`]?.["school"] ?? ""}
										onChangeText={formik.handleChange(`${item.title}.school`)}
										error={getIn(formik.errors, `${item.title}.school`) ?? ""}
										touched={getIn(formik.touched, `${item.title}.school`)}
										name={`${item.title}.school`}
									/>
									<TextField
										placeholder="Enter degree/program"
										label="Degree/Program"
										required
										value={formik.values?.[`${item.title}`]?.["degree"] ?? ""}
										onChangeText={formik.handleChange(`${item.title}.degree`)}
										error={formik.errors?.[`${item.title}`]?.["degree"] ?? ""}
										touched={
											formik.touched?.[`${item.title}`]?.["degree"] ?? ""
										}
										name={`${item.title}.degree`}
									/>
									<View style={styles.dualFields}>
										<DropdownPickerField
											name={`${item.title}.startdate`}
											placeholder="Select Start Date"
											label="Start Date"
											required
											containerStyle={{ flex: 1 }}
											dropDownDirection="TOP"
											value={
												formik.values?.[`${item.title}`]?.["startdate"] ?? ""
											}
											error={
												formik.errors?.[`${item.title}`]?.["startdate"] ?? ""
											}
											touched={
												formik.touched?.[`${item.title}`]?.["startdate"] ?? ""
											}
											onChange={(name, value) => {
												formik.setFieldValue(name, value);
												updateEducationEndYears(item.title, value);
											}}
											options={item.startYears ?? []}
										/>
										<DropdownPickerField
											name={`${item.title}.enddate`}
											placeholder="Select End Date"
											label="End Date"
											required
											containerStyle={{ flex: 1 }}
											dropDownDirection="TOP"
											value={
												formik.values?.[`${item.title}`]?.["enddate"] ?? ""
											}
											error={
												formik.errors?.[`${item.title}`]?.["enddate"] ?? ""
											}
											touched={
												formik.touched?.[`${item.title}`]?.["enddate"] ?? ""
											}
											onChange={formik.setFieldValue}
											options={item.endYears ?? []}
										/>
									</View>
								</View>
							)}
							ListHeaderComponent={<View style={{ height: 6 }} />}
							ListFooterComponent={<View style={{ height: 16 }} />}
							contentContainerStyle={{ zIndex: 0 }}
						/>
					)} */}

					{/* Employment header */}
					{/* <View style={[styles.headerRow, { marginTop: 24 }]}>
						<Title title={"Work/Occupation"} />
						<Button
							title={"Add Work"}
							onPress={addEmploymentField}
							style={{
								backgroundColor: theme.background,
								borderWidth: 1,
								borderColor: theme.slate[500],
							}}
							textStyle={{ color: theme.text }}
							icon={<MdiIcon path={mdiPlus} size={24} color={theme.text} />}
						/>
					</View>

					{employmentFields && employmentFields.length > 0 && (
						<FlatList
							data={employmentFields}
							ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
							keyExtractor={(item, index) => item.title || index.toString()}
							renderItem={({ item, index }) => (
								<View style={styles.fieldGap}>
									<View style={[styles.headerRow]}>
										<Title title={`Work ${index + 1}`} />
										<MdiIcon
											path={mdiTrashCanOutline}
											size={24}
											color={theme.text}
											onPress={() => {
												removeEmploymentField(item.title);
												formik.setFieldValue(item.title, undefined);
											}}
										/>
									</View>
									<TextField
										placeholder="Enter Company/Organization"
										label="Company/Organization"
										required
										value={formik.values?.[`${item.title}`]?.["company"] ?? ""}
										onChangeText={formik.handleChange(`${item.title}.company`)}
										error={getIn(formik.errors, `${item.title}.company`) ?? ""}
										touched={getIn(formik.touched, `${item.title}.company`)}
										name={`${item.title}.company`}
									/>
									<TextField
										placeholder="Enter Title/Position"
										label="Title/Position"
										required
										value={formik.values?.[`${item.title}`]?.["position"] ?? ""}
										onChangeText={formik.handleChange(`${item.title}.position`)}
										error={formik.errors?.[`${item.title}`]?.["position"] ?? ""}
										touched={
											formik.touched?.[`${item.title}`]?.["position"] ?? ""
										}
										name={`${item.title}.position`}
									/>
									<View style={styles.dualFields}>
										<DropdownPickerField
											name={`${item.title}.startdate`}
											placeholder="Select Start Date"
											label="Start Date"
											required
											containerStyle={{ flex: 1 }}
											dropDownDirection="TOP"
											value={
												formik.values?.[`${item.title}`]?.["startdate"] ?? ""
											}
											error={
												formik.errors?.[`${item.title}`]?.["startdate"] ?? ""
											}
											touched={
												formik.touched?.[`${item.title}`]?.["startdate"] ?? ""
											}
											onChange={(name, value) => {
												formik.setFieldValue(name, value);
												updateEmploymentEndYears(item.title, value);
											}}
											options={item.startYears ?? []}
										/>
										<DropdownPickerField
											name={`${item.title}.enddate`}
											placeholder="Select End Date"
											label="End Date"
											required
											containerStyle={{ flex: 1 }}
											dropDownDirection="TOP"
											value={
												formik.values?.[`${item.title}`]?.["enddate"] ?? ""
											}
											error={
												formik.errors?.[`${item.title}`]?.["enddate"] ?? ""
											}
											touched={
												formik.touched?.[`${item.title}`]?.["enddate"] ?? ""
											}
											onChange={formik.setFieldValue}
											options={item.endYears ?? []}
										/>
									</View>
								</View>
							)}
							ListHeaderComponent={<View style={{ height: 6 }} />}
							ListFooterComponent={<View style={{ height: 16 }} />}
							contentContainerStyle={{ zIndex: 0 }}
						/>
					)} */}
					<Button
						title="Submit"
						style={[styles.saveBtn, { backgroundColor: theme.blue[500] }]}
						onPress={formik.handleSubmit as any}
						disabled={loading}
					/>
				</View>
			</KeyboardAwareScrollView>
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
		marginVertical: 16,
	},
	fieldGap: { rowGap: 8 },
});

export default UserFormScreen;
