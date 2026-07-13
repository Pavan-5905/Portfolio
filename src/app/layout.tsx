import type { Metadata, Viewport } from "next";

import { SiteChrome } from "@/components/site-chrome";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pavan Kumar Ketha | Portfolio",
    template: "%s | Pavan Kumar Ketha"
  },
  description:
    "Portfolio for Pavan Kumar Ketha, a developer building efficient applications, AI-backed tools, and practical software systems.",
  authors: [{ name: "Pavan Kumar Ketha" }],
  creator: "Pavan Kumar Ketha",
  metadataBase: new URL("https://pavan-kumar-ketha.dev"),
  openGraph: {
    title: "Pavan Kumar Ketha | Portfolio",
    description:
      "Projects, skills, GitHub activity, certifications, workshops, community service, and contact details.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#03060d",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
