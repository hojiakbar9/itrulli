import FeaturedFlavors from "../componets/FeaturedFlavors";
import Hero from "../componets/Hero";
import OurStory from "../componets/OurStory";
import Testimonials from "../componets/Testimonials";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
      <FeaturedFlavors locale={locale} />
      <OurStory locale={locale} />
      <Testimonials locale={locale} />
    </main>
  );
}
