import "@/styles/globals.scss";

import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "./contexts/toastContext";

const lexend = Lexend({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "WS Despachos",
	description: "WS Comércio Despachos Fluviais",
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PrimeReactProvider value={{ zIndex: { toast: 1000 } }}>
			<ToastProvider>
				<html lang="pt-BR" style={{ scrollBehavior: "smooth" }}>
					<body className={lexend.className} style={{ margin: 0 }}>
						{children}
					</body>
				</html>
			</ToastProvider>
		</PrimeReactProvider>
	);
}
