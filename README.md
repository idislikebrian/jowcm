# JOWCM Site

Frontend for the `Journaling Outdoors Would Cure Me` hotline project.

This repo currently focuses on the public-facing site and share-preview experience:
- homepage and interactive UI
- weekly prompt display logic
- dynamic Open Graph image generation
- Base mini app metadata and splash behavior
- Farcaster/Base Mini App manifest and save/add support
- local mock APIs for future product flows

Twilio logic has been removed from this repo and now lives in a separate backend project.

## Local Development

From [site](/site):

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Notes

### Weekly Prompt Logic

The homepage ticker, prompt modal, and OG image all share the same prompt source of truth in [src/utils/prompts.js](/src/utils/prompts.js).

- `PROMPT_CYCLE` contains the rotating prompt list
- `getISOWeek()` computes the active ISO week
- `getPromptForWeek()` derives the prompt for a given week
- `getCurrentPrompt()` returns the current live prompt

### Dynamic Open Graph Image

The homepage uses a dynamic social image route at [src/app/api/og/home/route.js](/src/app/api/og/home/route.js).

Useful local URLs:
- Home page: [http://localhost:3000](http://localhost:3000)
- OG image: [http://localhost:3000/api/og/home](http://localhost:3000/api/og/home)
- Week-specific OG image: [http://localhost:3000/api/og/home?week=14](http://localhost:3000/api/og/home?week=14)

The image is week-aware so social crawlers can refresh as the prompt rotates.

### Mini App Foundation

The app now includes a Mini App manifest endpoint and a frontend-only save/add flow for compatible clients.

Key pieces:
- manifest: [src/app/.well-known/farcaster.json/route.js](/Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/site/src/app/.well-known/farcaster.json/route.js)
- shared Mini App config: [src/utils/miniapp.js](/Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/site/src/utils/miniapp.js)
- MiniKit provider: [src/providers/MiniKitProvider.js](/Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/site/src/providers/MiniKitProvider.js)
- splash/readiness flow: [src/components/MiniDialSplash.js](/Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/site/src/components/MiniDialSplash.js)
- save/add CTA: [src/components/MiniAppActions.js](/Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/site/src/components/MiniAppActions.js)

Useful local URLs:
- manifest: [http://localhost:3000/.well-known/farcaster.json](http://localhost:3000/.well-known/farcaster.json)
- OG image: [http://localhost:3000/api/og/home](http://localhost:3000/api/og/home)

Current Mini App asset/source-of-truth setup:
- home URL: `NEXT_PUBLIC_URL` or production domain fallback
- icon: `/favicon.png`
- splash: `/splash.png`
- OG / hero image: `/api/og/home`

### Account Association

This repo is prepared for account association, but does not generate the signed values for you.

Before public indexing/discovery, generate and provide:
- `FARCASTER_HEADER`
- `FARCASTER_PAYLOAD`
- `FARCASTER_SIGNATURE`

Those values populate the manifest `accountAssociation` block. Until then, the manifest is present but not fully verified for production discovery.

### Mini App Notes

- The save/add CTA only appears inside a compatible Mini App client.
- The custom splash now calls frame readiness through MiniKit once the splash animation finishes.
- Authentication, notifications, and backend token persistence are intentionally deferred for a later phase.

## Mock Prompt Blast API

For future prompt-broadcast work, this repo includes a local mock API that simulates a prompt blast without Twilio.

Route:
- `POST /api/mock/prompt-blast`
- `GET /api/mock/prompt-blast`

### What it does

- accepts a message payload
- validates basic input
- simulates sending to a small mock subscriber list
- returns a JSON summary and per-recipient mock delivery results
- does not send SMS, store data, or require external services

### Example Requests

Inspect the mock list:

```bash
curl http://localhost:3000/api/mock/prompt-blast
```

Simulate a blast:

```bash
curl -X POST http://localhost:3000/api/mock/prompt-blast \
  -H "Content-Type: application/json" \
  -d '{"message":"This week'\''s prompt is live. Call 601 OUT SIDE."}'
```

### Example Response Shape

```json
{
  "ok": true,
  "mode": "mock",
  "message": "This week's prompt is live. Call 601 OUT SIDE.",
  "sentTo": 3,
  "successCount": 3,
  "errorCount": 0,
  "results": [
    {
      "to": "+15555550101",
      "status": "mock-sent",
      "mockId": "mock-1"
    }
  ]
}
```

This route is meant to give the frontend and future backend a lightweight contract to build against before real messaging is wired back in.

## Build

```bash
npm run build
```

## Deployment

The site is production-ready as a standalone frontend.

Before deploying:
- verify the homepage loads
- verify [http://localhost:3000/.well-known/farcaster.json](http://localhost:3000/.well-known/farcaster.json) returns valid JSON locally
- verify [http://localhost:3000/api/og/home](http://localhost:3000/api/og/home) renders locally
- verify the metadata on the homepage points to the dynamic OG image
- verify Mini App assets and manifest values use the intended production domain

## Environment Notes

The app may use values from `.env.local` for MiniKit / onchain metadata and stream behavior. Twilio credentials are no longer required in this repo.
