import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useUserForm } from "../hooks/useUserForm";
import TextField from "../../../components/TextField";
import { UserStackParamList } from "../../../types/navigation";
import { DatePickerField } from "../../../components/DatePicker";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import Button from "../../../components/Button";
import Gender from "../../../types/enums/Gender";
import { DropdownOption } from "../../../types/dropdownOption";
import Title from "./components/Title";
import InputType from "../../../types/enums/InputType";
import { formatFullName, formatPhoneNumber } from "../../../utils/stringUtils";
import ChoiceChip from "../../../components/ChoiceChip";
import SelectField from "../../../components/SelectField";
import Loading from "../../../components/Loading";
import topUsers from "../topUsers.json";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICONSIZE } from "../../../types/globalTypes";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const genderOptions: DropdownOption<Gender>[] = [
	{ label: Gender.Male, value: Gender.Male },
	{ label: Gender.Female, value: Gender.Female },
];

const noId = 0;

const UserFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { theme } = useTheme();
	const { id, onSuccess } = route.params || {};
	const { formik, loading, user } = useUserForm({
		userId: id ? id : noId,
		onSuccess: () => {
			if (onSuccess) {
				onSuccess();
			}
			navigation.goBack();
		},
	});
	const email = user?.email || "";
	const topUser = email
		? topUsers.find((topUser) => topUser.email === email)
		: null;

	const setDleadersWhenGenderChanged = (
		field: string,
		value: string | null,
	) => {
		formik.setFieldValue("gender", value);
		formik.setFieldValue(
			"leaderName",
			value === user?.gender
				? user?.dGroupLeader
					? formatFullName(
							user?.dGroupLeader?.firstName,
							user?.dGroupLeader?.lastName,
							user?.dGroupLeader?.middleName,
					  )
					: ""
				: "",
		);
		formik.setFieldValue(
			"dLeaderID",
			value === user?.gender ? user?.dGroupLeader?.id ?? null : null,
		);
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<View style={styles.headerRow}>
				<Text style={[styles.title, { color: theme.text }]}>
					{id ? "Edit User Record" : "Add New Record"}
				</Text>
				<MdiIcon
					path={mdiArrowLeft}
					size={ICONSIZE}
					color="#323232"
					onPress={navigation.goBack}
				/>
				<View style={{ width: ICONSIZE }} />
			</View>
			{loading ? (
				<Loading />
			) : (
				<KeyboardAwareScrollView
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
						<DatePickerField
							name="birthdate"
							label="Birthdate"
							required
							value={formik.values.birthdate}
							error={formik.errors.birthdate}
							touched={formik.touched.birthdate}
							onChange={formik.setFieldValue}
						/>
						<ChoiceChip
							name={"gender"}
							title={"Gender"}
							label="Gender"
							required
							value={formik.values.gender}
							error={formik.errors.gender}
							touched={formik.touched.gender}
							options={genderOptions}
							onChange={
								id ? setDleadersWhenGenderChanged : formik.setFieldValue
							}
						/>
						{!topUser && (
							<SelectField
								label="Discipleship Leader"
								name="leaderName"
								value={formik.values.leaderName}
								error={formik.errors.leaderName}
								onPress={() => {
									if (!formik.values.gender) {
										formik.setFieldError(
											"leaderName",
											"Please select gender first",
										);
										return;
									}
									navigation.navigate("DleaderScreen", {
										id: id ? Number(id) : noId,
										gender:
											formik.values.gender === Gender.Male
												? Gender.Male
												: Gender.Female,
										onSelect: (selectedId: number, fullName: string) => {
											formik.setFieldValue("dLeaderID", selectedId);
											formik.setFieldValue("leaderName", fullName);
										},
									});
								}}
							/>
						)}
					</View>
					<View style={styles.fieldGap}>
						<Title title={"Contact Information"} />
						<TextField
							placeholder="XXX-XXX-XXXX"
							label="Contact Number"
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
							value={formik.values.facebook}
							onChangeText={formik.handleChange("facebook")}
							error={formik.errors.facebook}
							touched={formik.touched.facebook}
							name={"facebook"}
						/>
						<TextField
							placeholder="Enter Contact Person"
							label="Contact Person in case of emergency"
							value={formik.values.emergencyPerson}
							onChangeText={formik.handleChange("emergencyPerson")}
							error={formik.errors.emergencyPerson}
							touched={formik.touched.emergencyPerson}
							name={"emergencyPerson"}
						/>
						<TextField
							placeholder="XXX-XXX-XXXX"
							label="Number of Contact Person"
							inputType={InputType.Phone}
							value={formik.values.emergencyNumber}
							onChangeText={(text) =>
								formik.setFieldValue("emergencyNumber", formatPhoneNumber(text))
							}
							error={formik.errors.emergencyNumber}
							touched={formik.touched.emergencyNumber}
							name={"emergencyNumber"}
						/>
					</View>
				</KeyboardAwareScrollView>
			)}
			<Button
				title="Submit"
				style={{ backgroundColor: theme.blue[500] }}
				onPress={formik.handleSubmit as any}
				disabled={loading}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		rowGap: 17,
		paddingVertical: 12,
	},
	fieldsContainer: {
		borderRadius: 6,
		paddingHorizontal: 16,
		rowGap: 32,
	},
	text: { fontSize: 18, fontWeight: "bold" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
		width: 24,
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
	fieldGap: { rowGap: 8 },
});

export default UserFormScreen;
