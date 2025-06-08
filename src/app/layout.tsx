// import "@/styles/globals.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import type { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import { Lexend } from "next/font/google";

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
		<PrimeReactProvider>
			<html lang="pt-BR" style={{ scrollBehavior: "smooth" }}>
				<body className={lexend.className} style={{ margin: 0 }}>
					{children}
				</body>
			</html>
		</PrimeReactProvider>
	);
}
