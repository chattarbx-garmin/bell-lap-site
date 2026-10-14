import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// One family in two widths: condensed and heavy for headlines, normal width for reading.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bell Lap",
  description: "Bell Lap puts your running week, your sleep and your recovery on your wrist. For Garmin and Apple Watch.",
  metadataBase: new URL("https://belllap-apple.chatterbx.ai"),
  openGraph: {
    title: "Bell Lap",
    description: "Your running week, sleep and recovery, on your wrist.",
    images: ["/assets/promo-poster.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
