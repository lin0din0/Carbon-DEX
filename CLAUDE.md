# CARBON Homepage

Static EU ETS marketing site (Sea-Twelve). **No build step** — open via local HTTP server only.

## Commands

```bash
cd /Users/mac/Desktop/Carbonhomepage
python3 -m http.server 8765
# http://127.0.0.1:8765/carbon-landing.html
```

## Key files

- `carbon-landing.html` — main landing (design + content)
- `carbon-lattice.js` — Three.js hero background (ES module, needs import map in HTML)
- `demo.html` — older green/glass demo page (not restyled)
- `CarbonLOGO.svg` — brand logo (black + `#62D65C` green)

## Design

Black/white minimalist UI (Inter + JetBrains Mono), accent `#62d65c`. Hero: large Three.js lattice **behind** `.hero-copy` with left gradient scrim. Logo in hero/footer uses `.logo-glass` (frosted light panel, **no invert** on SVG). Nav uses text “Carbon” only.

## Full context

Read **`HANDOFF.md`** for:
- All code files, SVG illustrations, video (YouTube + `CARBON slides.mov`)
- Every internal/external/mailto link
- Section IDs, stats, CDN dependencies, git state, pitfalls

Before editing `demo.html`, check HANDOFF — several footer links still point to old landing anchors (`#system`, `#problem`, `#solution`).

## Rules

- Preview with HTTP server, not `file://`
- Only git commit when the user explicitly asks
- Match existing patterns in `carbon-landing.html`; minimize scope
- Logo filename: `CarbonLOGO.svg` (case-sensitive)
