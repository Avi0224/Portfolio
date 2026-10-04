# Design: 3D Portfolio

Status: pre-build. Last updated 2026-10-04.
Companion files: `CONTEXT.md` (vocabulary), `decisions.md` (why each choice was made), `docs/adr/` (the two hardest-to-reverse decisions).

This file describes what we are building. It contains no code. Terms in **bold** are defined in `CONTEXT.md`.

---

## 1. Purpose and audience

The site exists so a **Visitor** (a recruiter or prospective client) looks at the owner's work and then makes **Contact**.

Design consequences:

- The 3D **Scene** supports the work. It never hides a **Project** or slows the page.
- **Contact** must be reachable from anywhere (fixed header button), not only after a long scroll.
- Most page weight and attention go to the Projects section.
- Tone: professional and minimal. No decorative effects without a job.

Assumption (inference, not measured): recruiters and clients skim quickly. This is commonly repeated but not verified for this audience.

---

## 2. Page structure

Order: **Hero, About, Projects, Contact**, plus a fixed header.

| Section | Job | Camera | Notes |
|---|---|---|---|
| Header (fixed) | Always-visible way to reach Projects and Contact | n/a | Minimal. A Contact button and a Projects link. |
| Hero | Name, one line on what the owner does | Start pose over the Terrain | The Terrain responds to the cursor. |
| About | Short credibility, one screen | In transit toward the first Waypoint | No Waypoint of its own. Placeholder copy for now. |
| Projects | Show three Projects, extensible to five | One **Waypoint** per Project | Each Project card is HTML over the Scene. |
| Contact | Form plus profile links | **Overview** (wide pose) | Form sits over a low, flat stretch of Terrain. |

About sits before Projects by the owner's choice. It works against the goal slightly because it puts a section between the Visitor and the work. Mitigation: keep About to one screen and keep a Projects link in the header.

---

## 3. The Scene: Terrain

### Form

A landscape drawn with **contour lines** (the base) and **points** (sparse accents). No solid meshes and no scene lighting. Lines and points are unlit, so the palette in section 6 carries the look.

- **Contour lines:** drawn from one height field, so lines and points share the same shape. The technique is well established (shader-drawn isolines, anti-aliased).
- **Decorative points:** sparse, mostly near peaks. Not a full grid. A full grid of points over lines was sketched and rejected as too busy.
- **Markers:** a small number of interactive points (see section 4).

### Camera

The camera is tied to scroll position and moves continuously (no snapping).

- Hero: start pose.
- Each Project: its own Waypoint, a position over the Terrain.
- Contact: the **Overview**, pulled back and raised so the whole Terrain and all Markers are visible, with the form placed over a calm, low stretch.
- Header jumps (for example "Contact") do not teleport. They scroll with a short eased move (about one second) so page and camera stay in agreement.

Waypoints are generated from the Project data list, so adding Projects 4 and 5 means adding data, not editing camera code.

### Text legibility

Moving linework behind body text is the main visual risk. Mitigations:

- Each Waypoint places the interesting terrain to one side, leaving the text column on quiet ground.
- Lines and points fade out under the text column.
- Keep height low where text sits.

Status: unverified until built. Test on a real phone.

### Cursor response

The cursor lifts or ripples the Terrain locally (a gentle swell). This replaces the original spec's "3D object that follows the mouse", because there is no single object.

---

## 4. Markers

A **Marker** is an interactive point. Markers live in one data list with a type, label, destination, and position on the Terrain.

| Type | Count at launch | Click does |
|---|---|---|
| Project marker | 3 (up to 5) | Camera flies to that Project's Waypoint and shows its card. The card links to the live project. |
| Social marker | 2 to 3 (for example GitHub, LinkedIn) | Opens the profile in a new tab. |

Keep social markers to two or three. More exits means more chances to leave before Contact.

### States

| State | Look and motion |
|---|---|
| Resting | Solid accent dot plus a thin accent ring that pulses slowly. Decorative points stay grey. |
| Hover (desktop) | Dot grows, one ring expands outward and fades, nearby decorative points swell and lean outward, a label fades in. |
| Keyboard focus | Same as hover, plus a visible focus ring. |
| Touch | No hover. The label stays visible at rest. Tapping opens directly. |
| Reduced motion | No pulse, no drift. A static ring and the size difference carry the meaning. |

### Implementation notes (design level)

