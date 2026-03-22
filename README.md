# SheetForge — by Olaris Labs

70+ handcrafted dark-theme cheat sheets for AI engineers, developers, and creators.

## Stack
- React 18 + Vite
- React Router v6
- Hosted on Vercel
- PDFs generated separately (private repo: sheetforge-generator)

## Dev setup
```bash
npm install
npm run dev
```

## Adding PDFs
Place PDF files in `public/pdfs/` and add entries to `src/data/sheets.json`.

## Premium lock
Set `VITE_PREMIUM_LOCKED=true` in `.env` to gate PDF downloads.

## Deploy
Push to GitHub → connect repo in Vercel → done.
Set `VITE_PREMIUM_LOCKED` as an env var in Vercel dashboard when ready to monetize.

---
© Olaris Labs · olarislabs.dev
