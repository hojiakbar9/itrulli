import Hero from "../componets/Hero";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
    </main>
  );
}
