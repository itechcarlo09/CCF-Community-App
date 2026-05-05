import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Loading from "../../../component/Loading";
import { useTheme } from "../../../theme/ThemeProvider";
import useLoginForm from "@features/auth/hook/useLoginForm";
import Title from "../components/Title";
import Description from "../components/Description";
import { design } from "@theme/index";
import CCFTextInput from "src/components/CCFTextInput";
import TextLink from "../../../components/TextLink";
import CCFButton from "@components/CCFButton";
import { toast } from "@component/toast/toast";
import GoogleButton from "../components/GoogleButton";

const LoginScreen = () => {
	const { theme } = useTheme();
	const { formik, loading } = useLoginForm();

	if (loading) return <Loading />;

	return (
		<View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
			<View style={{ rowGap: design.spacing["2xl"] }}>
				<View style={{ rowGap: design.spacing.md }}>
					<Title style={styles.title}>CCF Community App</Title>
					<Description style={styles.description}>
						to honor God and make Christ-committed followers who will make
						Christ-committed followers.
					</Description>
				</View>
				<View style={{ rowGap: design.spacing.lg }}>
					<CCFTextInput
						placeholder="Email or Phone Number"
						value={formik.values.email}
						onChangeText={formik.handleChange("email")}
						error={formik.errors.email}
					/>
					<CCFTextInput
						placeholder="Password"
						isPassword
						value={formik.values.password}
						onChangeText={formik.handleChange("password")}
						error={formik.errors.password}
					/>
					<TextLink
						onPress={() =>
							toast.default("Forgot Password feature is not implemented yet.")
						}
						style={styles.forgotPassword}
					>
						Forgot Password?
					</TextLink>
				</View>
				<CCFButton
					title={"Log In"}
					onPress={formik.handleSubmit as any}
					disabled={loading}
				/>
			</View>
			<View style={styles.container}>
				<View style={styles.line} />
				<Text style={styles.text}>or continue with</Text>
				<View style={styles.line} />
			</View>
			<GoogleButton
				onPress={() =>
					toast.default("Google Login feature is not implemented yet.")
				}
			/>
			<TextLink
				onPress={() =>
					toast.default("Account creation will be available soon.")
				}
				style={styles.createAccount}
			>
				Create an account
			</TextLink>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: "center",
		padding: 24,
	},
	title: {
		textAlign: "center",
	},
	description: {
		textAlign: "center",
		fontStyle: "italic",
	},
	forgotPassword: {
		alignSelf: "flex-end",
	},
	dividerContainer: {
		alignSelf: "flex-end",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 24,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: "#E5E7EB",
	},
	text: {
		marginHorizontal: 12,
		fontSize: 14,
		color: "#9CA3AF",
	},
	createAccount: {
		alignSelf: "center",
		marginTop: 32,
	},
});

export default LoginScreen;
