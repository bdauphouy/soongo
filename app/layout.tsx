import type { Metadata } from "next";
import { Parkinsans, Plus_Jakarta_Sans } from "next/font/google";
import { BookingWidget } from "@/modules/booking/components/booking-widget";
import { Header } from "./_components/header";
import { CtaBand } from "./_components/cta-band";
import { Footer } from "./_components/footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "SoonGo — La plateforme qui pilote votre flotte",
  description:
    "SoonGo centralise, automatise et optimise la gestion de votre flotte automobile : Go Pilot, Go Data, Go Optimize, Go Telematics et Go Assist, réunis dans une seule plateforme.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${parkinsans.variable} h-full overflow-x-clip antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-surface text-ink">
        <Header />
        <main className="flex-1">
          {children}
          <CtaBand />
        </main>
        <Footer />
        <BookingWidget />
      </body>
    </html>
  );
}
