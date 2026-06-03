import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AFRITE — Le système d'exploitation local de l'Algérie",
  description:
    "Recherche IA de lieux, professionnels, missions et entraide locale en Algérie."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
