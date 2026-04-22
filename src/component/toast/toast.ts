// toast.ts
type ToastType = "success" | "error" | "default";

type ShowFn = (message: string, type?: ToastType) => void;

let showRef: ShowFn | null = null;

export const toast = (message: string) => {
	showRef?.(message, "success");
};

toast.success = (message: string) => {
	showRef?.(message, "success");
};

toast.error = (message: string) => {
	showRef?.(message, "error");
};

toast.default = (message: string) => {
	showRef?.(message, "default");
};

// 🔥 internal (used by provider)
export const setToastHandler = (fn: ShowFn) => {
	showRef = fn;
};
