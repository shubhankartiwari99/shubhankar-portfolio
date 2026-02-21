import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubhankar Tiwari | Software Engineer - Backend Systems & Applied AI",
  description:
    "Software Engineer at Bank of America building production fintech systems. Kaggle Notebooks Expert. Exploring applied AI and distributed systems.",
  metadataBase: new URL("https://shubhankartiwari.vercel.app"),
  openGraph: {
    title: "Shubhankar Tiwari - Systems Engineer",
    description:
      "Backend systems engineer at Bank of America. Kaggle Notebooks Expert. Building production-grade fintech infrastructure.",
    url: "https://shubhankartiwari.vercel.app",
    siteName: "Shubhankar Tiwari",
    images: [{ url: "/og_final.png", width: 1200, height: 630, alt: "Shubhankar Tiwari" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhankar Tiwari",
    description: "Backend systems engineer. Kaggle Expert. Applied AI.",
    images: ["/og_final.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
