import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useLoginForm from "../hook/useLoginForm";
import Loading from "../../../component/Loading";
import TextField from "../../../component/TextField";
import { useTheme } from "../../../theme/ThemeProvider";
import Button from "../../../component/Button";

const LoginScreen = () => {
	const { theme } = useTheme();
	const { formik, loading } = useLoginForm();

	if (loading) return <Loading />;

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.signInText}>Sign In</Text>
			<View style={styles.fieldContainer}>
				<TextField
					placeholder="Enter Email"
					label="Email"
					value={formik.values.email}
					onChangeText={formik.handleChange("email")}
					error={formik.errors.email}
					touched={formik.touched.email}
					name={"email"}
				/>
				<TextField
					placeholder="Enter Password"
					label="Password"
					value={formik.values.password}
					onChangeText={formik.handleChange("password")}
					name={"password"}
					touched={formik.touched.password}
					error={formik.errors.password}
					secureTextEntry={true}
				/>
			</View>
			<Button
				title="Login"
				style={{ backgroundColor: theme.blue[500] }}
				onPress={formik.handleSubmit as any}
				disabled={loading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: "center",
		padding: 24,
	},
	fieldContainer: {
		marginVertical: 64,
		rowGap: 16,
	},
	signInText: {
		fontSize: 36,
		fontWeight: "bold",
		fontFamily: "Sans",
		color: "#000",
		textAlign: "center",
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
