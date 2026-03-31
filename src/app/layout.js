import "./globals.css";
import { MiniKitContextProvider } from '@/providers/MiniKitProvider';
import {
  MINI_APP_BASE_APP_ID,
  MINI_APP_DESCRIPTION,
  MINI_APP_NAME,
  MINI_APP_SHORT_NAME,
  MINI_APP_SPLASH_BACKGROUND,
  getMiniAppAssets,
  getMiniAppUrl,
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
    "fc:frame": JSON.stringify({
      version: process.env.NEXT_PUBLIC_VERSION || "next",
      imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || assets.ogImageUrl,
      button: {
        title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME}`,
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME,
          url: appUrl,
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL || assets.splashImageUrl,
          splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || MINI_APP_SPLASH_BACKGROUND,
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
