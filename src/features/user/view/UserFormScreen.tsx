import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUserForm } from "../hooks/useUserForm";
import TextField from "../../../../components/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserStackParamList } from "../../../types/navigation";

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
				value={formik.values.firstName}
				onChangeText={formik.handleChange("firstName")}
				name={"firstName"}
			/>
			<TextField
				placeholder="Enter Middle Name"
				value={formik.values.middleName}
				onChangeText={formik.handleChange("middleName")}
				name={"middleName"}
			/>
			<TextField
				placeholder="Enter Last Name"
				value={formik.values.lastName}
				onChangeText={formik.handleChange("lastName")}
				name={"lastName"}
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
