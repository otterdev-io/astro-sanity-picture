import type { SanityPictureDefaults } from "types";
/**
 * The default values for sanityPictureDefaults
 * The width has been picked to full-width images for up to 1920px @2x screens
 */
export const defaultSanityPictureDefaults: SanityPictureDefaults = {
  autoWidths: {
    maxWidth: 3840,
    maxDivisions: 12,
    step: 320,
  },
  withWebp: true,
  style: {
    display: "flex",
    alignItems: "stretch",
    backgroundSize: "cover",
  },
  img: {
    loading: "lazy",
    style: { width: "100%", height: "auto", objectFit: "cover" },
  },
  lqip: { enabled: true, transitionDuration: 350 },
};

export function setSanityPictureDefaults(
  defaults: Partial<SanityPictureDefaults>
) {
  if (!globalThis.sanityPictureDefaults) {
    globalThis.sanityPictureDefaults = defaultSanityPictureDefaults;
  }
  Object.entries(defaults).forEach(([k, v]) => {
    //@ts-expect-error keys don't match up
    globalThis.sanityPictureDefaults[k] = v;
  });
}
