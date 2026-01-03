import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Reveal from "./Reveal"; // <--- Import the new component

const FLAVORS = [
  {
    id: "pistachio",
    color: "bg-[#93C572]",
    isVegan: false,
    allergens: ["G", "H"],
  },
  {
    id: "chocolate",
    color: "bg-[#3B2F2F]",
    isVegan: true,
    allergens: [],
  },
  {
    id: "lemon",
    color: "bg-[#F4E04D]",
    isVegan: true,
    allergens: [],
  },
  {
    id: "stracciatella",
    color: "bg-[#E7E5E4]",
    isVegan: false,
    allergens: ["G"],
  },
];

interface FeaturedProps {
  locale: string;
}

export default async function FeaturedFlavors({ locale }: FeaturedProps) {
  const t = await getTranslations({ locale, namespace: "Featured" });

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text - Animates as a block */}
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-wider uppercase mb-2 block font-sans text-sm">
              {t("kicker")}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {t("headline")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("description")}
            </p>
          </div>
        </Reveal>

        {/* Carousel - We animate the CARDS individually */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {FLAVORS.map((flavor, index) => (
            // We use Reveal on the wrapper div of each card
            // delay={index * 100} creates the cascade effect (0ms, 100ms, 200ms...)
            <Reveal
              key={flavor.id}
              delay={index * 100}
              className="snap-center shrink-0 w-[280px] md:w-[320px]"
            >
              <div
                className="group cursor-pointer h-full" // Moved layout classes here
              >
                <div className="bg-background rounded-[2rem] p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-muted/40 h-full flex flex-col items-center text-center relative overflow-hidden">
                  {/* Background Blob */}
                  <div
                    className={`absolute top-0 inset-x-0 h-32 opacity-20 transition-transform duration-500 group-hover:scale-150 rounded-b-[50%] ${flavor.color}`}
                  />

                  {/* Image/Color Circle */}
                  <div className="relative w-48 h-48 mb-6 mt-4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                    <div
                      className={`w-full h-full rounded-full opacity-80 ${flavor.color} shadow-inner`}
                    ></div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`flavors.${flavor.id}.name`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {t(`flavors.${flavor.id}.desc`)}
                  </p>

                  <div className="flex gap-2 items-center justify-center mt-auto">
                    {flavor.isVegan && (
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200">
                        Vegan
                      </span>
                    )}
                    {flavor.allergens.map((a) => (
                      <span
                        key={a}
                        className="w-6 h-6 rounded-full border border-stone-300 text-[10px] flex items-center justify-center text-stone-500 font-bold"
                        title={`Allergen: ${a}`}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Footer Link - Animates in last */}
        <Reveal delay={400}>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/menu`}
              className="inline-flex items-center text-primary font-bold hover:text-primary-hover transition-colors border-b-2 border-primary/20 hover:border-primary pb-1"
            >
              {t("cta_all")}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        </Reveal>
      </div>
    </section>
  );
}
