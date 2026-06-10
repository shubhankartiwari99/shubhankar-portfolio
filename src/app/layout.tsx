import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Shubhankar Tiwari | Software Engineer · AI Reliability · ML Systems",
  description:
    "Software Engineer at Bank of America. Building AI Reliability, ML Systems, and Enterprise AI Infrastructure. Kaggle Notebooks Expert (#2,441).",
  metadataBase: new URL("https://shubhankar-tiwari.vercel.app"),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Shubhankar Tiwari · Software Engineer · AI Reliability · ML Systems",
    description:
      "Software Engineer at Bank of America. Building AI Reliability, ML Systems, and LLM Evaluation infrastructure.",
    url: "https://shubhankar-tiwari.vercel.app",
    siteName: "Shubhankar Tiwari",
    images: [{ url: "https://shubhankar-tiwari.vercel.app/og_final.png", width: 1200, height: 630, alt: "Shubhankar Tiwari — Software Engineer · AI Reliability · ML Systems" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhankar Tiwari · Software Engineer · Applied AI",
    description: "Software Engineer at Bank of America. Building AI Reliability, ML Systems, and LLM Evaluation infrastructure. Kaggle Expert.",
    images: ["https://shubhankar-tiwari.vercel.app/og_final.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shubhankar Tiwari",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Bank of America",
  },
  url: "https://shubhankar-tiwari.vercel.app",
  sameAs: [
    "https://github.com/shubhankartiwari99",
    "https://www.linkedin.com/in/shubhankar-tiwari-514040165/",
    "https://www.kaggle.com/shubhankartiwari",
    "https://twitter.com/Shubhankar2911",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "SRM Institute of Science and Technology",
    },
    {
      "@type": "EducationalOrganization",
      name: "Columbia University",
      description: "MS in Artificial Intelligence (incoming Fall 2026)",
    },
  ],
  knowsAbout: [
    "Java", "Spring Boot", "Microservices", "REST APIs", "OpenShift",
    "CI/CD", "Python", "SQL", "Machine Learning", "Deep Learning",
    "LLM Evaluation", "AI Reliability", "ML Systems", "AI Infrastructure",
    "Behavioral Consistency", "Monte Carlo Sampling",
    "HuggingFace Transformers", "ROUGE-L", "Sentence Embeddings",
    "Regression Testing", "Production Incident Triage",
  ],
  description:
    "Software Engineer at Bank of America. Incoming MS in Artificial Intelligence at Columbia University (Fall 2026). Building AI Reliability, ML Systems, and Enterprise AI Infrastructure. Kaggle Notebooks Expert (#2,441 / 59,663).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
