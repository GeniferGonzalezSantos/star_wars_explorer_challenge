import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const OrbitronSans = Orbitron({
  variable: "--font-Orbitron-sans",
  subsets: ["latin"],
});

// const OrbitronMono = Orbitron_Mono({
//   variable: "--font-Orbitron-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "STAR WARS EXPLORER",
  description: "Find your favorite characters and planets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${OrbitronSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
