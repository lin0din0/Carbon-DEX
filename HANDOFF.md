# CARBON Homepage — Complete Handoff for Claude Code

**Last updated:** May 2026  
**Repo:** `/Users/mac/Desktop/Carbonhomepage`  
**Product:** CARBON — EU ETS decentralized exchange (Sea-Twelve)

> **Start here in Claude Code:** `cd /Users/mac/Desktop/Carbonhomepage` then ask Claude to read this file. All site code, images, video, and links are documented below.

---

## Quick start

```bash
cd /Users/mac/Desktop/Carbonhomepage
python3 -m http.server 8765
```

| Page | URL |
|------|-----|
| **Landing (main)** | http://127.0.0.1:8765/carbon-landing.html |
| **Product demo** | http://127.0.0.1:8765/demo.html |

**Do not use `file://`** — Three.js ES modules and import maps require HTTP.

---

## Complete file inventory

Everything in the project folder (no build step, no `package.json`):

### Code (edit these)

| File | Lines | Purpose |
|------|-------|---------|
| `carbon-landing.html` | ~1465 | Main site: HTML + all landing CSS + nav scroll-spy + mobile menu |
| `carbon-lattice.js` | ~176 | Three.js hero background (graphene lattice, green accent nodes) |
| `demo.html` | ~254 | Demo page: YouTube embed + product deep-dive (older green/glass UI) |
| `CLAUDE.md` | short | Auto-read by Claude Code in this directory |
| `HANDOFF.md` | this file | Full project handoff |

### Brand / logo

| File | Size | Used on site? |
|------|------|----------------|
| `CarbonLOGO.svg` | 3.2 KB | **Yes** — hero glass chip + footer glass chip |

### Illustrations (SVG — “photos” / graphics)

| File | Size | Used on landing? | Section |
|------|------|------------------|---------|
| `EUETS_cap_illustration.svg` | 506 KB | Yes | Works — EU ETS cap |
| `Company_trade_illustration.svg` | 2.1 MB | Yes | Market / trading story |
| `Currentsystemreportinglagillustration.svg` | 1.0 MB | Yes | Reporting lag (`class="no-round"`) |
| `Penalty_illustration.svg` | 343 KB | Yes | Enforcement / €100 penalty |
| `Currentsystemillustration.svg` | 1.0 MB | Yes | Root cause / current stack |
| `carbonsymbol_illustration.svg` | 313 KB | **No** (replaced by Three.js hero) | Was old hero image |
| `currentsystem_invisibility_ililustration.svg` | 1.0 MB | **No** (removed per user request) | Was invisible-trades section |

### Video

| File / URL | Size | Used? | Where |
|------------|------|-------|-------|
| **YouTube** `https://www.youtube.com/embed/-uXiNh0QJ5c` | embed | **Yes** | `demo.html` hero iframe |
| `CARBON slides.mov` | ~49 MB | **Not linked in HTML** | Local asset only (untracked in git) |

To use the `.mov` on the site you would add a `<video>` tag or host it and link it — currently only YouTube is embedded.

### External dependencies (CDN)

| Resource | URL |
|----------|-----|
| Three.js r160 | `https://unpkg.com/three@0.160.0/build/three.module.js` (via import map in landing) |
| Google Fonts (landing) | Inter + JetBrains Mono |
| Google Fonts (demo) | Inter + Source Code Pro |
| YouTube iframe API | `youtube.com/embed/-uXiNh0QJ5c` |

---

## Site map & page links

```
carbon-landing.html (main)
├── #hero          → Index (nav)
├── #info          → 3-column band (not in top nav)
├── #works         → Works (nav)
├── #product       → Product (nav)
├── #how           → Process (footer nav only)
├── #about         → About (footer nav only)
├── #cta           → Contact (nav)
└── demo.html      → "View demo" CTAs

demo.html
├── #deepdive      → stats + intro
├── #capabilities  → features + chain blocks
├── #workflow      → 4 steps
└── links back → carbon-landing.html (+ broken #anchors — see below)
```

---

## All links (mailto, internal, external)

### Contact

| Type | Value |
|------|--------|
| Email | `hello@carbon.exchange` |
| mailto | `mailto:hello@carbon.exchange` |

### `carbon-landing.html` links

| Target | Used in |
|--------|---------|
| `#main` | Skip link |
| `#hero` | Nav brand, nav Index, hero logo link |
| `#works` | Nav, footer, info band “Research” |
| `#product` | Nav, footer, info band |
| `#cta` | Nav Contact |
| `#how` | Footer Process |
| `#about` | Footer About |
| `demo.html` | Hero “View demo”, info band Demo, CTA, footer Demo |

### `demo.html` links

| Target | Used in |
|--------|---------|
| `carbon-landing.html` | Nav logo, Back to Site, CTA, footer implied |
| `carbon-landing.html#solution` | Nav “Full Story” — **broken** (no `#solution` on landing; use `#product`) |
| `carbon-landing.html#system` | Footer — **broken** (use `#works`) |
| `carbon-landing.html#problem` | Footer — **broken** (no `#problem`; content is in unnamed sections before `#product`) |
| `carbon-landing.html#how` | Footer — OK |
| `carbon-landing.html#about` | Footer — OK |
| `#deepdive`, `#capabilities`, `#workflow` | Demo nav |
| YouTube embed | See video table above |
| `mailto:hello@carbon.exchange` | CTA + footer area |

