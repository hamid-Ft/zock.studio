import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const code = localFont({
	src: [
		{
			path: "./fonts/CODE_Bold.otf",
			weight: "800",
			style: "normal",
		},
		{
			path: "./fonts/CODE_Light.otf",
			weight: "200",
			style: "normal",
		},
	],
	variable: "--font-code",
});

export const metadata: Metadata = {
	title: "Zock Studio",
	description: "Presentation Matters",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={code.className}>{children}</body>
		</html>
	);
}
