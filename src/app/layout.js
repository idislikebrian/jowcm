import "./globals.css";

export const metadata = {
  title: "Journaling Outdoors Would Cure Me",
  description: "Call in. Speak your truth after the tone.",
  url: "https://journalingoutdoorswouldcureme.live", 
  metadataBase: new URL('https://journalingoutdoorswouldcureme.live'),
  site_name: "Journaling Outdoors Would Cure Me", 
  image: {
    url: "/opengraph-image.png",
    type: "image/png", 
    width: 1200, 
    height: 630
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journaling Outdoors Would Cure Me',
    description: 'Call in. Speak your truth after the tone.',
    siteId: '',
    creator: '@__chamaquito',
    creatorId: '',
  },
  category: 'art center',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="ibm-sans">{children}</body>
    </html>
  );
}
