import "./globals.css";
import { MiniKitContextProvider } from '@/providers/MiniKitProvider';
import {
  MINI_APP_BASE_APP_ID,
  MINI_APP_DESCRIPTION,
  MINI_APP_NAME,
  MINI_APP_SHORT_NAME,
  getMiniAppAssets,
  getMiniAppUrl,
  normalizeHexColor,
} from "@/utils/miniapp";

const assets = getMiniAppAssets();
const appUrl = getMiniAppUrl();

export const metadata = {
  title: MINI_APP_NAME,
  description: MINI_APP_DESCRIPTION,
  metadataBase: new URL(appUrl),
  site_name: MINI_APP_NAME,
  openGraph: {
    title: MINI_APP_NAME,
    description: MINI_APP_DESCRIPTION,
    siteName: MINI_APP_NAME,
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: MINI_APP_NAME,
    description: MINI_APP_DESCRIPTION,
    siteId: "",
    creator: "@__chamaquito",
    creatorId: "",
  },
  category: "art center",
  other: {
    "base:app_id": MINI_APP_BASE_APP_ID,
    "fc:miniapp": JSON.stringify({
      version: process.env.NEXT_PUBLIC_VERSION || "next",
      imageUrl: assets.embedImageUrl,
      button: {
        title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME}`,
        action: {
          type: "launch_miniapp",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME,
          url: appUrl,
          splashImageUrl: assets.splashImageUrl,
          splashBackgroundColor: normalizeHexColor(process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR),
        },
      },
    }),
    "fc:frame": JSON.stringify({
      version: process.env.NEXT_PUBLIC_VERSION || "next",
      imageUrl: assets.embedImageUrl,
      button: {
        title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME}`,
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME,
          url: appUrl,
          splashImageUrl: assets.splashImageUrl,
          splashBackgroundColor: normalizeHexColor(process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR),
        },
      },
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  );
}
