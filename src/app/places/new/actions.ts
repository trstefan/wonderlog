"use server";

import { toSlug } from "@/lib/utils";
import { createPlaceSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import prisma from "@/lib/primsa";
import { redirect } from "next/navigation";
import path from "path";
import { put } from "@vercel/blob";

export async function createPlacePosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    name,
    temperatureType,
    location,
    link,
    locationType,
    status,
    locationPicture,
    description,
  } = createPlaceSchema.parse(values);

  const slug = `${toSlug(name)}-${nanoid(10)}`;

  let picture: string | undefined = undefined;

  if (locationPicture) {
    const blob = await put(
      `location_pictures/${slug}${path.extname(locationPicture.name)}`,
      locationPicture,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );

    picture = blob.url;
  }

  await prisma.place.create({
    data: {
      slug,
      name: name.trim(),
      locationType,
      location,
      link,
      temperatureType,
      status,
      picture,
      description: description?.trim(),
    },
  });

  redirect("/place-submitted");
}
