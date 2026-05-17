# VERT — 12-Week Jump Program

Science-backed vertical jump and athletic performance tracker. Built with Next.js 14 App Router.

## Features
- Full 4-phase program viewer (Foundation → Strength → Power & Contrast → Peak)
- Edit any exercise inline (name, sets, reps, load, notes)
- Add / remove / reorder exercises per session
- Log sessions with weight, reps, and notes
- Progress view grouped by date and by exercise
- All edits + logs persisted to localStorage
- Reset to original program anytime (keeps progress logs)

## Deploy in 3 steps

### 1. Install
\`\`\`
npm install
\`\`\`

### 2. Run locally
\`\`\`
npm run dev
\`\`\`
Open http://localhost:3000

### 3. Deploy to Vercel (recommended — free)
\`\`\`
npm i -g vercel
vercel
\`\`\`
Follow the prompts. Done. You'll get a live URL you can bookmark on your phone.

## File structure
\`\`\`
app/
  page.jsx        ← main UI (all editing, logging, views)
  layout.jsx      ← html shell
lib/
  programData.js  ← all phase/exercise data (edit this to change defaults)
\`\`\`

## Making edits
- **In the app**: click ✎ on any exercise to edit inline. Changes save to localStorage immediately.
- **In code**: edit `lib/programData.js` to change the baseline program. Hit "Reset Program" in the app to pull in code changes (warning: this overwrites your in-app edits, not your progress logs).
