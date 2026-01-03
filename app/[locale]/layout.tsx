import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "./globals.css";
import Navbar from "../componets/NavBar";
import Footer from "../componets/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "iTrulli - Italienisches Eis",
  description: "Das beste italienische Eis in Marburg",
};

// 1. Static Generation (SSG)
// This tells Next.js to pre-build the /de, /it, and /en versions
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 2. Await the params
  const { locale } = await params;

  // 3. Validate the locale (Security check)
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 4. Load translations
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className=" min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="grow">{children}</main>

          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
