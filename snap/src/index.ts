import { registerSnapHandler } from "@farcaster/snap-hono";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = new Hono();
const skipJFSVerification = true;

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

const renderStartPage = (baseUrl: string) => ({
  version: "1.0" as const,
  theme: { accent: "green" as const },
  ui: {
    root: "page",
    elements: {
      page: {
        type: "stack",
        props: {},
        children: ["title", "prompt", "response", "submit"],
      },
      title: {
        type: "text",
        props: {
          content: "Journaling Outdoors Would Cure Me",
          weight: "bold",
          align: "center",
        },
      },
      prompt: {
        type: "text",
        props: {
          content: "What are you avoiding by staying indoors today?",
          align: "center",
        },
      },
      response: {
        type: "input",
        props: {
          name: "response",
          label: "Your answer",
          placeholder: "Type your answer...",
          maxLength: 280,
        },
      },
      submit: {
        type: "button",
        props: {
          label: "Submit thought",
          variant: "primary",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?view=submit` },
          },
        },
      },
    },
  },
});

const renderResponsePage = (baseUrl: string) => ({
  version: "1.0" as const,
  theme: { accent: "green" as const },
  ui: {
    root: "page",
    elements: {
      page: {
        type: "stack",
        props: {},
        children: ["title", "message", "actions"],
      },
      title: {
        type: "text",
        props: {
          content: "Noted.",
          weight: "bold",
        },
      },
      message: {
        type: "text",
        props: {
          content: "That sounds like something worth stepping outside for.",
        },
      },
      actions: {
        type: "stack",
        props: { direction: "vertical" },
        children: ["again", "visit"],
      },
      again: {
        type: "button",
        props: {
          label: "Another prompt",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/` },
          },
        },
      },
      visit: {
        type: "button",
        props: {
          label: "Visit site",
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

  return c.body(JSON.stringify(renderResponsePage(baseUrl)), 200, {
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
    const view = url.searchParams.get("view");
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
      const response = ctx.action.inputs?.response;

      void response;
      return renderResponsePage(baseUrl);
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