**Fix when editing demo:** Update footer/nav hashes to `#works`, `#product`, etc., to match current landing IDs.

---

## Landing page — section content summary

| ID | Headline (short) | Media |
|----|------------------|-------|
| `#hero` | “Ready to give the EU carbon market a public ledger” | Three.js `#hero-lattice`, `CarbonLOGO.svg` |
| `#info` | Process + narrative + Stay connected | — |
| `#works` | Cap-and-trade at continental scale | `EUETS_cap_illustration.svg` + stat grid |
| (no id) | €881B market — no shared ledger | `Company_trade_illustration.svg` |
| (no id) | Structural transparency gap | 6-cell problem grid |
| (no id) | Reporting arrives a year late | `Currentsystemreportinglagillustration.svg` |
| (no id) | What regulators see today | No image (solo text + counterparty box) |
| (no id) | €100 per excess tonne | `Penalty_illustration.svg` |
| (no id) | Built before on-chain settlement | `Currentsystemillustration.svg` |
| `#product` | One exchange layer. One registry. | Feature stack + chain blocks |
| `#how` | Four steps from cap to burn | 4-column steps |
| `#about` | Sea-Twelve | 4 pillars |
| `#cta` | €881 billion — public ledger | CTAs to demo + email |

### Key stats (repeated across pages)

- EU ETS emissions: **50%** below 2005  
- Annual market: **€881B**  
- 2023 reduction: **15.5%**  
- Daily spot: **€3B**  
- Reporting lag: **~12 months** / **9–18 months**  
- Penalty: **€100** / tCO₂e  
- Example fine: **€480k** (WuXi Vaccines 2025)  

**Sources:** European Commission 2025 Carbon Market Report · ICAP · Homaio

---

## Design system (landing)

Black/white minimalist (reference: portfolio-style layout). Accent green `#62d65c`.

| Token | Value |
|-------|--------|
| `--bg` | `#000000` |
| `--fg` | `#ffffff` |
| `--accent` | `#62d65c` |
| `--line` | `#333333` |
| Fonts | Inter (headlines/body), JetBrains Mono (UI/labels) |

- **Nav:** text “Carbon” only (no nav logo).  
- **Logo:** `.logo-glass` frosted chips on hero + footer; **do not** `invert()` `CarbonLOGO.svg`.  
- **Hero:** large Three.js lattice **behind** `.hero-copy` with left gradient scrim.

### Demo page design (separate)

- Background `#1d1d1d`, green `#62d65c`, glass cards — **not** restyled to match landing.

---

## Hero / Three.js architecture

```
#hero
├── .hero-lattice-bg (absolute, z-index 0, ~165vw × 135vh, right-aligned)
│   └── #hero-lattice → <canvas> from carbon-lattice.js
├── #hero::before (gradient scrim, z-index 1)
└── .hero-copy (z-index 2, max-width 640px)
```

**`carbon-lattice.js`:** Graphene hex lattice, ~13% nodes/bonds green, auto-rotate + mouse tilt on `#hero`, `ResizeObserver` on `#hero-lattice`, camera `z: 22`, transparent renderer.

**Origin:** User file `~/Downloads/carbon-lattice (1).html` → extracted to `carbon-lattice.js`.

**Landing HTML tail:**

```html
<script type="importmap">
{ "imports": { "three": "https://unpkg.com/three@0.160.0/build/three.module.js" } }
</script>
<script type="module" src="carbon-lattice.js"></script>
```

---

## Inline JavaScript (landing only)

1. **Scroll spy** — active nav for `#hero`, `#works`, `#product`, `#cta`.  
2. **Mobile menu** — `#nav-toggle`, `nav.is-open`, closes on link click / width > 720px.

`demo.html` has **no** JavaScript.

---

## Git state

```
 M carbon-landing.html
?? carbon-lattice.js
?? "CARBON slides.mov"
?? HANDOFF.md
?? CLAUDE.md
```

- Commit only when the user asks.  
- Avoid committing `CARBON slides.mov` unless requested (~49 MB).

---

## Pitfalls

1. Preview requires `python3 -m http.server` (not `file://`).  
2. Logo path: `CarbonLOGO.svg` (case-sensitive).  
3. `demo.html` footer links use old anchor IDs (`#system`, `#problem`, `#solution`).  
4. Nav lattice removed; hero/footer glass logos remain.  
5. `carbonsymbol_illustration.svg` and invisibility SVG still on disk but unused on landing.

---

## Suggested next work

- [ ] Fix `demo.html` anchor links to match landing IDs  
- [ ] Restyle `demo.html` to black/mono landing aesthetic  
- [ ] Embed or link `CARBON slides.mov` if local video preferred over YouTube  
- [ ] Commit landing + `carbon-lattice.js` when ready  
- [ ] Deploy to static host (copy entire folder; keep relative paths)

---

## How to use in Claude Code

```bash
cd /Users/mac/Desktop/Carbonhomepage
claude
```

Example prompts:

- *Read HANDOFF.md — fix demo footer links to match the landing page.*  
- *Read HANDOFF.md — restyle demo.html to match carbon-landing.html.*  
- *Read HANDOFF.md — add CARBON slides.mov to the demo page.*

Open **`carbon-landing.html`**, **`demo.html`**, and **`carbon-lattice.js`** for edits; this file is the map of everything else.
