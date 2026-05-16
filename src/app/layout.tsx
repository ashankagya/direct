import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteGuard from "@/components/RouteGuard";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIRECT | No-Chat Dating",
  description: "A mobile-first, no-chat dating application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center justify-start font-sans bg-[#050505] text-white">
        <div className="w-full min-h-screen max-w-md bg-black relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-white/5 flex flex-col overflow-hidden">
          <RouteGuard>
            {children}
          </RouteGuard>
        </div>
      </body>
    </html>
  );
}
