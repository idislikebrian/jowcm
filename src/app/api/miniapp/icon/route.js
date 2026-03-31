import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  const phoneImageUrl = new URL("/phone-02.svg", request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "256px",
          height: "256px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffff1",
          borderRadius: "52px",
          border: "10px solid #111111",
        }}
      >
        <img
          src={phoneImageUrl}
          alt="JOWCM phone icon"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      width: 256,
      height: 256,
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400",
      },
    }
  );
}
