"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("Hero");

  return (
    <section className="bg-background w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] lg:min-h-[85vh]">
        {/* --- LEFT COLUMN: Text --- */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 lg:py-0 order-2 lg:order-1 relative z-10 bg-background">
          <div className="w-full max-w-xl mx-auto lg:mr-8 lg:ml-auto text-center lg:text-left">
            <span className="text-primary font-bold tracking-wider uppercase mb-4 block font-sans">
              {t("kicker")}
            </span>
            <h1 className="text-5xl sm:text-6xl xl:text-8xl font-serif font-bold text-foreground  leading-none mb-8">
              {t.rich("headline", {
                highlight: (chunks) => (
                  <span className="text-primary italic">{chunks}</span>
                ),
              })}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed font-sans">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start font-sans font-bold">
              <Link
                href={`/${locale}/menu`}
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-primary bg-primary text-white rounded-full hover:bg-primary-hover hover:border-primary-hover transition-colors text-lg shadow-sm hover:shadow-md"
              >
                {t("cta_menu")}
              </Link>
              <Link
                href={`/${locale}/hours`}
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-muted-foreground/30 text-foreground rounded-full hover:border-foreground transition-colors text-lg"
              >
                {t("cta_locations")}
              </Link>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Image --- */}

        <div className="relative w-full h-[55vh] lg:h-auto ord lg:order-2 bg-stone-50/50 flex items-center justify-center p-8 md:p-16 lg:p-8 overflow-hidden">
          {/* === TILT CONTAINER === */}

          <div className="relative w-full max-w-162.5 md:max-w-125 lg:max-w-162.5 aspect-square rotate-2 hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] rounded-4xl shadow-2xl z-10 group">
            <div className="absolute inset-0 bg-stone-200 rounded-4xl overflow-hidden">
              <Image
                src="/hero-gelato.png"
                alt="Handmade Italian Gelato"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 650px"
              />
            </div>

            {/* FLOATING BADGE */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:-bottom-6 lg:-right-6 z-20 animate-float">
              <div className="bg-background/90 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 text-center min-w-35 max-w-40 md:max-w-55">
                <span className="block text-primary text-[10px] md:text-sm font-bold uppercase tracking-wider mb-1 font-sans">
                  {t("badge_title")}
                </span>
                <span className="block text-foreground font-serif text-lg md:text-2xl font-bold leading-tight">
                  {t("badge_flavor")}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative blob */}
          <div className="absolute bg-primary/10 w-150 h-150 rounded-full blur-3xl -top-20 -right-20 pointer-events-none mix-blend-multiply"></div>
        </div>
      </div>
    </section>
  );
}
