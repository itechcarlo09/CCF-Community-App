import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToastComponent } from "./ToastComponents";

export type ToastType = "success" | "error";

type ToastState = {
	visible: boolean;
	message: string;
	type: ToastType;
};

type ToastContextType = {
	show: (message: string, type?: ToastType) => void;
	hide: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toast, setToast] = useState<ToastState>({
		visible: false,
		message: "",
		type: "success",
	});

	const show = (message: string, type: ToastType = "success") => {
		setToast({ visible: true, message, type });

		setTimeout(() => {
			setToast((prev) => ({ ...prev, visible: false }));
		}, 5000);
	};

	const hide = () => {
		setToast((prev) => ({ ...prev, visible: false }));
	};

	return (
		<ToastContext.Provider value={{ show, hide }}>
			{children}
			<ToastComponent toast={toast} />
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used inside ToastProvider");
	return context;
};
