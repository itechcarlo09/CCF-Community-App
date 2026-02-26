import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>🎉 Welcome to the Screen!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	text: { fontSize: 18, fontWeight: "bold", color: "#333" },
});

export default HomeScreen;