- Decorative points are drawn in bulk for cheap rendering. Markers are separate, so each can scale on its own.
- Each Marker is a real HTML link positioned over its point. This gives keyboard access, screen-reader support, and normal open-in-new-tab behavior.
- Hover on the HTML link drives the 3D growth and the swell.

### Labels

- 12px minimum, sentence case, secondary-text grey, no box or background.
- A thin halo in the ground colour keeps text readable where lines pass behind it.
- One to two words ("GitHub", the Project's name).
- Risk: several labels may overlap on a small screen. Test on a phone. If they do, show fewer at once.

---

## 5. Motion

Principle: decorative points and Markers differ in the **kind** of motion, not just speed, so they stay distinguishable for people with motion or colour-vision differences.

| Element | Motion | Starting values (tune by eye) |
|---|---|---|
| Decorative points | Passive position drift, desynchronised | Very slow, very low amplitude |
| Marker rings | Soft ring pulse, staggered across Markers | About one beat every 3 to 4 seconds |
| Marker hover | Grow, ring expansion, nearby swell, label | Short (about 150 to 250 ms) |
| Cursor | Local Terrain swell | Subtle |
| Scroll | Camera travel, scrubbed to scroll position | Smoothed by Lenis |
| Hero load | One settling moment as the Terrain draws in | Single, restrained |
| About paragraph | Word-by-word brightening tied to scroll | About 40 words, not 230 characters |

Rules:

- Pause all ambient motion when the tab is hidden.
- With the browser's reduced-motion setting on, switch off drift, pulse, and the About reveal.
- No scattered fade-and-slide entrances elsewhere.
- All numbers above are starting points. None is tested.

---

## 6. Theme

### Direction

Light, cool, restrained. Reads as professional and avoids the common dark-neon portfolio look.

### Palette

Contrast ratios were computed against Paper.

| Name | Hex | Role | Contrast on Paper |
|---|---|---|---|
| Paper | `#E6E8EB` | Page ground | n/a |
| Ink | `#15181C` | Primary text | 14.5 : 1 |
| Graphite | `#565C64` | Secondary text, lines, decorative points | 5.5 : 1 |
| Stone | `#B9BEC6` | Soft dividers, quiet surfaces | 1.5 : 1 (not for text) |
| Ultramarine | `#2B3FD1` | The only accent | 6.3 : 1 (white on it: 7.7 : 1) |

Accent rule: Ultramarine appears only on things the Visitor can act on or is acting on (Markers, links, the Contact button, focus rings, the line nearest the cursor if we build that). Never as a gradient.

On a dark ground this accent would fail contrast (about 2.3 : 1), which is one reason the theme is light.

### Typography

- One sans family, sentence case. Chosen: **Hanken Grotesk** (variable, weights 100 to 900, SIL Open Font License, on Google Fonts and available self-hosted through Fontsource). Alternative if it looks wrong in preview: Geist (availability not yet checked).
- Preview both before committing.
- Headings: medium weight, slightly tight tracking. No gradient fill. No all-caps labels.
- Body: regular, line length about 65 characters or less.
- Self-hosting the font avoids a third-party request at load time.

### Things deliberately not used

Near-black ground with neon accent, gradient text, all-caps tracked buttons, multi-stop purple or orange gradients, glass or iridescent blobs, Inter and Space Grotesk, hotlinked third-party images.

---

## 7. Section specifications

### Header

Fixed, minimal. Contains the owner's name or mark, a Projects link, and a Contact button (accent). Always above the Scene and content.

### Hero

Name and one line. The Terrain is the visual. Cursor swells the Terrain. No decorative imagery.

### About

- One screen. Gradient heading from the template is replaced by a plain Ink heading.
- Paragraph with a scroll-linked word-by-word reveal.
- Section background is transparent so the Terrain shows through.
- The four template corner images were dropped (hotlinked, unknown licence, would compete with the Scene).
- Copy is **placeholder**. The sample text ("more than five years of experience in design...") must not ship unless true.

### Projects

- Three cards, each about one screen: title, one-line outcome, visual (screenshot or demo), link out.
- Each card is HTML over the Scene, paired with its Waypoint.
- Adding Projects 4 and 5 is a data change.

### Contact

- Contact form (name, email, message) sent through Web3Forms, with spam protection enabled.
- Visible profile links and a copyable plain-text email address as fallback.
- Plain-language success and error messages.
- Sits at the Overview over a low, flat stretch of Terrain.

---

## 8. Responsive and touch

- Camera field of view and Waypoint positions adjust for narrow screens so Markers and text stay clear of each other.
- Cap the render resolution on high-density phone screens.
- Reduce point count and line density on mobile.
- Touch: labels visible at rest, tap opens directly, targets large enough to tap.
- Test: scrubbed scroll with a fast trackpad flick and with phone touch scroll, because scroll-tied camera motion can feel too fast.

---

## 9. Accessibility

- Every Marker is a real link or button with an accessible name.
- Visible focus states on everything interactive.
- Reduced-motion setting respected (section 5).
- About paragraph exposed to screen readers as one normal block of text, not split into per-word noise.
- Fallback for no-WebGL or low-power devices: a static light background so the site still reads and works.
- Contrast figures in section 6 meet WCAG AA for text colours.

---

## 10. Performance

Targets to confirm by measurement (Core Web Vitals "good" thresholds): LCP at or below 2.5 s, INP at or below 200 ms, CLS at or below 0.1, tested on a mid-range phone.

Approach:

- Procedural scene: no model files to download.
- Lines drawn in a shader, points drawn in bulk, Markers separate.
- Animation of decorative points runs on the GPU, not in per-point JavaScript.
- Pause rendering when the canvas is off-screen or the tab is hidden.
- Share geometry and materials where possible.
- Show a lightweight placeholder while the Scene loads, so text appears immediately.

Risk: always-on motion behind text costs battery and attention. Revisit if it looks busy.

---

## 11. Tech stack (researched 2026-10-04)

Versions below are the latest found during research. Several sources were snapshots from late 2025 or early 2026, so confirm the current version when installing.

| Piece | Choice | Found | Notes |
|---|---|---|---|
| Build tool | Vite | Vite 8 exists (Rolldown-based) | Needs Node 20.19+ or 22.12+. Vite 7 has the same Node floor. |
| Framework | React with TypeScript | React 19.x | See pairing note below. |
| 3D renderer | three | r182 (Dec 2025) | Install matching `@types/three`. |
| React 3D | `@react-three/fiber` | 9.5.0 (Dec 2025) | v9 supports React 19.0 to 19.2. v8 does not support React 19. |
| 3D helpers | `@react-three/drei` | 10.7.7 (late 2025) | Use drei v10 with R3F v9. |
| Scroll animation | `gsap` plus `@gsap/react` | gsap 3.14.2 | All GSAP plugins including ScrollTrigger are free, including commercial use. |
| Smooth scroll | `lenis` | renamed package | Replaces `@studio-freight/lenis`. React bindings at `lenis/react`. |
| UI animation | `motion` | v12 | Replaces `framer-motion`. Import from `motion/react`. |
| Styling | Tailwind CSS v4 with `@tailwindcss/vite` | v4 | No `tailwind.config.js`. Configuration lives in CSS. |
| Font | `@fontsource-variable/hanken-grotesk` | 5.x | Self-hosted. |
| Contact form | Web3Forms | n/a | Hosted endpoint, no package, no backend. |

Pairing rule: **React 19 pairs with R3F v9 and drei v10.** React 18 pairs with R3F v8 and drei v9. Do not mix them.

### Corrections to the original brief

| Original | Use instead | Why |
|---|---|---|
| `@studio-freight/lenis` | `lenis` | Package renamed. |
| `framer-motion` | `motion` (import `motion/react`) | Renamed. The old name still works as a shim, but new projects should use the new one. |
| `state.mouse` | `state.pointer` | `mouse` is deprecated. |
| Canvas fixed behind scrolling HTML | Same, but rebind the canvas event source to a shared parent and use client coordinates | Otherwise the overlay blocks the canvas's pointer events and cursor response silently fails. Documented in the R3F events docs. |
| Supabase for the form | Web3Forms | No database or function needed. |
| "A 3D object follows the mouse" | Cursor swells the Terrain | There is no single hero object. |

### Lenis and GSAP wiring (approach)

Smooth-scroll and scroll-trigger libraries must share one clock: GSAP's ticker drives Lenis, and Lenis's scroll event updates ScrollTrigger. If they tick independently, ScrollTrigger reads a stale position and the camera lags. This is the documented pattern for Lenis plus ScrollTrigger.

Scroll-linked HTML animation with `motion` (the About reveal) reads native scroll position, which Lenis drives, so it works alongside.

---

## 12. Component sourcing research

### MotionSites

A **prompt library**, not a component library. Per third-party summaries (not the vendor's own site), it sells curated AI prompts, looping video backgrounds, and templates. Paid plans mention a commercial licence. Consequence: it gives recipes to rebuild, not drop-in React or R3F parts. If the About prompt came from there, check your plan's licence before reusing its exact values or assets. Reusing a common technique (scroll-linked text reveal) is different from copying the prompt.

### Framer

- Framer's own help says Framer components can be used in any React environment outside Framer, by copying an import statement. That import points at Framer-hosted code, which makes your site depend on Framer's hosting.
- Paid third-party tools can export Framer components as React code for Vite. These are not Framer's own feature.
- Marketplace components have their own licences, not checked.
- One unverified third-party claim of a whole-project code export looked unreliable. Ignore it.

### Closest match found: TerrainLines (Framer Marketplace)

A procedural topographic contour component built on raw three.js and custom shaders. Per its listing: contour lines from a noise field, drawn in a single draw call, pulse animation computed in the shader with no per-frame JavaScript, pauses off-screen, scroll-driven camera tilt, no external assets.

Why it matters: it confirms the Terrain approach is feasible and performant.

Why we do not drop it in: it is a standalone background built on a raw renderer, not a part of one shared R3F Scene with our camera, Waypoints, and Markers. Its licence and price were not checked. Treat it as **reference**, not a dependency.

### drei helpers worth using

`Html` (position HTML over 3D points; events go on the DOM element, not the 3D side), `Preload`, and helpers for adaptive pixel ratio and performance monitoring (confirm exact names at install).

### Not needed

Physics, post-processing, model loaders, glTF compression. The Scene is procedural.

---

## 13. Project structure (planned)

```
src/
  canvas/        R3F only: Scene, Terrain, Markers, camera rig
  components/    DOM only: Header, Hero, About, Projects, Contact
  data/          One list of Projects, one of social links, Marker positions
  hooks/         Lenis plus GSAP camera timeline hook
  styles/        Theme tokens (palette, type)
```

Rule: the canvas never contains Project content. Project cards are HTML.

---

## 14. Open items

Decisions still needed:

1. Real About copy (placeholder in use).
2. The three Projects: titles, one-line outcomes, screenshots or demos, links.
3. Which two or three social profiles to show.
4. Owner's name or mark and the Hero line.
5. Hosting and domain (not discussed).
6. Analytics, if any (not discussed).
7. Page metadata and share image. A WebGL-heavy page needs real HTML text for crawlers.

Things to verify before or during the build:

- Whether Web3Forms free plan can restrict submissions to your domain. The pricing page's "Unlimited Domains" means how many domains you may use, not a domain lock. One third-party listing mentions allowed-domain restriction, and a competitor's comparison claims it is Pro-only. Neither is authoritative. Check the Web3Forms docs and dashboard.
- Web3Forms free plan keeps submissions for 30 days and has no dashboard. Submissions arrive by email, so the inbox is your record.
- Whether Web3Forms supports a honeypot field in addition to hCaptcha.
- Current versions of three, R3F, drei, Vite, and `@tailwindcss/vite`, and that `@tailwindcss/vite` supports the Vite version you pick.
- Hanken Grotesk against Geist in a real preview.
- TerrainLines licence, if used as reference beyond inspiration.
- Label overlap on a small phone.
- Legibility of text over the Terrain.
- Frame rate of the Terrain on a mid-range phone.

---

## 15. Build order

1. Scaffold: Vite, React, TypeScript, Tailwind v4, fonts, theme tokens.
2. Page shell: Header and four sections with placeholder content, normal scrolling.
3. Canvas: fixed canvas behind the page, shared event source, static Terrain (lines only).
4. Camera: Lenis plus GSAP wiring, continuous travel Hero to Overview from the data list.
5. Points and cursor swell.
6. Markers: data list, HTML links over points, hover and touch behavior, labels.
7. Contact form with Web3Forms, fallback links.
8. About word reveal.
9. Motion tuning, reduced-motion, hidden-tab pausing.
10. Mobile pass: field of view, point density, labels, pixel-ratio cap.
11. Accessibility and performance pass on a real phone.
12. Real content replaces placeholders.
