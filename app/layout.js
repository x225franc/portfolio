import { Inter } from "next/font/google";
import "./globals.css";
import "../src/css/animate.min.css";
import "../src/css/bootstrap.min.css";
import "../src/css/font-awesome.min.css";
import "../src/css/templatemo-style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Diawara Alpha Malick - Developpeur Web",
	description: "Bienvenue sur mon portfolio !",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
