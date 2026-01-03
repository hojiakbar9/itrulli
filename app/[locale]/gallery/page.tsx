import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Reveal from "@/app/componets/Reveal";
import GalleryGrid from "@/app/componets/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerie | iTrulli Gelateria",
  description:
    "Fotos von unserem hausgemachten Eis, unserem Café und dem Team.",
};

interface GalleryProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: GalleryProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground font-sans leading-relaxed">
            {t("description")}
          </p>
        </Reveal>
      </section>

      {/* The Grid Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid />
      </div>
    </div>
  );
}
