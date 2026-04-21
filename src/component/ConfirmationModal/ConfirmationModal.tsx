import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ConfirmationModal.styles";
import { ConfirmationModalProps } from "./ConfirmationModal.types";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	visible,
	title = "Confirm Action",
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
}) => {
	return (
		<Modal
			transparent
			visible={visible}
			animationType="fade"
			onRequestClose={onCancel}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					{title ? <Text style={styles.title}>{title}</Text> : null}
					<Text style={styles.message}>{message}</Text>

					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onCancel}
						>
							<Text style={styles.cancelText}>{cancelText}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.confirmButton]}
							onPress={onConfirm}
						>
							<Text style={styles.confirmText}>{confirmText}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ConfirmationModal;
