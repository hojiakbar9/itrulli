import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Reveal from "./Reveal";

interface TestimonialsProps {
  locale: string;
}

export default async function Testimonials({ locale }: TestimonialsProps) {
  const t = await getTranslations({ locale, namespace: "Testimonials" });

  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative">
      {/* Decorative background pattern */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <Reveal>
          <span className="text-primary font-bold tracking-wider uppercase mb-2 block font-sans text-sm">
            {t("kicker")}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t("headline")}
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            {t("description")}
          </p>
        </Reveal>

        {/* TRUST BADGE CARD */}
        <Reveal delay={200}>
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-stone-100 inline-block max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
            {/* Google Logo (Official Colors) */}
            <div className="flex justify-center mb-6">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>

            {/* Score & Stars */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold text-foreground">
                {t("rating_score")}
              </span>
              <span className="text-xl text-stone-400 font-medium self-end mb-1">
                {t("rating_max")}
              </span>
            </div>

            <div className="flex justify-center text-[#F4B400] mb-4 space-x-1">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            {/* Text Summary */}
            <p className="text-stone-500 font-medium mb-8">
              {t("rating_text")}
            </p>

            {/* CTA Button */}
            <Link
              href="https://www.google.com/maps/place/I+TRULLI+Eiscafe+Schlo%C3%9Fberg+Center/@50.803481,8.7513362,13z/data=!3m1!5s0x47bc627d91f734dd:0x67d769a48c68100f!4m6!3m5!1s0x47bc63baa182e04d:0x7045fba407e3f2e3!8m2!3d50.8073924!4d8.769113!16s%2Fg%2F11jlf4hfng?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full justify-center items-center px-6 py-3 bg-white border-2 border-stone-200 rounded-xl text-foreground font-bold hover:border-primary hover:text-primary transition-colors shadow-sm"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {t("cta_google")}
            </Link>

            <p className="text-xs text-stone-300 mt-4 font-sans">
              {t("disclaimer")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
