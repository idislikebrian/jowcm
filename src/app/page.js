import HomePageClient from "./HomePageClient";
import { getCurrentPrompt, getISOWeek } from "@/utils/prompts";

export function generateMetadata() {
  const week = getISOWeek();
  const prompt = getCurrentPrompt();
  const imageUrl = `/api/og/home?week=${week}`;

  return {
    title: "Journaling Outdoors Would Cure Me",
    description: prompt,
    openGraph: {
      title: "Journaling Outdoors Would Cure Me",
      description: prompt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `601 OUT SIDE. Current prompt: ${prompt}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Journaling Outdoors Would Cure Me",
      description: prompt,
      images: [imageUrl],
    },
  };
}

export default function Home() {
  return <HomePageClient />;
}
