import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import CircularImage from "../../../../../components/CircularImage";
import MdiIcon from "../../../../../components/MdiIcon";
import { mdiPencilOutline } from "@mdi/js";
import { ContactInformationROProps } from "./ContactInformationRO.types";
import { styles } from "./ContactInformationRO.styles";

const ContactInformation: React.FC<ContactInformationROProps> = ({
	contactNumber,
	email,
	facebookLink,
	emergencyName,
	emergencyContact,
}) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<Text style={[styles.headerText, { color: theme.text }]}>
				Contact Information
			</Text>
			<View style={styles.detailsContainer}>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Contact Number
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{contactNumber ? `+63 ${contactNumber}` : "N/A"}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Email Address
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>{email}</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Facebook Link
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{facebookLink ?? "N/A"}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Contact Person in case of emergency
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{emergencyName ?? "N/A"}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Number of Contact Person
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{emergencyContact ? `+63 ${emergencyContact}` : "N/A"}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ContactInformation;
