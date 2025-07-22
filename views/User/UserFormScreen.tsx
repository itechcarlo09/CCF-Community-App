import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserSchema = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
});

const UserFormScreen = () => {
	const insets = useSafeAreaInsets();
	const submitUser = () => {
		console.log("User successfully added");
	};

	return (
		<Formik
			initialValues={{ firstName: "" }}
			validationSchema={UserSchema}
			onSubmit={submitUser}
		>
			{({ handleSubmit }) => (
				<View style={[styles.flex, { paddingTop: insets.top }]}>
					<TextField
						name="firstName"
						label="First Name"
						placeholder="Enter First Name"
					/>
					<TextField
						name="middleName"
						label="Middle Name"
						placeholder="Enter Middle Name"
					/>
					<TextField
						name="lastName"
						label="last Name"
						placeholder="Enter Last Name"
					/>
					<Button title="Add User" onPress={() => handleSubmit()} />
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1, paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold" },
});

export default UserFormScreen;
