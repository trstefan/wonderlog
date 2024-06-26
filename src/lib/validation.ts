import { z } from "zod";
import { locationTypes, temperatureTypes } from "./place-types";

const requiredString = z.string().min(1, "Required");

export const createPlaceSchema = z.object({
  name: requiredString.max(100),
  temperatureType: requiredString.refine(
    (value) => temperatureTypes.includes(value),
    "Invalid Temperature Type"
  ),
  locationType: requiredString.refine(
    (value) => locationTypes.includes(value),
    "Invalid locationType"
  ),
});

export type CreatePlaceValues = z.infer<typeof createPlaceSchema>;

export const placeFilterSchema = z.object({
  q: z.string().optional(),
  locationType: z.string().optional(),
  temperatureType: z.string().optional(),
  isVisited: z.coerce.boolean().optional(),
});

export type placeFilterValues = z.infer<typeof placeFilterSchema>;
