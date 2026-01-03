import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | iTrulli Gelateria",
  robots: "noindex",
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.privacy" });
  const tImp = await getTranslations({ locale, namespace: "Legal.impressum" }); // Reuse company data

  return (
    <div className="bg-background min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-sm">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
          {t("title")}
        </h1>

        <div className="space-y-8 text-stone-600 font-sans leading-relaxed">
          {/* Controller Info */}
          <section>
            <p className="mb-4">{t("intro")}</p>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p className="font-bold text-foreground">
                {tImp("company_name")}
              </p>
              <p>{tImp("address_street")}</p>
              <p>{tImp("address_city")}</p>
              <p className="mt-2">{tImp("email")}</p>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              {t("rights_h")}
            </h2>
            <p className="mb-4">{t("rights_text")}</p>
            <ul className="list-disc pl-5 space-y-2">
              {/* Since 'rights_list' is an array in JSON, we need to map it manually or hardcode indices if TypeSafe checks are strict */}
              <li>
                Auskunft über Ihre bei uns gespeicherten Daten und deren
                Verarbeitung
              </li>
              <li>Berichtigung unrichtiger personenbezogener Daten</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten</li>
              <li>Einschränkung der Datenverarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
            </ul>
          </section>

          {/* Server Logs */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              {t("hosting_h")}
            </h2>
            <p>{t("hosting_text")}</p>
          </section>

          <section className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm text-amber-900">
            <strong>Hinweis:</strong> Dies ist ein Platzhalter-Text. Da Sie eine
            Kontaktseite und Google Maps verwenden, müssen Sie hier spezifische
            Abschnitte ergänzen über:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Kontaktformular (Speicherung der Eingaben)</li>
              <li>Google Maps (Übertragung von IP an Google USA)</li>
              <li>Google Fonts (falls nicht lokal geladen)</li>
            </ul>
            <br />
            Bitte nutzen Sie einen Dienst wie <i>Datenschutz-Generator.de</i>,
            um rechtssichere Texte zu generieren.
          </section>
        </div>
      </div>
    </div>
  );
}
