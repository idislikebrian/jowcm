import { getISOWeek } from "@/utils/prompts";

export const MINI_APP_NAME = "Journaling Outdoors Would Cure Me";
export const MINI_APP_SHORT_NAME = "JOWCM";
export const MINI_APP_DESCRIPTION = "Call in. Speak your truth after the tone.";
export const MINI_APP_SUBTITLE = "Hotline journaling, live and social";
export const MINI_APP_TAGLINE = "Call 601 OUT SIDE";
export const MINI_APP_PRIMARY_CATEGORY = "social";
export const MINI_APP_TAGS = ["hotline", "journaling", "art", "voice", "social"];
export const MINI_APP_SPLASH_BACKGROUND = "#FED41D";
export const MINI_APP_BASE_APP_ID = "696fb9fdf22fe462e74c1700";

export function getMiniAppUrl() {
  return process.env.NEXT_PUBLIC_URL || "https://journalingoutdoorswouldcureme.live";
}

export function getMiniAppAssets() {
  const rootUrl = getMiniAppUrl();

  return {
    rootUrl,
    iconUrl: `${rootUrl}/favicon.png`,
    splashImageUrl: `${rootUrl}/splash.png`,
    heroImageUrl: `${rootUrl}/api/og/home`,
    ogImageUrl: `${rootUrl}/api/og/home?week=${getISOWeek()}`,
    screenshotUrls: [`${rootUrl}/api/og/home`],
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
      name: MINI_APP_NAME,
      homeUrl: assets.rootUrl,
      iconUrl: assets.iconUrl,
      imageUrl: assets.ogImageUrl,
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
      ogTitle: MINI_APP_NAME,
      ogDescription: MINI_APP_DESCRIPTION,
      ogImageUrl: assets.ogImageUrl,
      noindex: process.env.NODE_ENV !== "production",
    },
  };
}
