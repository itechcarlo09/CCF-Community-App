import React from "react";
import {
	GestureResponderEvent,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import MdiIcon from "../../../../../component/MdiIcon";
import { mdiPencilOutline, mdiPlus } from "@mdi/js";
import { styles } from "./EducationRO.styles";
import { EducationROProps } from "./EducationRO.types";
import Button from "../../../../../component/Button";

const Educations: React.FC<EducationROProps> = ({ educations }) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={[styles.headerText, { color: theme.text }]}>
					Education
				</Text>
				<Button
					title={"Add Education"}
					icon={<MdiIcon path={mdiPlus} size={24} color="#323232" />}
					iconPosition="left"
					style={{ borderWidth: 1, borderColor: theme.border }}
					textStyle={{ color: theme.text }}
					onPress={function (event: GestureResponderEvent): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</View>
			{educations.length > 0 &&
				educations.map((education, index) => (
					<View key={index} style={styles.detailsContainer}>
						<View style={styles.headerContainer}>
							<Text style={[styles.educationTitleText, { color: theme.text }]}>
								{`Education ${index + 1}`}
							</Text>
							<MdiIcon path={mdiPencilOutline} size={24} color="#323232" />
						</View>
						<View>
							<Text style={[styles.labelText, { color: theme.gray[500] }]}>
								School
							</Text>
							<Text style={[styles.valueText, { color: theme.text }]}>
								{education.school}
							</Text>
						</View>

						<View>
							<Text style={[styles.labelText, { color: theme.gray[500] }]}>
								Degree/Program
							</Text>
							<Text style={[styles.valueText, { color: theme.text }]}>
								{education.degree}
							</Text>
						</View>

						<View style={styles.headerContainer}>
							<View style={{ width: "50%" }}>
								<Text style={[styles.labelText, { color: theme.gray[500] }]}>
									Start Year
								</Text>
								<Text style={[styles.valueText, { color: theme.text }]}>
									{education.startYear}
								</Text>
							</View>

							<View style={{ width: "50%" }}>
								<Text style={[styles.labelText, { color: theme.gray[500] }]}>
									End Year
								</Text>
								<Text style={[styles.valueText, { color: theme.text }]}>
									{education.endYear}
								</Text>
							</View>
						</View>
					</View>
				))}
		</View>
	);
};

export default Educations;
