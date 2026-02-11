import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./Providers";
import { SITE_URL } from "@/lib/config";
import enStrings from "@/locales/en.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Default metadata from English locale (app.title / app.description used for OG & Twitter). */
const title = enStrings.app.title;
const description = enStrings.app.description;
/** OG/Twitter image path; must include base path when deployed to GitHub Pages (e.g. /brain-game/images/og-image.png). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const ogImagePath = `${basePath}/images/og-image.png`;
const ogImageAlt = `${enStrings.app.title} — ${enStrings.app.description}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: enStrings.app.title,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  icons: {
    // Favicon from public/favicon.png (basePath applied for GitHub Pages)
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQFLM76JC6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BQFLM76JC6');
          `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
