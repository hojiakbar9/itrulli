import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | iTrulli Gelateria",
  robots: "noindex", // Usually good to keep legal pages out of search snippets
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.impressum" });

  return (
    <div className="bg-background min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-sm">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
          {t("title")}
        </h1>

        <div className="space-y-8 text-stone-600 font-sans leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("h1")}
            </h2>
            <p>{t("company_name")}</p>
            <p>{t("address_street")}</p>
            <p>{t("address_city")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Vertreten durch:
            </h2>
            <p>{t("owner")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("contact_h")}
            </h2>
            <p>{t("phone")}</p>
            <p>{t("email")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("tax_h")}
            </h2>
            <p>{t("tax_id")}</p>
          </section>

          <div className="w-full h-px bg-stone-200 my-8"></div>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("dispute_h")}
            </h2>
            <p>{t("dispute_text")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("liability_h")}
            </h2>
            <p>{t("liability_text")}</p>
            <p className="mt-4 text-sm italic text-stone-400">
              (Hier würde der vollständige Haftungsausschluss stehen. Bitte
              ergänzen Sie diesen Teil mit einem Generator wie e-recht24.de)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
