import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextField from "../../../components/TextField";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventStackParamList } from "../../../types/navigation";
import { useEventForm } from "../hooks/userEventForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import MdiIcon from "../../../components/MdiIcon";
import { mdiArrowLeft } from "@mdi/js";
import { ICONSIZE, NOID } from "../../../types/globalTypes";
import Loading from "../../../components/Loading";
import { useTheme } from "../../../theme/ThemeProvider";
import Button from "../../../components/Button";
import Title from "../../components/Title";

type UserRouteProp = RouteProp<EventStackParamList, "EventForm">;
type NavProp = NativeStackNavigationProp<EventStackParamList>;

const EventFormScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { theme } = useTheme();
	const { id, onSuccess } = route.params || {};
	const { formik, loading, event } = useEventForm({
		eventId: id ? id : NOID,
		onSuccess: () => {
			if (onSuccess) {
				onSuccess();
			}
			navigation.goBack();
		},
	});

	return (
		<SafeAreaView style={[styles.container]}>
			<View style={styles.headerRow}>
				<Text style={[styles.title, { color: theme.text }]}>
					{id ? "Edit Event Record" : "Add Event Record"}
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
						<Title title={"Event Information"} />
						<TextField
							placeholder="Enter Event Name"
							label="Event Name"
							required
							value={formik.values.name}
							onChangeText={formik.handleChange("name")}
							error={formik.errors.name}
							touched={formik.touched.name}
							name={"name"}
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

export default EventFormScreen;
