import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Reveal from "./Reveal"; // <--- Import the new component
import { client, fetchSanityData } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const getFlavorsQuery = (locale: string) => `*[_type == "featuredFlavor"]{
  _id,
  "name": name.${locale},
  "description": description.${locale},
  image,
  color
}`;

interface FeaturedProps {
  locale: string;
}

export default async function FeaturedFlavors({ locale }: FeaturedProps) {
  const t = await getTranslations({ locale, namespace: "Featured" });
  const flavorsQuery = getFlavorsQuery(locale);
  const { data: flavors, error } = await fetchSanityData(flavorsQuery);

  if (error || !flavors || flavors.length === 0) {
    return (
      <section className="py-20 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[30vh]">
            <p className="text-red-500 text-lg">Failed to load featured flavors. Please try again later.</p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </section>
    );
  }

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
          {flavors.map((flavor: any, index: number) => (
            // We use Reveal on the wrapper div of each card
            // delay={index * 100} creates the cascade effect (0ms, 100ms, 200ms...)
            <Reveal
              key={flavor._id}
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
                    <Image
                      src={urlFor(flavor.image).width(400).height(400).url()}
                      alt={flavor.name}
                      width={400}
                      height={400}
                      className={`w-full h-full rounded-full object-cover shadow-inner ${flavor.color}`}
                    />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {flavor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {flavor.description}
                  </p>
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
