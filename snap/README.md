# JOWCM Snap

Minimal Farcaster Snap for `Journaling Outdoors Would Cure Me`.

## What It Does

- serves the initial journaling page from `GET /`
- handles all interactions in a single `registerSnapHandler(app, handler)` callback
- uses `/?view=submit` and `/?view=start` query params to distinguish submit vs reset while staying on `/`
- stays stateless for v1

## Requirements

- Node `22.22.0`

## Install

```bash
cd /Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/snap
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22.22.0
npm install
```

## Local Run

```bash
cd /Users/brian/Documents/00-cobalt/00-studio-stuff/hotline/snap
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22.22.0
PORT=3003 SKIP_JFS_VERIFICATION=1 SNAP_PUBLIC_BASE_URL=http://localhost:3003 npm run dev
```

## Local Checks

Initial page:

```bash
curl -H 'Accept: application/vnd.farcaster.snap+json' http://localhost:3003/
```

Submit page:

```bash
curl -X POST 'http://localhost:3003/?view=submit' \
  -H 'Accept: application/vnd.farcaster.snap+json' \
  -H 'Content-Type: application/json' \
  -d '{"action":{"type":"submit","inputs":{"response":"I am avoiding being perceived"}}}'
```

Reset page:

```bash
curl -X POST 'http://localhost:3003/?view=start' \
  -H 'Accept: application/vnd.farcaster.snap+json' \
  -H 'Content-Type: application/json' \
  -d '{"action":{"type":"submit","inputs":{"response":""}}}'
```

## Vercel

Set this environment variable in Vercel:

```bash
SNAP_PUBLIC_BASE_URL=https://snap.journalingoutdoorswouldcureme.live
```

Optional for local-only development:

```bash
SKIP_JFS_VERIFICATION=1
```

## Emulator

Use the Farcaster Snap emulator and point it at:

- local: `http://localhost:3003/`
- production: `https://snap.journalingoutdoorswouldcureme.live/`
