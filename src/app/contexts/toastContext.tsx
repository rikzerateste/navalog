"use client";
import { Toast } from "primereact/toast";
import { createContext, useEffect, useState } from "react";

type ToastType = "success" | "error" | "info" | "warn";

type CustomToast = {
	summary: string;
	detail: string;
	severity: ToastType;
	lifetime: number;
	ref: React.RefObject<Toast | null>;
};

export const ToastContext = createContext({
	toasts: [] as CustomToast[],
	setToasts: (toasts: CustomToast[]) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [toasts, setToasts] = useState<CustomToast[]>([]);

	useEffect(() => {
		toasts.forEach(({ ref, summary, detail, severity }) => {
			ref.current?.show({ summary, detail, severity });
		});
	}, [toasts]);

	return (
		<ToastContext.Provider value={{ toasts, setToasts }}>
			{children}

			{toasts.map((toast, index) => (
				<Toast key={index} ref={toast.ref} />
			))}
		</ToastContext.Provider>
	);
};
