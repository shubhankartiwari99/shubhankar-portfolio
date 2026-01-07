import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shubhankar Tiwari | Backend Engineer",
  description:
    "Backend Engineer working on FinTech platforms, scalable systems, and production-grade Java services, passionate about Applied AI.",
  openGraph: {
    title: "Shubhankar Tiwari",
    description:
      "Backend Engineer specialized in FinTech, passionate about Applied AI.",
    url: "https://shubhankartiwari.vercel.app",
    siteName: "Shubhankar Tiwari",
    images: [
      {
        url: "/og_final.png",
        width: 1200,
        height: 630,
        alt: "Shubhankar Tiwari — Backend Engineer · FinTech · Applied AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhankar Tiwari",
    description:
      "Backend Engineer specialized in FinTech, passionate about Applied AI.",
    images: ["/og_final.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
