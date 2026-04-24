import React from "react";
import { QRDisplayCard } from "./QRDisplayCard";
import { QRPlaceholderCard } from "./QRPlaceholderCard";

type Props = {
	showQR: boolean;
};

const QRCodeSection: React.FC<Props> = ({ showQR }) => {
	return showQR ? <QRDisplayCard /> : <QRPlaceholderCard />;
};

export default QRCodeSection;
