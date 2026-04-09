import { registerSnapHandler } from "@farcaster/snap-hono";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = new Hono();
const skipJFSVerification = true;
const moods = {
  stuck: [
    "same thought, different minute",
    "this isn’t moving",
    "you’ve looked at this long enough",
    "the room keeps repeating itself",
  ],
  spiraling: [
    "you’re deep in it right now",
    "this gets louder the longer you stay",
    "you don’t need to solve this indoors",
    "the thought is starting to eat the walls",
  ],
  bored: [
    "nothing new is going to happen here",
    "you’ve reached the end of this scroll",
    "you’re not even enjoying this",
    "the hour has gone soft around you",
  ],
  tired: [
    "this isn’t sleep tired",
    "you’ve been still too long",
    "your body knows before you do",
    "your edges are asking for air",
  ],
  avoiding: [
    "you already know what it is",
    "it’s still there when you close this",
    "you’re circling it",
    "the door is already open",
  ],
  scrolling: [
    "this is autopilot",
    "you didn’t come here for anything",
    "you can stop",
    "your thumb is wandering without you",
  ],
} as const;

type MoodKey = keyof typeof moods;

const lastLineByMood: Partial<Record<MoodKey, string>> = {};

app.use("*", async (c, next) => {
  c.header("Vary", "Accept");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");

  await next();

  c.header("Vary", "Accept");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
});

app.options("*", (c) => {
  return c.body(null, 200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
});

const isMoodKey = (value: string | null): value is MoodKey => {
  return value !== null && value in moods;
};

const randomFrom = (mood: MoodKey) => {
  const options = moods[mood];
  const previous = lastLineByMood[mood];
  const pool =
    previous && options.length > 1
      ? options.filter((line) => line !== previous)
      : options;
  const line = pool[Math.floor(Math.random() * pool.length)] ?? options[0];

  lastLineByMood[mood] = line;
  return line;
};

const renderStartPage = (baseUrl: string) => ({
  version: "1.0" as const,
  theme: { accent: "green" as const },
  ui: {
    root: "page",
    elements: {
      page: {
        type: "stack",
        props: {},
        children: [
          "title",
          "stuck",
          "spiraling",
          "bored",
          "tired",
          "avoiding",
          "scrolling",
        ],
      },
      title: {
        type: "text",
        props: {
          content: "where are you right now",
          weight: "bold",
          align: "center",
        },
      },
      stuck: {
        type: "button",
        props: {
          label: "stuck",
          variant: "primary",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?mood=stuck` },
          },
        },
      },
      spiraling: {
        type: "button",
        props: {
          label: "spiraling",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?mood=spiraling` },
          },
        },
      },
      bored: {
        type: "button",
        props: {
          label: "bored",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?mood=bored` },
          },
        },
      },
      tired: {
        type: "button",
        props: {
          label: "tired",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?mood=tired` },
          },
        },
      },
      avoiding: {
        type: "button",
        props: {
          label: "avoiding",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?mood=avoiding` },
          },
        },
      },
      scrolling: {
        type: "button",
        props: {
          label: "scrolling",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?mood=scrolling` },
          },
        },
      },
    },
  },
});

