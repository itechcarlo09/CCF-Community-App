import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { AppStackParamList } from "../src/types/navigation";

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
	const handleLogin = () => {
		console.log("Login successful");
		navigation.navigate("BottomNavigator"); // Replace Login with Home screen
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
			}}
		>
			<Formik
				initialValues={{ username: "", password: "" }}
				validationSchema={LoginSchema}
				onSubmit={handleLogin}
			>
				{({ handleSubmit }) => (
					<View style={styles.container}>
						<TextField
							name="username"
							label="Username"
							placeholder="Username"
						/>
						<TextField
							name="password"
							label="Password"
							placeholder="Password"
							secureTextEntry={true}
						/>
						<Button title="Login" onPress={() => handleSubmit()} />
					</View>
				)}
			</Formik>
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
