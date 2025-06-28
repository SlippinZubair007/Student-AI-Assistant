import type { Metadata } from "next";
import { Urbanist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConvexClerkProvider from "@/providers/convexClerkProvider";

// Font setup (matching your theme)
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-urbanist",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Flare.AI",
  description: "Student AI Assistant by Flareprep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" className={`${urbanist.variable} ${grotesk.variable} dark`}>
        <body className="antialiased bg-background text-foreground font-urbanist">
          <Navbar />
          <main className="pt-24 flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
