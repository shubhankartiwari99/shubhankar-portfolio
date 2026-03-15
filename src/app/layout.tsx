import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubhankar Tiwari | Software Engineer - Backend Systems & Applied AI",
  description:
    "Software Engineer at Bank of America building production fintech systems. Kaggle Notebooks Expert (#2,441). Researching LLM behavioral reliability and evaluation infrastructure.",
  metadataBase: new URL("https://shubhankar-tiwari.vercel.app"),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Shubhankar Tiwari - Systems Engineer",
    description:
      "Backend systems engineer at Bank of America. Kaggle Notebooks Expert (#2,441). Researching LLM behavioral reliability evaluation.",
    url: "https://shubhankar-tiwari.vercel.app",
    siteName: "Shubhankar Tiwari",
    images: [{ url: "https://shubhankar-tiwari.vercel.app/og_final.png", width: 1200, height: 630, alt: "Shubhankar Tiwari" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhankar Tiwari",
    description: "Backend systems engineer. Kaggle Expert. Applied AI.",
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
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SRM Institute of Science and Technology",
  },
  knowsAbout: [
    "Java", "Spring Boot", "Microservices", "REST APIs", "OpenShift",
    "CI/CD", "Python", "SQL", "Machine Learning", "Deep Learning",
    "LLM Evaluation", "Behavioral Consistency", "Monte Carlo Sampling",
    "HuggingFace Transformers", "ROUGE-L", "Sentence Embeddings",
    "Regression Testing", "Production Incident Triage",
  ],
  description:
    "Software Engineer with 4+ years of experience building production-grade backend systems for enterprise fintech. Kaggle Notebooks Expert (#2,441 / 59,663).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} ${jetbrainsMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
