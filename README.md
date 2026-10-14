# Bell Lap site

The public story page, support page and privacy policy for Bell Lap on Apple Watch,
at https://belllap-apple.chatterbx.ai/

A Next.js app exported to static files and hosted on Netlify. The animation uses Motion.

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs it locally at http://localhost:3000 |
| `npm run build` | Builds the static site into `out/` |
| `npm run deploy` | Builds and publishes to Netlify (needs `netlify login` once) |

- `app/page.tsx` is the story: one runner's week, Monday to Sunday.
- `app/story.tsx` holds the animated parts: the lane, the week chart, the counters, the rings, the
  themes, the film and the bell.
- `app/support/` and `app/privacy/` are the pages App Store Connect and Connect IQ link to.
- `public/assets/` holds the Apple Watch screenshots, copied from the bell-lap-apple repo.
