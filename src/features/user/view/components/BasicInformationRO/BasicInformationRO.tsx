import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { BasicInformationROProps } from "./BasicInformationRO.types";
import MdiIcon from "../../../../../components/MdiIcon";
import { mdiPencilOutline } from "@mdi/js";
import { styles } from "./BasicInformationRO.styles";

const BasicInformation: React.FC<BasicInformationROProps> = ({
	firstName,
	middleName,
	lastName,
	birthDay,
	age,
	gender,
	dLeaderFullName,
	onPress,
}) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={[styles.headerText, { color: theme.text }]}>
					Basic Information
				</Text>
				<MdiIcon
					onPress={onPress}
					path={mdiPencilOutline}
					size={24}
					color="#323232"
				/>
			</View>
			<View style={styles.detailsContainer}>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						First Name
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{firstName}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Middle Name
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{middleName ?? "N/A"}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Last Name
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{lastName}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Birthday
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{birthDay}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Age
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>{age}</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Gender
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{gender}
					</Text>
				</View>
				<View>
					<Text style={[styles.labelText, { color: theme.gray[500] }]}>
						Dgroup Leader
					</Text>
					<Text style={[styles.valueText, { color: theme.text }]}>
						{dLeaderFullName ?? "N/A"}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default BasicInformation;
