"use client";
import { useContext, useRef } from "react";
import { ToastContext } from "../contexts/toastContext";
import { Toast } from "primereact/toast";

type ToastType = "success" | "error" | "info" | "warn";

interface UseToastReturn {
	showToast: (title: string, message: string, type: ToastType, lifetime?: number) => void;
}

export const useToast = (): UseToastReturn => {
	const { setToasts } = useContext(ToastContext);
	const toastRef = useRef<Toast | null>(null);

	const showToast = (title: string, message: string, type: ToastType, lifetime: number = 3000) => {
		const toast = {
			summary: title,
			detail: message,
			severity: type,
			lifetime,
			ref: toastRef
		};

		setToasts([toast]);

		setTimeout(() => {
			setToasts([]);
		}, lifetime);
	};

	return { showToast };
};
