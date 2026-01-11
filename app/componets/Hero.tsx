import Link from "next/link";
import Image from "next/image";
import { client, fetchSanityData } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const getHeroQuery = (locale: string) => `*[_type == "hero" && _id == "hero"][0]{
  "kicker": kicker.${locale},
  "headline": headline.${locale},
  "description": description.${locale},
  "cta_menu": cta_menu.${locale},
  "cta_locations": cta_locations.${locale},
  "badge_title": badge_title.${locale},
  "badge_flavor": badge_flavor.${locale},
  image
}`;

interface HeroProps {
  locale: string;
}

export default async function Hero({ locale }: HeroProps) {
  const heroQuery = getHeroQuery(locale);
  const { data: hero, error } = await fetchSanityData(heroQuery);

  if (error || !hero) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-500 text-lg">Failed to load hero data. Please try again later.</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <section className="bg-background w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] lg:min-h-[85vh]">
        {/* --- LEFT COLUMN: Text --- */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 lg:py-0 order-2 lg:order-1 relative z-10 bg-background">
          <div className="w-full max-w-xl mx-auto lg:mr-8 lg:ml-auto text-center lg:text-left">
            {/* 1. Kicker (No delay) */}
            <span className="text-primary font-bold tracking-wider uppercase mb-4 block font-sans animate-fade-up">
              {hero.kicker}
            </span>

            {/* 2. Headline (Delay 100ms) */}
            <h1 className="text-5xl sm:text-6xl xl:text-8xl font-serif font-bold text-foreground leading-none mb-8 animate-fade-up delay-100">
              {hero.headline}
            </h1>

            {/* 3. Description (Delay 200ms) */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed font-sans animate-fade-up delay-200">
              {hero.description}
            </p>

            {/* 4. Buttons (Delay 300ms) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start font-sans font-bold animate-fade-up delay-300">
              <Link
                href={`/${locale}/menu`}
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-primary bg-primary text-white rounded-full hover:bg-primary-hover hover:border-primary-hover transition-colors text-lg shadow-sm hover:shadow-md"
              >
                {hero.cta_menu}
              </Link>
              <Link
                href={`/${locale}/hours`}
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-muted-foreground/30 text-foreground rounded-full hover:border-foreground transition-colors text-lg"
              >
                {hero.cta_locations}
              </Link>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Image --- */}
        <div className="relative w-full h-[55vh] lg:h-auto order-1 lg:order-2 bg-stone-50/50 flex items-center justify-center p-8 md:p-16 lg:p-8 overflow-hidden">
          {/* === TILT CONTAINER (Scale In Animation added) === */}
          <div className="relative w-full max-w-[650px] md:max-w-[500px] lg:max-w-[650px] aspect-square rotate-2 hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] rounded-[2rem] shadow-2xl z-10 group animate-fade-scale delay-200">
            {hero.image && (
              <div className="absolute inset-0 bg-stone-200 rounded-[2rem] overflow-hidden">
                <Image
                  src={urlFor(hero.image).url()}
                  alt="Handmade Italian Gelato"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 650px"
                />
              </div>
            )}

            {/* FLOATING BADGE (Already has float animation, added fade-in) */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:-bottom-6 lg:-right-6 z-20 animate-float animate-fade-up delay-500">
              <div className="bg-background/90 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 text-center min-w-[140px] max-w-[160px] md:max-w-[220px]">
                <span className="block text-primary text-[10px] md:text-sm font-bold uppercase tracking-wider mb-1 font-sans">
                  {hero.badge_title}
                </span>
                <span className="block text-foreground font-serif text-lg md:text-2xl font-bold leading-tight">
                  {hero.badge_flavor}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative blob (Scale in background) */}
          <div className="absolute bg-primary/10 w-[600px] h-[600px] rounded-full blur-3xl -top-20 -right-20 pointer-events-none mix-blend-multiply animate-fade-scale"></div>
        </div>
      </div>
    </section>
  );
}
