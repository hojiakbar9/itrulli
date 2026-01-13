import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "Footer" });

  return (
    <footer className="bg-[#3B2F2F] text-stone-300 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
          {/* 1. Brand Section (Wide on Desktop) */}
          <div className="lg:col-span-2">
            <Link
              href={`/${locale}`}
              className="text-3xl font-serif text-white font-bold tracking-tight mb-4 block hover:text-[#93C572] transition-colors"
            >
              iTrulli
            </Link>
            <p className="text-lg text-stone-400 max-w-sm mb-6">
              {t("brand_slogan")}
            </p>
            {/* Social Icons (SVGs) */}
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/itrulli_/"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#93C572] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2m0,2.2A3.6,3.6 0 0,0 4.2,7.8V16.2A3.6,3.6 0 0,0 7.8,19.8H16.2A3.6,3.6 0 0,0 19.8,16.2V7.8A3.6,3.6 0 0,0 16.2,4.2H7.8m8.4,14.6A6.2,6.2 0 1,1 16.2,12.6A6.2,6.2 0 0,1 16.2,18.8m0-2.2A4,4 0 1,0 12.2,16.6A4,4 0 0,0 16.2,16.6m4-10.4A1.4,1.4 0 1,1 18.8,4.8A1.4,1.4 0 0,1 20.2,6.2Z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/p/I-Trulli-Eiscafe-Schlo%C3%9Fberg-Center-100064869136050/"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#93C572] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.15L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
              {t("col_links")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${locale}/menu`}
                  className="hover:text-[#93C572] transition-colors"
                >
                  {t("col_links") === "Explore" ||
                  t("col_links") === "Entdecken"
                    ? "Menu"
                    : "Menü"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/gallery`}
                  className="hover:text-[#93C572] transition-colors"
                >
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/careers`}
                  className="hover:text-[#93C572] transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-[#93C572] transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact & Hours */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
              {t("col_contact")}
            </h3>
            <address className="not-italic space-y-4">
              <p className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#93C572] mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{t("address")}</span>
              </p>
              <p className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#93C572] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+4915234139020"
                  className="hover:text-white transition-colors"
                >
                  {t("phone")}
                </a>
              </p>
              <div className="pt-2">
                <p className="text-white font-bold text-sm mb-1">
                  {t("hours_label")}
                </p>
                <p>{t("hours_value")}</p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} iTrulli Gelateria.{" "}
            {t("copyright")}
          </p>

          <div className="flex gap-6">
            <Link
              href={`/${locale}/impressum`}
              className="hover:text-white transition-colors"
            >
              {t("legal_imprint")}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-white transition-colors"
            >
              {t("legal_privacy")}
            </Link>
            <button className="hover:text-white transition-colors">
              {t("legal_cookie")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
