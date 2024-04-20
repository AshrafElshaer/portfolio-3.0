import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";


import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Ashraf Elshaer",
    template: "%s · Ashraf Elshaer",
  },
  description:
    "Software Engineer, Full Stack Developer, and Open Source Contributor.",
  icons: {
    apple: "/favicon.svg",
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  keywords: [
    "Ashraf Elshaer",
    "Software Engineer",
    "Full Stack Developer",
    "Front-end Developer",
    "Frontend",
    "Developer",
    "Software",
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Server Components",
  ],
  // openGraph: {
  //   images: [
  //     {
  //       width: 1920,
  //       height: 1080,
  //       url: "/open-graphs/og-luxe-website.png",
  //       alt: "Luxe website cover",
  //     },
  //   ],
  //   locale: "en",
  //   siteName: "Ashraf Elshaer",
  //   title: "Ashraf Elshaer",
  //   description:
  //     "Software Engineer, Full Stack Developer, and Open Source Contributor.",
  //   type: "website",
  //   url: "https://ashrafelshaer.com",
  // },

  twitter: {
    // images: [
    //   {
    //     width: 1920,
    //     height: 1080,
    //     url: "/open-graphs/og-luxe-website.png",
    //     alt: "Luxe website cover",
    //   },
    // ],
    card: "summary_large_image",
    title: "Ashraf Elshaer",
    description:
      "Software Engineer, Full Stack Developer, and Open Source Contributor.",
    site: "@ashrafelshaer",
    creator: "@ashrafelshaer",
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
        className={cn(
          "font-sans antialiased outline-none bg-background text-foreground overflow-x-hidden",
          GeistSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
