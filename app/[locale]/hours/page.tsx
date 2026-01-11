import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/app/componets/Reveal";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Öffnungszeiten & Standorte | iTrulli Gelateria",
  description:
    "Besuchen Sie uns in Marburg oder Cölbe. Hier finden Sie unsere Adressen und aktuellen Öffnungszeiten.",
};

const getLocationsQuery = (locale: string) => `
*[_type == "locations" && _id == "locations"][0]{
  locations[]{
    _key,
    city,
    address,
    phone,
    schedule[]{
      "days": coalesce(days.${locale}, days.de),
      time
    },
    imageColor
  }
}`;

interface HoursProps {
  params: Promise<{ locale: string }>;
}

export default async function HoursPage({ params }: HoursProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hours" });
  const locationsQuery = getLocationsQuery(locale);
  const data = await client.fetch(locationsQuery);
  const locations = data?.locations || [];

  // Helper to construct Google Maps URL
  const getMapLink = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground font-sans leading-relaxed">
            {t("description")}
          </p>
        </Reveal>
      </section>

      {/* Locations Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {locations.map((location: any, index: number) => (
            <Reveal key={location._key} delay={index * 200} className="h-full">
              <LocationCard
                city={location.city}
                address={location.address}
                phone={location.phone}
                scheduleLabel={t("schedule_label")}
                schedule={location.schedule}
                cta={t("cta_route")}
                mapLink={getMapLink(location.address)}
                imageColor={location.imageColor}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT (Unchanged logic, just renders the UI) ---

interface ScheduleItem {
  days: string;
  time: string;
}

interface LocationCardProps {
  city: string;
  address: string;
  phone: string;
  scheduleLabel: string;
  schedule: ScheduleItem[];
  cta: string;
  mapLink: string;
  imageColor: string;
}

function LocationCard({
  city,
  address,
  phone,
  scheduleLabel,
  schedule,
  cta,
  mapLink,
  imageColor,
}: LocationCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      {/* Decorative Top Bar */}
      <div
        className={`h-32 ${imageColor} relative flex items-center justify-center`}
      >
        {/* Icon Overlay */}
        <div className="bg-white p-4 rounded-full shadow-md mt-12 transform transition-transform group-hover:scale-110">
          <svg
            className="w-8 h-8 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>

      <div className="p-8 pt-12 flex-grow flex flex-col text-center">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
          {city}
        </h2>

        {/* Contact Info */}
        <div className="space-y-2 mb-8 text-muted-foreground font-sans">
          <p className="text-lg">{address}</p>
          <a
            href={`tel:${phone}`}
            className="block text-primary font-bold hover:underline"
          >
            {phone}
          </a>
        </div>

        <div className="w-full h-px bg-stone-100 mb-8"></div>

        {/* Hours */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
            {scheduleLabel}
          </h3>
          <ul className="space-y-3">
            {schedule.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-foreground font-medium border-b border-stone-100 pb-2 last:border-0"
              >
                <span>{item.days}</span>
                <span className="font-bold">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <Link
            href={mapLink}
            target="_blank"
            className="block w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors uppercase tracking-widest text-sm"
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
