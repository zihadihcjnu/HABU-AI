# HABU Free AI + Mobile App (PWA)

## What this version does
- Uses Google Gemini API via the official `@google/genai` JavaScript SDK.
- Defaults to `gemini-3.8-flash` (check availability and free-tier quota in your AI Studio project).
- API key stays on the server in `.env`, never in browser code.
- Installable Progressive Web App (PWA): one responsive app for laptop and Android phone, with 192px and 512px icons.
- Bengali/English chat, browser speech input/output where supported, local browser chat history.
- Basic request validation, rate limiting, Helmet headers.

## Cost and free-tier limitations
Google AI Studio currently offers a Gemini API Free Tier for selected models, with limited quotas/rate limits. This is not unlimited and may change. Check your active quota in AI Studio. On the Free Tier, submitted content may be used by Google to improve products; do not send private/sensitive information. This project does not require OpenAI API billing.
A free API does not guarantee free public hosting. Initially run it on your laptop; for access from your phone on the same Wi-Fi, use the laptop's local network IP and allow the Node server through Windows Firewall. For access anywhere, deploy to a host with a suitable free tier, subject to that host's limits and policies.

## Laptop setup (Windows)
1. Install Node.js LTS (20+): https://nodejs.org/
2. Extract this ZIP.
3. Open the `HABU_Free_PWA` folder in File Explorer. Click the address bar, type `cmd`, press Enter.
4. Run `npm install`.
5. Copy `.env.example` to `.env`: `copy .env.example .env`
6. Create a Gemini API key in Google AI Studio: https://aistudio.google.com/app/apikey
7. Open `.env` in Notepad or VS Code and set `GEMINI_API_KEY=your_key`. Keep it private.
8. Run `npm start`.
9. Open http://localhost:3000 in Chrome.

## Install on Android phone
For initial local-network test:
1. Connect laptop and phone to the same Wi-Fi.
2. Find laptop IPv4 address with `ipconfig` (look under Wi-Fi adapter).
3. On phone Chrome, visit `http://LAPTOP-IP:3000` (replace with the actual IP). Allow Node.js through Windows Firewall on Private networks if prompted.
4. To install as a proper PWA, use a deployed HTTPS URL, open it in Chrome on Android, tap ⋮ > Add to Home screen / Install app. PWA installation generally requires HTTPS (localhost is a development exception). A PWA is an installable web app, not a Play Store APK.

## Free hosting / public access
Public deployment needs an internet-accessible server and HTTPS. Choose a host only after checking its current free-tier limits and sleep/usage policies. Never publish `.env` or commit API keys. Before allowing public users, add authentication and per-user quotas; this starter is intended for personal testing.

## Privacy
The Gemini API free tier may use submitted content to improve Google's products according to the current terms. Do not send sensitive/private data. Browser chat history is stored locally in the browser. This starter does not yet provide account login or encrypted cloud sync.
