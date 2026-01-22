"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { client, fetchSanityData } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const getIceLabQuery = (locale: string) => `*[_type == "iceLab" && _id == "iceLab"][0]{
  "headline": headline.${locale},
  "description": description.${locale},
  videoFile{asset->{url}},
  videoThumbnail,
  "ctaText": ctaText.${locale},
  ctaLink,
}`;

interface IceLabPageProps {
  params: Promise<{ locale: string }>;
}

interface IceLabData {
  headline: string;
  description: string;
  videoFile: { asset: { url: string } } | null;
  videoThumbnail: any;
  ctaText: string;
  ctaLink: string;
}

export default function IceLabPage({ params }: IceLabPageProps) {
  const t = useTranslations("IceLab");
  const [locale, setLocale] = useState<string>("");
  const [data, setData] = useState<IceLabData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);

      const query = getIceLabQuery(resolvedParams.locale);
      const { data: iceLabData, error: fetchError } = await fetchSanityData(query);

      if (fetchError || !iceLabData) {
        setError(fetchError || "Failed to load ice lab data");
      } else {
        setData(iceLabData);
      }
      setIsLoading(false);
    };

    loadData();
  }, [params]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">Failed to load ice lab video</p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </main>
    );
  }

  const getVideoUrl = () => {
    if (data && data.videoFile && data.videoFile.asset && data.videoFile.asset.url) {
      return data.videoFile.asset.url;
    }
    return null;
  };

  const videoUrl = getVideoUrl();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Video */}
      <section className="py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              {data.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {data.description}
            </p>
          </div>

          {/* Video Container */}
          <div className="mb-16">
            <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl aspect-video">
              {videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster={
                    data.videoThumbnail
                      ? urlFor(data.videoThumbnail).url()
                      : undefined
                  }
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-center px-6">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                      {t("noVideo_title")}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {t("noVideo_message")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          {data.ctaText && data.ctaLink && (
            <div className="flex justify-center">
              <Link
                href={data.ctaLink}
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                {data.ctaText}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
