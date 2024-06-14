import { cache } from "react";
import prisma from "@/lib/primsa";
import { notFound } from "next/navigation";
import { Metadata } from "next";
interface PageProps {
  params: { slug: string };
}

const getPlace = cache(async (slug: string) => {
  const place = await prisma.place.findUnique({ where: { slug } });

  if (!place) notFound();

  return place;
});
export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const place = await getPlace(slug);

  return {
    title: place.name,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const place = await getPlace(slug);

  return (
    <main>
      <h1>Hello from Place's page</h1>
    </main>
  );
}
