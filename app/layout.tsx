import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const merr = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Headlesshost Knowledgebase",
  description: "Headless CMS driven knowledgebase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merr.variable} font-sans`}>{children}</body>
    </html>
  );
}
