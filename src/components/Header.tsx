import React, { useState } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
} from "react-native";
import MdiIcon from "@components/MdiIcon";
import { mdiArrowLeft, mdiMagnify, mdiPlus } from "@mdi/js";

interface Props {
	title?: string;
	placeholder?: string;
	onSearch?: (text: string) => void;
	onBack?: () => void;
	onAdd?: () => void;
}

const Header: React.FC<Props> = ({
	placeholder = "Search record...",
	title,
	onSearch,
	onBack,
	onAdd,
}) => {
	const [searchText, setSearchText] = useState("");

	const handleChange = (text: string) => {
		setSearchText(text);
		onSearch && onSearch(text);
	};

	return (
		<View>
			{/* Top bar */}
			<View style={styles.container}>
				{title ? (
					<>
						{/* Left: Back Button placeholder */}
						<View style={styles.sideButton}>
							{onBack && (
								<TouchableOpacity onPress={onBack} hitSlop={10}>
									<MdiIcon path={mdiArrowLeft} size={24} color="#111827" />
								</TouchableOpacity>
							)}
						</View>

						{/* Center: Title */}
						<View style={styles.center}>
							<Text numberOfLines={1} style={styles.title}>
								{title}
							</Text>
						</View>

						{/* Right: Add Button placeholder */}
						<View style={styles.sideButton}>
							{onAdd && (
								<TouchableOpacity onPress={onAdd} hitSlop={10}>
									<MdiIcon path={mdiPlus} size={24} color="#4f46e5" />
								</TouchableOpacity>
							)}
						</View>
					</>
				) : (
					<>
						{onBack && (
							<TouchableOpacity
								style={styles.sideButton}
								onPress={onBack}
								hitSlop={10}
							>
								<MdiIcon path={mdiArrowLeft} size={24} color="#111827" />
							</TouchableOpacity>
						)}
						<View style={styles.searchCard}>
							<MdiIcon path={mdiMagnify} size={20} color="#9CA3AF" />
							<TextInput
								style={styles.input}
								placeholder={placeholder}
								placeholderTextColor="#9CA3AF"
								value={searchText}
								onChangeText={handleChange}
							/>
						</View>
						{onAdd && (
							<TouchableOpacity
								style={styles.sideButton}
								onPress={onAdd}
								hitSlop={10}
							>
								<MdiIcon path={mdiPlus} size={24} color="#4f46e5" />
							</TouchableOpacity>
						)}
					</>
				)}
			</View>

			{/* Optional Search below title */}
			{title && onSearch && (
				<View style={styles.searchMainCard}>
					<MdiIcon path={mdiMagnify} size={20} color="#9CA3AF" />
					<TextInput
						style={styles.input}
						placeholder={placeholder}
						placeholderTextColor="#9CA3AF"
						value={searchText}
						onChangeText={handleChange}
					/>
				</View>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		padding: 12,
		flexDirection: "row",
		backgroundColor: "#F9FAFB",
		alignItems: "center",
	},

	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	sideButton: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
	},

	searchCard: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 48,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},

	searchMainCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 12,
		marginHorizontal: 12,
		marginBottom: 12,
		height: 48,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},

	input: {
		flex: 1,
		marginLeft: 8,
		fontSize: 14,
		color: "#111827",
	},
});
