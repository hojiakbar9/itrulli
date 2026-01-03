import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/app/componets/Reveal";

export const metadata: Metadata = {
  title: "Karriere & Jobs | iTrulli Gelateria",
  description:
    "Werde Teil unseres Teams! Wir suchen Servicekräfte, Eisverkäufer und Eismacher in Marburg.",
};

interface CareersProps {
  params: Promise<{ locale: string }>;
}

export default async function CareersPage({ params }: CareersProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });

  // Mock Job Data
  const JOBS = ["service", "counter", "production"];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* 1. Hero / Intro */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background decorative blob - Adds a slow scale-in effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#93C572]/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4 animate-fade-scale"></div>

        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-bold tracking-wider uppercase mb-3 block text-sm">
              Join the Team
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </Reveal>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 2. Benefits Grid (Why work here?) */}
        {/* Staggered Animation: 0ms, 200ms, 400ms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[1, 2, 3].map((num, index) => (
            <Reveal key={num} delay={index * 200} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center hover:shadow-md transition-shadow h-full">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  {/* Icons based on index */}
                  {num === 1 && (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {num === 2 && (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {num === 3 && (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>

                <h3 className="text-xl font-bold font-serif mb-2 text-foreground">
                  {t(`benefits.${num}.title`)}
                </h3>

                <p className="text-muted-foreground">
                  {t(`benefits.${num}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 3. Job Listings */}
        <div>
          <Reveal>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-10 text-center">
              {t("jobs_title")}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOBS.map((jobId, index) => (
              <Reveal key={jobId} delay={index * 150} className="h-full">
                <div className="bg-white rounded-2xl p-8 border border-stone-200 flex flex-col hover:border-primary transition-colors group h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wide mb-3">
                      {t(`jobs.${jobId}.type`)}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {t(`jobs.${jobId}.title`)}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-8 flex-grow">
                    {t(`jobs.${jobId}.desc`)}
                  </p>

                  <Link
                    href={`/${locale}/contact?subject=Jobs`}
                    className="block w-full py-3 text-center rounded-xl bg-foreground text-white font-bold hover:bg-primary transition-colors"
                  >
                    {t("apply_btn")}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Unsolicited Application CTA */}
          <Reveal delay={300}>
            <div className="mt-16 text-center bg-stone-50 rounded-2xl p-8 max-w-2xl mx-auto border border-dashed border-stone-300">
              <p className="text-lg font-bold text-foreground mb-4">
                Keine passende Stelle dabei?
              </p>
              <Link
                href={`/${locale}/contact?subject=Jobs`}
                className="text-primary font-bold hover:underline"
              >
                {t("no_jobs_cta")} &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
