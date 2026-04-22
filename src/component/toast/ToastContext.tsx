import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToastContainer } from "./ToastComponents";
import { setToastHandler } from "./toast";

export type ToastType = "success" | "error" | "default";

type ToastItem = {
	id: string;
	message: string;
	type: ToastType;
};

type ToastContextType = {
	show: (message: string, type?: ToastType) => void;
	remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const show = (message: string, type: ToastType = "success") => {
		const id = Date.now().toString();

		setToasts((prev) => [...prev, { id, message, type }]);
	};

	const remove = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	// 🔥 Register global handler
	setToastHandler(show);

	return (
		<ToastContext.Provider value={{ show, remove }}>
			{children}
			<ToastContainer toasts={toasts} remove={remove} />
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used inside ToastProvider");
	return context;
};