const renderResponsePage = (baseUrl: string, line: string) => ({
  version: "1.0" as const,
  theme: { accent: "green" as const },
  ui: {
    root: "page",
    elements: {
      page: {
        type: "stack",
        props: {},
        children: ["line", "instruction", "call", "actions", "footer"],
      },
      line: {
        type: "text",
        props: {
          content: line,
          weight: "bold",
        },
      },
      instruction: {
        type: "text",
        props: {
          content: "take this outside",
        },
      },
      call: {
        type: "text",
        props: {
          content: "Call: 601-OUT-SIDE",
        },
      },
      actions: {
        type: "stack",
        props: { direction: "vertical" },
        children: ["radio", "voicemail", "again"],
      },
      radio: {
        type: "button",
        props: {
          label: "play the radio",
        },
        on: {
          press: {
            action: "open_url",
            params: {
              target: "https://journalingoutdoorswouldcureme.live",
            },
          },
        },
      },
      voicemail: {
        type: "button",
        props: {
          label: "say it out loud",
        },
        on: {
          press: {
            action: "open_url",
            params: {
              target: "tel:6016887433",
            },
          },
        },
      },
      again: {
        type: "button",
        props: {
          label: "another one",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?reset=1` },
          },
        },
      },
      footer: {
        type: "text",
        props: {
          content: "tap when you step outside",
        },
      },
    },
  },
});

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );

  return Buffer.from(padded, "base64").toString("utf8");
};

const extractLoosePostPayload = (body: unknown) => {
  if (!body || typeof body !== "object") {
    return null;
  }

  if ("payload" in body && typeof body.payload === "string") {
    try {
      const decoded = JSON.parse(decodeBase64Url(body.payload));
      return decoded && typeof decoded === "object" ? decoded : null;
    } catch {
      return null;
    }
  }

  return body;
};

app.post("/", async (c) => {
  const baseUrl =
    process.env.SNAP_PUBLIC_BASE_URL ??
    "https://snap.journalingoutdoorswouldcureme.live";
  const acceptHeader = c.req.header("accept");
  const url = new URL(c.req.url);
  const mood = url.searchParams.get("mood");
  const reset = url.searchParams.get("reset");

  let parsedBody: unknown;
  try {
    parsedBody = await c.req.json();
  } catch {
    return c.json({ error: "request body is not valid JSON" }, 400);
  }

  const payload = extractLoosePostPayload(parsedBody);
  if (!payload || typeof payload !== "object") {
    return c.json({ error: "invalid POST body" }, 400);
  }

  const postAction = {
    type: "post" as const,
    fid: typeof payload.fid === "number" ? payload.fid : 0,
    inputs:
      payload.inputs && typeof payload.inputs === "object" ? payload.inputs : {},
    timestamp:
      typeof payload.timestamp === "number"
        ? payload.timestamp
        : Math.floor(Date.now() / 1000),
    button_index:
      typeof payload.button_index === "number" ? payload.button_index : 0,
  };

  console.log("snap request", {
    actionType: postAction.type,
    action: postAction,
    accept: acceptHeader,
    skipJFSVerification,
    snapPublicBaseUrl: process.env.SNAP_PUBLIC_BASE_URL ?? null,
  });

  if (reset === "1") {
    return c.body(JSON.stringify(renderStartPage(baseUrl)), 200, {
      "Content-Type": "application/vnd.farcaster.snap+json",
    });
  }

  if (!isMoodKey(mood)) {
    return c.body(JSON.stringify(renderStartPage(baseUrl)), 200, {
      "Content-Type": "application/vnd.farcaster.snap+json",
    });
  }

  return c.body(JSON.stringify(renderResponsePage(baseUrl, randomFrom(mood))), 200, {
    "Content-Type": "application/vnd.farcaster.snap+json",
  });
});

registerSnapHandler(
  app,
  async (ctx) => {
    const baseUrl =
      process.env.SNAP_PUBLIC_BASE_URL ??
      "https://snap.journalingoutdoorswouldcureme.live";
    const url = new URL(ctx.request.url);
    const mood = url.searchParams.get("mood");
    const reset = url.searchParams.get("reset");
    const acceptHeader = ctx.request.headers.get("accept");

    console.log("snap request", {
      actionType: ctx.action.type,
      action: ctx.action,
      accept: acceptHeader,
      skipJFSVerification,
      snapPublicBaseUrl: process.env.SNAP_PUBLIC_BASE_URL ?? null,
    });

    if (ctx.action.type === "get") {
      return renderStartPage(baseUrl);
    }

    if (ctx.action.type === "post") {
      if (reset === "1" || !isMoodKey(mood)) {
        return renderStartPage(baseUrl);
      }

      return renderResponsePage(baseUrl, randomFrom(mood));
    }

    return renderStartPage(baseUrl);
  },
  {
    path: "/",
    skipJFSVerification,
  },
);
const entryFilePath = fileURLToPath(import.meta.url);
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (entryFilePath === invokedPath) {
  const port = Number(process.env.PORT ?? 3003);

  serve({
    fetch: app.fetch,
    port,
  });

  console.log(`Snap server listening on http://localhost:${port}`);
}

export default app;
