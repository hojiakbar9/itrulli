import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Reveal from "@/app/componets/Reveal";
import { Fragment } from 'react';
import { client, fetchSanityData } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Kontakt | iTrulli Gelateria",
  description:
    "Senden Sie uns eine Nachricht oder besuchen Sie uns in Marburg.",
};

const getContactQuery = (locale: string) => `
*[_type == "contactPage" && _id == "contactPage"][0]{
  "info_title": coalesce(info_title.${locale}, info_title.de),
  address,
  phone,
  email,
  "faq": faq[]{
    _key,
    "question": coalesce(question.${locale}, question.de),
    "answer": coalesce(answer.${locale}, answer.de)
  }
}`;

interface ContactProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const contactQuery = getContactQuery(locale);
  const { data, error } = await fetchSanityData(contactQuery);

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-500 text-lg">Failed to load contact data. Please try again later.</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header - Animates first */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground font-sans leading-relaxed">
            {t("description")}
          </p>
        </Reveal>
      </section>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start">
          {/* --- Info & FAQ --- */}
          <Reveal delay={200}>
            <div className="space-y-12">
              {/* Direct Info */}
              {data && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                    {data.info_title}
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
                          {data.address}
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
                          href={`tel:${data.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {data.phone}
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
                          href={`mailto:${data.email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {data.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Simple FAQ Section */}
              {data && data.faq && data.faq.length > 0 && (
                <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                  <h3 className="text-xl font-bold font-serif mb-6 text-foreground">
                    FAQ
                  </h3>
                  <div className="space-y-6">
                    {data.faq.map((item: any, index: number) => (
                      <Fragment key={item._key}>
                        <div>
                          <p className="font-bold text-foreground mb-1">
                            {item.question}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {item.answer}
                          </p>
                        </div>
                        {index < data.faq.length - 1 && (
                          <div className="w-full h-px bg-stone-200"></div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
