import { NextResponse } from "next/server";

const MOCK_SUBSCRIBERS = [
  "+15555550101",
  "+15555550102",
  "+15555550103",
];

function buildMockResult(to, index) {
  return {
    to,
    status: "mock-sent",
    mockId: `mock-${index + 1}`,
  };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: "mock",
    subscriberCount: MOCK_SUBSCRIBERS.length,
    subscribers: MOCK_SUBSCRIBERS,
  });
}

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const message = body?.message?.trim();

  if (!message) {
    return NextResponse.json(
      {
        ok: false,
        mode: "mock",
        error: "A non-empty `message` field is required.",
      },
      { status: 400 }
    );
  }

  const results = MOCK_SUBSCRIBERS.map(buildMockResult);

  return NextResponse.json({
    ok: true,
    mode: "mock",
    message,
    sentTo: MOCK_SUBSCRIBERS.length,
    successCount: results.length,
    errorCount: 0,
    requestedAt: new Date().toISOString(),
    results,
  });
}
