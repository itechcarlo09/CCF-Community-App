import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUserForm } from "../hooks/useUserForm";
import TextField from "../../../components/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserStackParamList } from "../../../types/navigation";
import { DatePickerField } from "../../../components/DatePicker";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;

const UserFormScreen = () => {
	const route = useRoute<UserRouteProp>();
	const insets = useSafeAreaInsets();
	const { id } = route.params || {};
	const { formik, loading } = useUserForm({ userId: id });

	return (
		<View style={[styles.flex, { paddingTop: insets.top }]}>
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
			<DatePickerField
				name="birthdate"
				label="Birthdate"
				required={true}
				value={formik.values.birthdate}
				error={formik.errors.birthdate}
				touched={formik.touched.birthdate}
				onChange={formik.setFieldValue}
			/>
			<Button
				title={"Submit"}
				onPress={formik.handleSubmit as any}
				disabled={loading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1, paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UserFormScreen;
