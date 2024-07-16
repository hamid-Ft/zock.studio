import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const codeBold = localFont({
	src: [
		{
			path: "./fonts/CODE_Bold.otf",
			weight: "800",
			style: "normal",
		},
	],
	variable: "--code-bold",
});
const codeLight = localFont({
	src: [
		{
			path: "./fonts/CODE_Light.otf",
			weight: "200",
			style: "normal",
		},
	],
	variable: "--code-light",
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
			<body className={` ${codeLight.className} ${codeBold.className}`}>
				{children}
			</body>
		</html>
	);
}
