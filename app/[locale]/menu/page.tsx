import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Reveal from "@/app/componets/Reveal";

export const metadata: Metadata = {
  title: "Eiskarte & Preise | iTrulli Gelateria",
  description:
    "Unser aktuelles Angebot: Spaghetti Eis, Klassiker, Veganes Fruchteis und italienischer Kaffee.",
};

interface MenuItem {
  id: string;
  allergens: string[];
  price?: string;
  highlight?: boolean;
}

interface MenuSection {
  id: string;
  items: MenuItem[];
}

interface MenuProps {
  params: Promise<{ locale: string }>;
}

export default async function MenuPage({ params }: MenuProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Menu" });

  const MENU_SECTIONS: MenuSection[] = [
    {
      id: "kids",
      items: [
        {
          id: "pinocchio",
          price: "5,00 €",
          allergens: ["G", "A", "H", "2", "16"],
        }, // Source: 15
        { id: "micky", price: "5,00 €", allergens: ["G", "A", "H", "2", "16"] }, // Source: 19
      ],
    },
    {
      id: "spaghetti",
      items: [
        {
          id: "spaghetti_classic",
          price: "7,80 €",
          allergens: ["G", "16", "17"],
          highlight: true,
        }, // Source: 104
        // Replaced Carbonara (Egg Liqueur risk) with Spaghetti Schoko (Safe)
        {
          id: "spaghetti_choco",
          price: "7,80 €",
          allergens: ["G", "16", "17"],
        }, // Source: 115
        { id: "spaghetti_neri", price: "8,70 €", allergens: ["G", "H", "E"] }, // Source: 137
      ],
    },
    {
      id: "classics",
      items: [
        {
          id: "pizza",
          price: "9,50 €",
          allergens: ["G", "16", "17"],
          highlight: true,
        }, // Source: 167
        // Replaced Tartufo (Alcohol) with Banana Split (Safe)
        {
          id: "banana_split",
          price: "8,70 €",
          allergens: ["G", "2", "3", "16", "17"],
        }, // Source: 171
        {
          id: "copacabana",
          price: "8,70 €",
          allergens: ["G", "16", "17", "20"],
        }, // Source: 192
      ],
    },

    {
      id: "candy_nut",
      items: [
        {
          id: "rocher",
          price: "9,00 €",
          allergens: ["G", "K", "H", "E"],
          highlight: true,
        }, // Source: 237
        { id: "raffaello", price: "9,00 €", allergens: ["G", "K", "H", "A"] }, // Source: 247
        // Replaced After Eight with Krokant (Caramel/Nut) - very safe and popular
        { id: "krokant", price: "8,70 €", allergens: ["G", "K", "H", "E"] }, // Source: 227
      ],
    },
    {
      id: "yogurt",
      items: [
        { id: "yogurt_fruit", price: "8,70 €", allergens: ["G", "2", "3"] }, // Source: 72
        { id: "yogurt_amarena", price: "8,70 €", allergens: ["G", "2", "3"] }, // Source: 92
      ],
    },
    {
      id: "drinks",
      items: [
        { id: "espresso", price: "2,40 €", allergens: [] }, // Source: 131
        { id: "cappuccino", price: "3,20 €", allergens: ["G"] }, // Source: 132
        { id: "milkshake", price: "ab 4,20 €", allergens: ["G"] }, // Source: 276
        { id: "aperol", price: "7,50 €", allergens: ["N", "14", "2"] }, // Source: 116 (Aperol itself has alcohol, but it is a drink standard. If you want 100% alcohol free page, remove this too).
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
        {/* 2. Price Card */}
        <Reveal delay={200}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 mb-16 text-center md:text-left">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              <div className="text-center">
                <span className="block text-2xl font-serif font-bold text-foreground">
                  {t("prices.value_scoop")}
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  {t("prices.scoop")}
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
              <div className="text-center border-l border-stone-100">
                <span className="block text-2xl font-serif font-bold text-foreground">
                  {t("prices.value_kids")}
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  {t("prices.kids")}
                </span>
              </div>
              <div className="text-center border-l border-stone-100 flex flex-col items-center justify-center">
                <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded-full mb-1">
                  Vegan Options
                </span>
                <span className="text-sm text-muted-foreground font-bold uppercase">
                  Available
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. Menu Categories */}
        <div className="space-y-16">
          {MENU_SECTIONS.map((section) => (
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
                      className={`flex justify-between items-start group p-4 rounded-xl transition-all ${item.highlight ? "bg-stone-50 border border-stone-100 shadow-sm" : ""}`}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          {t(`items.${item.id}.name`)}
                          {item.highlight && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wide">
                              Bestseller
                            </span>
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {t(`items.${item.id}.desc`)}
                        </p>
                      </div>

                      <div className="text-right">
                        {item.price && (
                          <span className="block font-bold text-primary text-lg">
                            {item.price}
                          </span>
                        )}
                        {item.allergens.length > 0 && (
                          <div className="text-[9px] text-stone-300 mt-1 uppercase font-mono">
                            {item.allergens.join(", ")}
                          </div>
                        )}
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
              {t("allergens_note")}
              <br />
              Alle Preise inkl. Bedienung und MwSt.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
