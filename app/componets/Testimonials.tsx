import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Reveal from "./Reveal"; // <--- Import Trigger

interface TestimonialsProps {
  locale: string;
}

export default async function Testimonials({ locale }: TestimonialsProps) {
  const t = await getTranslations({ locale, namespace: "Testimonials" });

  const reviews = ["r1", "r2", "r3"];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative">
      {/* Decorative background pattern */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header - Animates in first */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase mb-2 block font-sans text-sm">
              {t("kicker")}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t("headline")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("description")}
            </p>
          </div>
        </Reveal>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((key, index) => (
            // Staggered Animation: 0ms, 200ms, 400ms
            <Reveal key={key} delay={index * 200} className="h-full">
              <div className="bg-background p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                {/* Header: Stars & Google Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-[#F4B400]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  {/* Google G Icon */}
                  <div className="w-6 h-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                    </svg>
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="text-foreground text-lg font-serif leading-relaxed mb-6 flex-grow">
                  "{t(`reviews.${key}.text`)}"
                </blockquote>

                {/* Author Info */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 font-bold flex items-center justify-center text-sm border border-stone-200">
                    {t(`reviews.${key}.author`).charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-foreground text-sm block">
                      {t(`reviews.${key}.author`)}
                    </cite>
                    <span className="text-xs text-stone-400 font-sans">
                      {t(`reviews.${key}.date`)}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA - Appears last */}
        <Reveal delay={600}>
          <div className="text-center mt-12">
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors font-bold text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
              </svg>
              {t("cta_google")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
