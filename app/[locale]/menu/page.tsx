import { client } from "@/sanity/lib/client";
import { getTranslations } from "next-intl/server";

const getMenuQuery = (locale: string) => `
*[_type == "menuCategory"] | order(order asc) {
  "title": coalesce(title.${locale}, title.de),
  "items": *[_type == "menuItem" && references(^._id) && isAlcoholic != true] | order(order asc) {
    _id,
    "name": coalesce(name.${locale}, name.de),
    "description": coalesce(description.${locale}, description.de),
    price,
    price_large
  }
}
`;

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const menuQuery = getMenuQuery(locale);
  const menuData = await client.fetch(menuQuery);
  const t = await getTranslations({ locale, namespace: "MenuPage" });

  return (
    <div className="bg-background text-foreground">
      <header className="py-24 sm:py-32 text-center bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">
            {t("kicker")}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight font-serif sm:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("description")}
          </p>
        </div>
      </header>

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {menuData.map((category: any) => (
            category.items.length > 0 && (
              <section key={category.title} className="scroll-mt-24">
                <h2 className="text-3xl font-bold tracking-tight font-serif text-primary sm:text-4xl">
                  {category.title}
                </h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                  {category.items.map((item: any) => (
                    <div key={item._id} className="flex flex-col">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-bold font-serif text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-foreground ml-4">
                          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}
                        </p>
                      </div>
                      {item.price_large && (
                        <p className="text-sm text-muted-foreground -mt-1 text-right">
                            Groß: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price_large)}
                        </p>
                      )}
                      <p className="mt-2 text-base text-muted-foreground flex-grow">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>
      </main>
    </div>
  );
}