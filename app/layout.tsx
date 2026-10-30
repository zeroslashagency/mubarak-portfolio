import type { Metadata, Viewport } from "next";
import { DM_Mono, Geist, Young_Serif } from "next/font/google";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { profile } from "@/lib/content";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: `${profile.name}, ${profile.role}`, template: `%s | ${profile.name}` },
  description: `${profile.name} is a ${profile.role.toLowerCase()} working on ${profile.focus.join(", ")}.`,
};

export const viewport: Viewport = { themeColor: "#fbfbf9" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
