import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import { AppStackParamList } from "../../../types/navigation";
import useLoginForm from "../hook/useLoginForm";
import Loading from "../../../components/Loading";
import TextField from "../../../../components/TextField";
import { useTheme } from "../../../theme/ThemeProvider";

const LoginScreen = () => {
	const { theme } = useTheme();
	const { formik, loading } = useLoginForm();

	if (loading) return <Loading />;

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
			}}
		>
			<TextField
				placeholder="Enter Email"
				value={formik.values.email}
				onChangeText={formik.handleChange("email")}
				error={formik.errors.email}
				touched={formik.touched.email}
				name={"email"}
			/>
			<TextField
				placeholder="Enter Password"
				value={formik.values.password}
				onChangeText={formik.handleChange("password")}
				name={"password"}
				touched={formik.touched.password}
				error={formik.errors.password}
				secureTextEntry={true}
			/>
			<Button
				title={"Submit"}
				color={theme.blue[500]}
				onPress={formik.handleSubmit as any}
				disabled={loading}
			/>
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
