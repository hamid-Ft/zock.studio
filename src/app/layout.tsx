import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import LoadingScreen from '@/components/common/loader';
import { Hind } from 'next/font/google';

const hind = Hind({ subsets: ['latin'], weight: '700', style: 'normal', variable: '--hind-bold' });

const codeBold = localFont({
	src: [
		{
			path: './fonts/CODE_Bold.otf',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--code-bold',
});
const codeLight = localFont({
	src: [
		{
			path: './fonts/CODE_Bold.otf',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--code-light',
});

export const metadata: Metadata = {
	title: 'Zock Studio',
	description: 'Presentation Matters',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={` ${codeLight.className} ${codeBold.className} ${hind.className}`}>
				{/* <LoadingScreen /> */}
				{/* <Cursor /> */}
				{/* <ProgressScroll /> */}
				{children}
			</body>
		</html>
	);
}
