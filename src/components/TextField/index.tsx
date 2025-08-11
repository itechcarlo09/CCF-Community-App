import React, { useState } from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	KeyboardTypeOptions,
} from "react-native";
import { TextFieldProps } from "./types";
import { styles } from "./styles";
import { useTheme } from "../../theme/ThemeProvider";
import InputType from "../../types/enums/InputType";

interface Props extends TextFieldProps {
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	error?: string;
	touched?: boolean;
	required?: boolean;
	inputType?: InputType;
	maxLength?: number;
	keyboardType?: KeyboardTypeOptions;
}

const TextField: React.FC<Props> = ({
	label,
	secureTextEntry,
	value,
	onChangeText,
	onBlur,
	error,
	touched,
	required,
	maxLength,
	inputType,
	keyboardType,
	...inputProps
}) => {
	const { theme } = useTheme();
	const [showPassword, setShowPassword] = useState(false);

	const getKeyboardType = () => {
		if (keyboardType) return keyboardType;
		if (inputType === "phone") return "phone-pad";
		if (inputType === "password") return "default";
		return "default";
	};

	const getSecureEntry = () => {
		if (inputType === "password") return true;
		return secureTextEntry || false;
	};

	const getMaxLength = () => {
		if (maxLength) return maxLength;
		if (inputType === "phone") return 12; // PH contact number
		return undefined;
	};

	return (
		<View>
			{label && (
				<Text style={[styles.label, { color: theme.slate[700] }]}>
					{label}
					{required && <Text style={{ color: theme.blue[500] }}> *</Text>}
				</Text>
			)}
			<View
				style={[
					styles.inputContainer,
					{
						borderColor:
							touched && error ? theme.icon.danger.tertiary : theme.slate[500],
					},
					{
						...(inputType === "phone"
							? {
									paddingLeft: 0,
							  }
							: {}),
					},
				]}
			>
				{inputType === "phone" && (
					<View
						style={{
							width: 53,
							borderStartStartRadius: 5,
							borderStartEndRadius: 5,
							borderRightWidth: 1,
							borderColor: theme.gray[400],
							backgroundColor: theme.gray[200],
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={[
								{
									color: theme.slate[900],
									fontSize: 16,
									fontWeight: 400,
								},
							]}
						>
							+63
						</Text>
					</View>
				)}
				<TextInput
					style={[
						styles.input,
						{ color: theme.slate[900] },
						{
							...(inputType === "phone"
								? {
										paddingLeft: 10,
								  }
								: {}),
						},
					]}
					value={value}
					placeholderTextColor={theme.slate[400]}
					onChangeText={onChangeText}
					onBlur={onBlur}
					keyboardType={getKeyboardType()}
					secureTextEntry={getSecureEntry()}
					maxLength={getMaxLength()}
					{...inputProps}
				/>
				{secureTextEntry && (
					<TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
						<Text style={[styles.toggle, { color: theme.blue[500] }]}>
							{showPassword ? "Hide" : "Show"}
						</Text>
					</TouchableOpacity>
				)}
			</View>
			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default React.memo(TextField);
