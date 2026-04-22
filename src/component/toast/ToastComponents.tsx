import { ToastItemView } from "@component/ToastItemView";
import React from "react";
import { View, StyleSheet } from "react-native";

export const ToastContainer = ({ toasts, remove }: any) => {
	return (
		<View style={styles.container} pointerEvents="box-none">
			{toasts.map((toast: any, index: number) => (
				<ToastItemView
					key={toast.id}
					toast={toast}
					index={index}
					total={toasts.length}
					remove={remove}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		width: "100%",
		alignItems: "center",
	},
});
