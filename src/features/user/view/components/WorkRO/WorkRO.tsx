import React from "react";
import {
	GestureResponderEvent,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import MdiIcon from "../../../../../components/MdiIcon";
import { mdiPencilOutline, mdiPlus } from "@mdi/js";
import Button from "../../../../../components/Button";
import { WorkROProps } from "./WorkRO.types";
import { styles } from "./WorkRO.styles";

const Works: React.FC<WorkROProps> = ({ works }) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={[styles.headerText, { color: theme.text }]}>
					Work/Occupation
				</Text>
				<Button
					title={"Add Works"}
					icon={<MdiIcon path={mdiPlus} size={24} color="#323232" />}
					iconPosition="left"
					style={{ borderWidth: 1, borderColor: theme.border }}
					textStyle={{ color: theme.text }}
					onPress={function (event: GestureResponderEvent): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</View>
			{works.length > 0 &&
				works.map((work, index) => (
					<View key={index} style={styles.detailsContainer}>
						<View style={styles.headerContainer}>
							<Text style={[styles.workTitleText, { color: theme.text }]}>
								{`Work ${index + 1}`}
							</Text>
							<MdiIcon path={mdiPencilOutline} size={24} color="#323232" />
						</View>
						<View>
							<Text style={[styles.labelText, { color: theme.gray[500] }]}>
								Title/Position
							</Text>
							<Text style={[styles.valueText, { color: theme.text }]}>
								{work.position}
							</Text>
						</View>

						<View>
							<Text style={[styles.labelText, { color: theme.gray[500] }]}>
								Company/Organization
							</Text>
							<Text style={[styles.valueText, { color: theme.text }]}>
								{work.company}
							</Text>
						</View>

						<View style={styles.headerContainer}>
							<View style={{ width: "50%" }}>
								<Text style={[styles.labelText, { color: theme.gray[500] }]}>
									Start Year
								</Text>
								<Text style={[styles.valueText, { color: theme.text }]}>
									{work.startYear}
								</Text>
							</View>

							<View style={{ width: "50%" }}>
								<Text style={[styles.labelText, { color: theme.gray[500] }]}>
									End Year
								</Text>
								<Text style={[styles.valueText, { color: theme.text }]}>
									{work.endYear}
								</Text>
							</View>
						</View>
					</View>
				))}
		</View>
	);
};

export default Works;
