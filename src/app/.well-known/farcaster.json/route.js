import { NextResponse } from "next/server";
import { getMiniAppManifest } from "@/utils/miniapp";

export function GET() {
  return NextResponse.json(getMiniAppManifest(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
