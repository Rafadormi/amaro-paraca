import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amaroparaca.com.br"),
  title: {
    default: "AMARO | PARACA — Inteligência operacional e automação aplicada",
    template: "%s | AMARO | PARACA",
  },
  description:
    "Diagnóstico operacional, presença digital e automação para empresas que querem reduzir atrito e crescer com clareza.",
  keywords: [
    "automação empresarial",
    "agentes de IA",
    "criação de sites",
    "presença digital",
    "automação WhatsApp",
    "Umuarama",
    "Paraná",
  ],
  authors: [{ name: "AMARO | PARACA", url: "https://amaroparaca.com.br" }],
  creator: "AMARO | PARACA",
  publisher: "AMARO | PARACA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "AMARO | PARACA",
    title: "AMARO | PARACA — Inteligência operacional e automação aplicada",
    description:
      "Diagnóstico operacional para organizar atendimento, dados e rotinas antes de escolher ferramentas.",
    images: [
      {
        url: "/assets/brand-relief.webp",
        width: 1672,
        height: 941,
        alt: "Monograma e assinatura AMARO | PARACA em relevo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMARO | PARACA",
    description: "Diagnóstico operacional e automação aplicada.",
    images: ["/assets/brand-relief.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090a",
  colorScheme: "dark",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AMARO | PARACA",
  alternateName: "Amaro Paraca",
  url: "https://amaroparaca.com.br",
  description:
    "Diagnóstico operacional, presença digital e automação aplicada para empresas.",
  founder: {
    "@type": "Person",
    name: "Rafael Amaro Silvério",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Umuarama",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsAbout: [
    "Presença digital",
    "Automação empresarial",
    "Agentes de inteligência artificial",
    "Estratégia de dados",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
