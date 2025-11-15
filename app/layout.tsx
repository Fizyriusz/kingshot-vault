import type { Metadata } from "next";
// Importujemy czcionki z 'next/font/google'
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";

// Konfiguracja czcionek
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato", // Używamy jako zmienna CSS
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat", // Używamy jako zmienna CSS
});

export const metadata: Metadata = {
  title: "Kingshot Vault",
  description: "Wiedza. Narzędzia. Dominacja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Łączymy zmienne czcionek z naszym body
    // Używamy też `font-sans` (Lato) jako domyślnej
    <html lang="pl">
      <body className={`${lato.variable} ${montserrat.variable} font-sans bg-brand-background text-brand-text`}>
        {children}
      </body>
    </html>
  );
}
