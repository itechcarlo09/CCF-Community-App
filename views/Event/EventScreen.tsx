import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

const EventScreen = ({ navigation }: any) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>🎉 Welcome to the Event Screen!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	text: { fontSize: 18, fontWeight: "bold" },
});

export default EventScreen;
