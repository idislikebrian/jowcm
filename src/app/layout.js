import "./globals.css";
import { MiniKitContextProvider } from '@/providers/MiniKitProvider';

export const metadata = {
  title: "Journaling Outdoors Would Cure Me",
  description: "Call in. Speak your truth after the tone.",
  url: "https://journalingoutdoorswouldcureme.live",
  metadataBase: new URL("https://journalingoutdoorswouldcureme.live"),
  site_name: "Journaling Outdoors Would Cure Me",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  image: {
    url: "/opengraph-image.png",
    type: "image/png",
    width: 1200,
    height: 630,
  },
  twitter: {
    card: "summary_large_image",
    title: "Journaling Outdoors Would Cure Me",
    description: "Call in. Speak your truth after the tone.",
    siteId: "",
    creator: "@__chamaquito",
    creatorId: "",
  },
  category: "art center",
  other: {
    "base:app_id": "696fb9fdf22fe462e74c1700",
    "fc:frame": JSON.stringify({
      version: process.env.NEXT_PUBLIC_VERSION || "next",
      imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL,
      button: {
        title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "JOWCM"}`,
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "JOWCM",
          url:
            process.env.NEXT_PUBLIC_URL ||
            "https://journalingoutdoorswouldcureme.live",
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL,
          splashBackgroundColor: `#${process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "FFFFFF"}`,
        },
      },
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="ibm-sans">
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  );
}
