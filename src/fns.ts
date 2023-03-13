import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type {
  AutoWidths,
  SanityDimensionedImage,
  SanityImageWithLqip,
} from "./types";

/**
 * Perform a shallow (non-recursive) merge of multiple objects
 * Equivalent to {...a, ...b, ...etc}, just a bit more terse
 * @param items objects to merge
 * @returns merged object
 */
export function shallowMerge<T extends Record<string, any>>(...items: T[]): T {
  let merged = {} as T;
  items.forEach((item) => {
    Object.entries(item).forEach(([k, v]) => {
      merged[k as keyof T] = v;
    });
  });
  return merged;
}

/**
 * Single-level recursive merge
 * @param items objects to merge
 * @returns merged object
 */
export function mergeSingleRecursive<T extends Record<string, any>>(
  ...items: T[]
): T {
  let merged = {} as T;
  items.forEach((item) => {
    Object.entries(item).forEach(([k, v]) => {
      merged[k as keyof T] =
        merged[k] && v && typeof v === "object"
          ? shallowMerge(merged[k], v)
          : v;
    });
  });
  return merged;
}

/**
 * Guard whether our provided image has dimensions
 * @param image
 */
export function isSanityDimensionedImage(
  image: SanityImageSource
): image is SanityDimensionedImage {
  return (
    typeof image == "object" &&
    "asset" in image &&
    "metadata" in image.asset &&
    "dimensions" in image.asset.metadata
  );
}

/**
 * Guard whether our provided image has an lqip
 * @param image
 */
export function isSanityImageWithLqip(
  image: SanityImageSource
): image is SanityImageWithLqip {
  return (
    typeof image == "object" &&
    "asset" in image &&
    "metadata" in image.asset &&
    "lqip" in image.asset.metadata
  );
}

/**
 * Calculate automatically determined widths for an image
 * Maximum width is bounded by autoWidths.maxWidth
 * Number of divisions is the minimum of (maxWidth / autoWidths.step), and autoWidths.maxDivisions
 * @param autoWidths autowidths settings to use
 * @param image image to calculate off of
 * @returns array of widths
 */
export function generateWidths(
  autoWidths: AutoWidths,
  image: SanityImageSource
): number[] {
  const maxWidth = isSanityDimensionedImage(image)
    ? image.asset.metadata.dimensions.width
    : autoWidths.maxWidth;
  const divisions = Math.ceil(
    Math.min(maxWidth / autoWidths.step, autoWidths.maxDivisions)
  );
  const step = maxWidth / divisions;
  return Array.from({ length: divisions }, (_, i) =>
    Math.floor(step * (i + 1))
  );
}
