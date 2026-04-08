import { getISOWeek } from "@/utils/prompts";

export const MINI_APP_NAME = "Journaling Outdoors Would Cure Me";
export const MINI_APP_SHORT_NAME = "JOWCM";
export const MINI_APP_DESCRIPTION = "Call in. Speak your truth after the tone.";
export const MINI_APP_MANIFEST_NAME = "Journaling Outdoors Hotline";
export const MINI_APP_SUBTITLE = "Call 601 OUT SIDE";
export const MINI_APP_TAGLINE = "Call 601 OUT SIDE";
export const MINI_APP_PRIMARY_CATEGORY = "social";
export const MINI_APP_TAGS = ["hotline", "journaling", "art", "voice", "social"];
export const MINI_APP_SPLASH_BACKGROUND = "#FED41D";

export function normalizeHexColor(value, fallback = MINI_APP_SPLASH_BACKGROUND) {
  if (!value) {
    return fallback;
  }

  const trimmed = value.trim();
  const prefixed = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;

  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(prefixed)
    ? prefixed
    : fallback;
}

export function getMiniAppUrl() {
  return process.env.NEXT_PUBLIC_URL || "https://journalingoutdoorswouldcureme.live";
}

export function getMiniAppAssets() {
  const rootUrl = getMiniAppUrl();
  const currentWeek = getISOWeek();
  const embedImageUrl = `${rootUrl}/api/miniapp/embed?week=${currentWeek}`;

  return {
    rootUrl,
    iconUrl: `${rootUrl}/api/miniapp/icon`,
    splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL || `${rootUrl}/splash.png`,
    heroImageUrl: `${rootUrl}/api/og/home`,
    embedImageUrl,
    ogImageUrl: `${rootUrl}/api/og/home?week=${currentWeek}`,
    screenshotUrls: [embedImageUrl],
  };
}

export function isMiniAppContext(context) {
  return Boolean(context?.client);
}

export function getMiniAppManifest() {
  const assets = getMiniAppAssets();

  return {
    accountAssociation: {
      header: process.env.FARCASTER_HEADER || "",
      payload: process.env.FARCASTER_PAYLOAD || "",
      signature: process.env.FARCASTER_SIGNATURE || "",
    },
    miniapp: {
      version: "1",
      name: MINI_APP_MANIFEST_NAME,
      homeUrl: assets.rootUrl,
      iconUrl: assets.iconUrl,
      imageUrl: assets.embedImageUrl,
      buttonTitle: `Launch ${MINI_APP_SHORT_NAME}`,
      splashImageUrl: assets.splashImageUrl,
      splashBackgroundColor: MINI_APP_SPLASH_BACKGROUND,
      subtitle: MINI_APP_SUBTITLE,
      description: MINI_APP_DESCRIPTION,
      screenshotUrls: assets.screenshotUrls,
      primaryCategory: MINI_APP_PRIMARY_CATEGORY,
      tags: MINI_APP_TAGS,
      heroImageUrl: assets.heroImageUrl,
      tagline: MINI_APP_TAGLINE,
      ogTitle: MINI_APP_MANIFEST_NAME,
      ogDescription: MINI_APP_DESCRIPTION,
      ogImageUrl: assets.embedImageUrl,
      noindex: process.env.NODE_ENV !== "production",
    },
  };
}
