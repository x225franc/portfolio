import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
	title: "Alpha Malick Diawara — Développeur Fullstack",
	description:
		"Portfolio d'Alpha Malick Diawara, développeur fullstack à Paris (PHP, Symfony, React, VueJS, NodeJS). Diplômé d'un Master Ingénierie du Web.",
	openGraph: {
		title: "Alpha Malick Diawara — Développeur Fullstack",
		description: "Développeur fullstack à Paris, ouvert aux opportunités.",
		locale: "fr_FR",
		type: "website",
	},
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
		{ media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
	],
};

// Applies the saved/system theme before paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }) {
	return (
		<html
			lang='fr'
			className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>{children}</body>
		</html>
	);
}
