import { registerSnapHandler } from "@farcaster/snap-hono";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = new Hono();

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
        children: ["noted", "reflection", "restart", "visit-site"],
      },
      noted: {
        type: "text",
        props: {
          content: "Noted.",
          weight: "bold",
          align: "center",
        },
      },
      reflection: {
        type: "text",
        props: {
          content: "That sounds like something worth stepping outside for.",
          align: "center",
        },
      },
      restart: {
        type: "button",
        props: {
          label: "Another prompt",
          variant: "primary",
        },
        on: {
          press: {
            action: "submit",
            params: { target: `${baseUrl}/?view=start` },
          },
        },
      },
      "visit-site": {
        type: "button",
        props: {
          label: "Visit site",
        },
        on: {
          press: {
            action: "open_url",
            params: { target: "https://journalingoutdoorswouldcureme.live" },
          },
        },
      },
    },
  },
});

registerSnapHandler(app, async (ctx) => {
  const baseUrl =
    process.env.SNAP_PUBLIC_BASE_URL ??
    "https://snap.journalingoutdoorswouldcureme.live";
  const url = new URL(ctx.request.url);
  const view = url.searchParams.get("view");

  if (ctx.action.type === "get") {
    return renderStartPage(baseUrl);
  }

  if (view === "submit") {
    void ctx.action.inputs.response;
    return renderResponsePage(baseUrl);
  }

  if (view === "start") {
    return renderStartPage(baseUrl);
  }

  return renderStartPage(baseUrl);
});

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
