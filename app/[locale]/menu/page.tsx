import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Reveal from "@/app/componets/Reveal";

export const metadata: Metadata = {
  title: "Eiskarte & Preise | iTrulli Gelateria",
  description:
    "Unser aktuelles Angebot: Klassische Sorten, vegane Fruchteissorten und traditionelle italienische Eisbecher.",
};

interface MenuProps {
  params: Promise<{ locale: string }>;
}

export default async function MenuPage({ params }: MenuProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Menu" });

  // Mock Data Structure
  const MENU_SECTIONS = [
    {
      id: "milk",
      items: [
        { id: "vanilla", allergens: ["G"] },
        { id: "chocolate", allergens: ["G"] },
        { id: "pistachio", allergens: ["G", "H"] },
        { id: "hazelnut", allergens: ["G", "H"] },
        { id: "stracciatella", allergens: ["G"] },
      ],
    },
    {
      id: "fruit",
      items: [
        { id: "strawberry", allergens: [] },
        { id: "lemon", allergens: [] },
        { id: "mango", allergens: [] },
      ],
    },
    {
      id: "sundaes",
      items: [
        { id: "spaghetti", price: "7,50 €", allergens: ["G", "C"] },
        { id: "tartufo", price: "6,90 €", allergens: ["G", "H"] },
      ],
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* 1. Header Section */}
      <section className="bg-primary/10 py-16 md:py-24 px-6 text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-wider uppercase mb-3 block text-sm">
              iTrulli Gelateria
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed">
              {t("description")}
            </p>
          </div>
        </Reveal>
      </section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-10 relative z-10">
        {/* 2. Price Card (Sticky-ish look) */}
        {/* We animate this with a delay so it pops in after the header */}
        <Reveal delay={200}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 mb-16 text-center md:text-left">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              <div className="text-center">
                <span className="block text-2xl font-serif font-bold text-foreground">
                  {t("prices.value_1")}
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  {t("prices.scoop_1")}
                </span>
              </div>
              <div className="text-center border-l border-stone-100">
                <span className="block text-2xl font-serif font-bold text-foreground">
                  {t("prices.value_2")}
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  {t("prices.scoop_2")}
                </span>
              </div>
              <div className="text-center border-l border-stone-100">
                <span className="block text-2xl font-serif font-bold text-foreground">
                  {t("prices.value_3")}
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  {t("prices.scoop_3")}
                </span>
              </div>
              <div className="text-center border-l border-stone-100">
                <span className="block text-2xl font-serif font-bold text-foreground">
                  {t("prices.value_cream")}
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  {t("prices.cream")}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. Menu Categories */}
        <div className="space-y-16">
          {MENU_SECTIONS.map((section) => (
            // We wrap the entire section in Reveal.
            // As you scroll down, the next category fades in.
            <Reveal key={section.id} className="scroll-mt-24">
              <div id={section.id}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-serif font-bold text-foreground">
                    {t(`sections.${section.id}`)}
                  </h2>
                  <div className="h-px bg-stone-200 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start group"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          {t(`items.${item.id}.name`)}
                          {/* Vegan Badge for Fruit section */}
                          {section.id === "fruit" && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide">
                              Vegan
                            </span>
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {t(`items.${item.id}.desc`)}
                        </p>
                      </div>

                      <div className="text-right">
                        {/* Price (if specific to item, mostly for sundaes) */}
                        {/* @ts-expect-error - dynamic check */}
                        {item.price && (
                          <span className="block font-bold text-primary">
                            {item.price}
                          </span>
                        )}

                        {/* Allergens (Small codes) */}
                        <div className="text-[10px] text-stone-400 mt-1 uppercase font-mono">
                          {item.allergens.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4. Footer Legend */}
        <Reveal delay={200}>
          <div className="mt-20 pt-8 border-t border-stone-200 text-center md:text-left">
            <p className="text-xs text-stone-400 mb-2 font-bold uppercase tracking-wider">
              {t("allergens_label")}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-2xl">
              A: Gluten, C: Eier, G: Milch (Laktose), H: Schalenfrüchte. Eine
              detaillierte Allergenkarte liegt an der Theke aus. Alle Preise
              inkl. MwSt.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
