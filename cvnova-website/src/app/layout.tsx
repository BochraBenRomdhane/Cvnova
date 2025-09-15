import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CVnova - Professional CV & Digital Presence Services",
  description: "Transform your career with professional CV services, personal branding, and custom web/mobile applications. Stand out in competitive markets with CVnova.",
  keywords: "CV, resume, personal branding, web development, mobile apps, digital presence",
  authors: [{ name: "CVnova" }],
  openGraph: {
    title: "CVnova - Professional CV & Digital Presence Services",
    description: "Transform your career with professional CV services and digital solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
