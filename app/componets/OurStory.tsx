import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

interface StoryProps {
  locale: string;
}

export default async function OurStory({ locale }: StoryProps) {
  const t = await getTranslations({ locale, namespace: "Story" });

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* --- LEFT: Text Content --- */}
          <div className="order-2 lg:order-1">
            <span className="text-primary font-bold tracking-wider uppercase mb-2 block font-sans text-sm">
              {t("kicker")}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              {t("headline")}
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            {/* Stats / Trust Bar */}
            <div className="grid grid-cols-3 gap-8 mt-12 py-8 border-t border-b border-muted/60">
              <div>
                <span className="block text-3xl font-serif font-bold text-foreground">
                  {t("stat_1_value")}
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-bold">
                  {t("stat_1_label")}
                </span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-bold text-foreground">
                  {t("stat_2_value")}
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-bold">
                  {t("stat_2_label")}
                </span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-bold text-foreground">
                  {t("stat_3_value")}
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-bold">
                  {t("stat_3_label")}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href={`/${locale}/about`}
                className="text-foreground font-bold border-b-2 border-primary hover:text-primary transition-colors pb-1 inline-flex items-center"
              >
                {t("cta")}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* --- RIGHT: Collage Images --- */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[600px] w-full">
            {/* Main Image (Portrait - e.g., Making Gelato) */}
            <div className="absolute top-0 right-0 w-[85%] h-[85%] bg-stone-200 rounded-2xl overflow-hidden shadow-2xl z-10 rotate-2 hover:rotate-0 transition-transform duration-700">
              {/* Replace with your image */}
              {/* <Image src="/story-maker.jpg" alt="Making Gelato" fill className="object-cover" /> */}
              <div className="w-full h-full bg-stone-300 flex items-center justify-center text-stone-500 font-bold">
                IMG: Gelato Maker
              </div>
            </div>

            {/* Secondary Image (Landscape - e.g., Ingredients or Old Shop) */}
            {/* Overlaps the first one on the bottom left */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[45%] bg-stone-100 rounded-2xl overflow-hidden shadow-xl z-20 -rotate-3 hover:rotate-0 transition-transform duration-700 border-4 border-background">
              {/* Replace with your image */}
              {/* <Image src="/story-ingredients.jpg" alt="Fresh Ingredients" fill className="object-cover" /> */}
              <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 font-bold">
                IMG: Ingredients
              </div>
            </div>

            {/* Decorative Element (Pattern) */}
            <div className="absolute top-1/2 left-1/4 w-full h-full bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
