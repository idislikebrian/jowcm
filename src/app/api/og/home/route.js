import { ImageResponse } from "next/og";
import { getISOWeek, getPromptForWeek } from "@/utils/prompts";

export const runtime = "edge";

const PHONE_MNEMONIC = "601 OUT SIDE";
const PHONE_NUMBER = "(601) 688-7433";

function normalizeWeek(value) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : getISOWeek();
}

function trimPrompt(prompt, maxLength = 165) {
  if (prompt.length <= maxLength) {
    return prompt;
  }

  return `${prompt.slice(0, maxLength - 1).trimEnd()}...`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const week = normalizeWeek(searchParams.get("week"));
  const prompt = trimPrompt(getPromptForWeek(week));
  const phoneImageUrl = new URL("/phone-02.svg", request.url).toString();

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#fffff1",
        color: "#111111",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <img
        src={phoneImageUrl}
        alt="Phone"
        style={{
          position: "absolute",
          top: "36px",
          right: "42px",
          width: "200px",
          height: "200px",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "42px",
          left: "48px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "999px",
              background: "#EE2526",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#EE2526",
            }}
          >
            Journaling Outdoors Would Cure Me
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "92px 52px 44px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#AEB8A0",
              marginTop: "20px",
            }}
          >
            Call in and ramble on
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "1000px",
              fontSize: "112px",
              lineHeight: 0.88,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              color: "#29378B",
              textTransform: "uppercase",
            }}
          >
            {PHONE_MNEMONIC}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "36px",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#351E28",
            }}
          >
            {PHONE_NUMBER}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "28px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#FFFFFF",
              border: "2px dashed #111111",
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#EE2526",
              }}
            >
              This week
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "35px",
                lineHeight: 1.18,
                fontWeight: 700,
                color: "#111111",
              }}
            >
              {prompt}
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400",
      },
    },
  );
}
