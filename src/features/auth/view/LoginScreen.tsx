import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppStackParamList } from "../../../types/navigation";
import useLoginForm from "../hook/useLoginForm";

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.oneOf(["Admin"], 'username must be "Admin"')
		.required("Required"),
	password: Yup.string()
		.oneOf(["1234"], 'Input must be "1234"')
		.required("Required"),
});

type Props = {
	navigation: NativeStackNavigationProp<AppStackParamList, "Login">;
};

const LoginScreen = ({ navigation }: Props) => {
	const { formik, loading } = useLoginForm();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
			}}
		>
			<Button title="Login" onPress={formik.handleSubmit as any} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "gray",
		paddingHorizontal: 10,
		width: "80%",
	},
	input: {
		flex: 1,
		paddingVertical: 12,
	},
	toggle: {
		color: "#007BFF",
		paddingLeft: 12,
	},
});

export default LoginScreen;
