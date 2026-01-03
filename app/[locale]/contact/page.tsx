import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ContactForm from "@/app/componets/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt | iTrulli Gelateria",
  description:
    "Senden Sie uns eine Nachricht oder besuchen Sie uns in Marburg.",
};

interface ContactProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground font-sans leading-relaxed">
          {t("description")}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* --- LEFT COLUMN: Info & FAQ --- */}
          <div className="space-y-12">
            {/* Direct Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                {t("info_title")}
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-primary shrink-0">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                  <div>
                    <span className="block font-bold text-foreground">
                      Adresse
                    </span>
                    <span className="text-muted-foreground">
                      Hauptstraße 12, 35037 Marburg
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-primary shrink-0">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                  <div>
                    <span className="block font-bold text-foreground">
                      Telefon
                    </span>
                    <a
                      href="tel:+496421123456"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +49 6421 123456
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-primary shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-bold text-foreground">
                      E-Mail
                    </span>
                    <a
                      href="mailto:ciao@itrulli.de"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      ciao@itrulli.de
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Simple FAQ Section */}
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
              <h3 className="text-xl font-bold font-serif mb-6 text-foreground">
                FAQ
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-foreground mb-1">
                    {t("faq.q1")}
                  </p>
                  <p className="text-muted-foreground text-sm">{t("faq.a1")}</p>
                </div>
                <div className="w-full h-px bg-stone-200"></div>
                <div>
                  <p className="font-bold text-foreground mb-1">
                    {t("faq.q2")}
                  </p>
                  <p className="text-muted-foreground text-sm">{t("faq.a2")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Form --- */}
          <div className="relative">
            {/* Decorative blob behind the form */}
            <div className="absolute top-10 -right-10 w-64 h-64 bg-[#93C572]/20 rounded-full blur-3xl -z-10"></div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
