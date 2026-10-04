# Decision Log: 3D Portfolio

Every major decision made during planning, in the order we made it, with the reasoning and what we gave up. Date for all entries: 2026-10-04 (one planning session).

Companion files: `CONTEXT.md` (vocabulary), `design.md` (the full design), `docs/adr/` (the two decisions that are hardest to reverse).

Labels used below:

- **Fact:** checked against a source or computed.
- **Inference:** my reasoning, not verified.
- **Opinion:** a taste judgment.

---

## D1. The site's job: get Visitors to look at work, then make Contact

**Decision.** The primary goal is for a recruiter or client to look at two or three Projects and then reach out. The 3D scene supports this and does not compete with the work.

**Alternative considered.** A showpiece where the 3D itself is what gets judged.

**Why.** Stated by the owner. It drives most other choices: one strong effect instead of 3D on every section, an always-visible Contact button, and a lightweight fallback.

**Trade-off.** Less spectacle than a pure WebGL showcase.

**Caveat (inference).** "Recruiters skim quickly" is commonly repeated but not verified for this audience.

---

## D2. One shared Scene with a Waypoint per Project

**Decision.** One persistent 3D Scene sits behind the whole page. The camera moves to one Waypoint per Project. Project content (screenshot, title, link) is HTML over the Scene.

**Alternative.** A bespoke 3D stage per Project.

**Why.**

- Adding Projects 4 and 5 means adding a data entry, not modeling a new asset.
- Keeps GPU load and download size low.
- Project screenshots do the selling, and a 3D stage per Project would pull attention away from them.

**Trade-off.** The scroll moment is less spectacular.

**Revisit if.** The owner decides the 3D itself should be the main attraction. Record: ADR 0001.

---

## D3. A procedural Scene, with no downloaded model files

**Decision.** The Scene is built in code (shapes, lines, points). No GLB model.

**Alternative.** A modeled asset such as a device, character, or sculpture.

**Why.**

- No download weight, which matters on mobile and slow connections.
- Easy to retheme.
- A free template asset could look identical to other portfolios (inference).

**Trade-off.** Less distinctive than a well-made custom model.

---

## D4. Contact through a hosted form service and visible profile links, with no backend

**Decision.** Use Web3Forms for the contact form. Show profile links and a copyable email as fallback. No Supabase, no database.

**Alternative considered.** A Supabase-backed form (in the original brief).

**Why.**

- **Fact (reasoning):** a database insert alone does not notify you. Getting an email would need extra pieces (a function, an email provider, spam handling).
- **Fact (checked):** Web3Forms free plan has 250 submissions a month, hCaptcha, spam protection, a custom redirect, and unlimited forms and domains. No account is required. The access key is designed to be public in frontend code.

**Trade-offs and cautions.**

- **Fact:** free plan keeps submissions 30 days and has no dashboard. The inbox is the record.
- **Unverified:** whether the free plan can lock submissions to your domain. "Unlimited Domains" on the pricing page does not mean a domain lock. Check before launch.
- A third-party dependency. Easy to swap later, so no ADR.

---

## D5. Section order: Hero, About, Projects, Contact, with a fixed header

**Decision.** Hero, About, Projects, Contact. A fixed header carries a Contact button and a Projects link.

**Owner's change.** About was moved above Projects.

**Why a fixed header.** Visitors who decide quickly should not need to scroll to the bottom to reach you (inference).

**Trade-off.** About puts a section between the Visitor and the work. Mitigation: one screen only, plus the Projects link in the header.

---

## D6. Continuous (scrubbed) camera travel, not snapped sections

**Decision.** The camera position is tied directly to scroll progress and glides between poses.

**Alternative.** Snap or ease to a fixed pose when each section enters view.

**Why.**

- About does not need its own Waypoint. It is simply travel between the Hero pose and the first Project's Waypoint.
- Snapping can fight smooth scrolling and feel jerky if the Visitor stops partway.

**Trade-off.** Harder to tune. A fast trackpad flick moves the camera fast. Needs real-device testing.

**Consequence.** Header jumps cannot teleport. They use a short eased scroll (about one second).

---

## D7. Light, cool theme with one accent

**Decision.** Paper `#E6E8EB`, Ink `#15181C`, Graphite `#565C64`, Stone `#B9BEC6`, and Ultramarine `#2B3FD1` as the only accent.

**Superseded decision.** An earlier recommendation was to keep the About template's look (near-black `#0C0C0C`, gradient heading, all-caps tracked button, purple-to-orange gradient). That was wrong for the brief "professional, minimal, no AI slop", because those are common template tells (opinion). It was replaced.

**Why light.**

- Reads as professional and differs from the common dark-neon look (opinion).
- The accent works on light (6.3 : 1) but would fail on dark (about 2.3 : 1).
- **Fact (computed):** Ink 14.5 : 1, Graphite 5.5 : 1, white on Ultramarine 7.7 : 1.

**Accent rule.** Only for things the Visitor can act on.

**Trade-off.** Dark was offered as an alternative. It moves toward the common look.

---

## D8. One sans family, Hanken Grotesk

**Decision.** Hanken Grotesk in sentence case, no gradient text, no all-caps labels. Geist is the fallback if the preview looks wrong.

**Why.**

- **Fact (checked):** Hanken Grotesk is a variable font (weights 100 to 900), SIL Open Font License, on Google Fonts, and installable through Fontsource for self-hosting.
- Avoids Inter and Space Grotesk, which are very widely used (opinion).
- Replaces Kanit at 900 weight in uppercase, which produced the template's loud look (opinion).

**Caveat.** Chosen from a shortlist, not yet seen in a real preview.

---

## D9. Hero form: a Terrain of contour lines with sparse points

**Decision.** The Scene is a landscape drawn as contour lines with sparse points near the peaks. The camera flies over it.

**Alternatives considered (six sketched).**

| Option | Why not |
|---|---|
| Single sculptural object | One silhouette from every angle. Default 3D portfolio shape (opinion). |
| Grounded composition of blocks | Original recommendation. Replaced when the owner chose to combine field and contour. |
| Particle field alone | Fights a light, matte direction. Very common look (opinion). |
| Extruded lettering | Needs a font converted to geometry, adds weight, may duplicate the name. |
| Layered planes | Flat sheets become thin edges at shallow angles. |

**Why this one.**

- Suits continuous scroll. Each Waypoint is just a position over the terrain.
- Lines and points are cheap to draw.
- A similar procedural approach exists as a Framer Marketplace component (TerrainLines), which confirms feasibility.

**What changed because of it.**

- No more "3D object follows the mouse". The cursor swells the Terrain.
- No lit, matte objects. Lines and points are unlit.

**Rejected on the way: voxel avatar.**

The owner proposed turning an anime-style profile image into a voxel character, then dropped it. Findings: **fact (tested)** automatic conversion at 32, 48, and 64 blocks made the face and details muddy. A single flat image gives only a relief, not true 3D, which clashes with camera travel. The source was a low-resolution screenshot with interface chrome. Possible ownership and professionalism concerns were flagged. Record: ADR 0002.

---

## D10. Markers: some points are interactive, and they grow on hover

**Decision.** Many points are decorative. A few are **Markers** that lead somewhere. Markers are distinguishable at rest (accent colour and ring), not only on hover.

**Why.**

- **Inference:** touch screens have no hover, so a hover-only cue fails on phones.
- A Marker that looks identical to a decorative point is invisible as a control.

**Cap.** Social Markers limited to two or three, to avoid giving Visitors many exits before Contact.

**Implementation approach.** Decorative points drawn in bulk. Markers drawn separately. Each Marker is a real HTML link positioned over its point, which gives keyboard access, screen-reader support, and open-in-new-tab.

---

## D11. Where Markers lead

**Decision.**

- **Project marker:** the camera flies to that Project's Waypoint and shows its card. The card links out to the live project.
- **Social marker:** opens the profile in a new tab.

**Alternative.** Project marker opens the live site directly.

**Why the choice.** Direct jumps skip the screenshot and one-line outcome, so a Visitor learns less before leaving. The owner chose to keep them on the page.

**Fallback.** If the owner changes their mind, still open the live site in a new tab so the portfolio stays open.

---

## D12. Motion language and labels

**Decision.**

- Decorative points drift (position). Marker rings pulse (a ring), slowly and staggered. They differ in kind of motion, not just speed.
- On Marker hover: dot grows, ring expands, nearby points swell, label fades in.
- Labels: 12px minimum, sentence case, grey, no box, a thin halo for legibility, one to two words.
- Touch: labels visible at rest.
- Reduced motion: drift and pulse off, static ring remains.
- Ambient motion pauses when the tab is hidden.

**Why.** Fulfils the owner's request for different animation of decorative points and Markers and a hover effect, with minimal labels.

**Caveats.**

- All timings are starting values, untested.
- Always-on motion can distract and costs battery.
- Label overlap on small screens is untested.
- "Minimal" has a floor: below about 12px text gets hard to read.

---

## D13. Contact rests at an Overview

**Decision.** At Contact the camera pulls back to a wide Overview showing the whole Terrain and all Markers. The form sits over a low, flat stretch of Terrain.

**Alternatives.** Stay at the last Project's Waypoint (changes as Projects are added), or descend to a calm flat area (clearest background, least interesting).

**Why.** Gives the Visitor a view of everything just as they reach out, ties social Markers to Contact, and does not depend on how many Projects exist.

**Risk.** A wide shot shows more points at once and could look busy. Needs checking when built.

---

## D14. About template: keep the technique, drop the images, placeholder copy

**Decision.**

- Four decorative corner images dropped.
- Section background transparent, so the Terrain shows through.
- Text reveal done by word, not by character.
- Paragraph is placeholder text until the owner writes real copy.

**Why.**

- The images were hotlinked from someone else's published site with unknown licence, could disappear, and would compete with the Scene.
- A solid section background would hide the canvas.
- Per-character spans are about 230 elements, and the duplicated characters can confuse screen readers.
- The sample claims "more than five years of experience in design". That may not be true for this owner.

---

## D15. Stack choices and corrections

**Decision.** React 19 with R3F v9 and drei v10, Vite, TypeScript, Tailwind v4, GSAP, Lenis, and Motion.

**Corrections to the original brief.** All checked against sources on 2026-10-04.

| Original | Use | Evidence |
|---|---|---|
| `@studio-freight/lenis` | `lenis` | Package renamed. Codemod exists. React bindings at `lenis/react`. |
| `framer-motion` | `motion` | Official Motion site: install `motion`, import from `motion/react`. |
| `state.mouse` | `state.pointer` | `mouse` is deprecated. |
| R3F v8 with React 19 | R3F v9 | v8 not compatible with React 19. v9.5.0 supports React 19.0 to 19.2. |
| Canvas events behind overlay | Shared event source plus client coordinates | Official R3F events docs. |
| Paid GSAP plugins | Free GSAP | GSAP, including ScrollTrigger, is free for commercial use after the Webflow acquisition. |
| Tailwind config file | CSS-based config | Tailwind v4 uses `@tailwindcss/vite` and no config file. |

**Version caveat.** Latest versions found came partly from late-2025 snapshots. Confirm at install.

---

## D16. Component sourcing

**Decision.** Do not depend on MotionSites or Framer components. Use the techniques and build in R3F.

**Why.**

- MotionSites is a prompt library, per third-party summaries. It gives recipes, not components.
- Framer components can be used outside Framer, but the import points at Framer-hosted code, and marketplace licences vary.
- The closest match (TerrainLines) is a standalone background on raw three.js, not part of a shared R3F Scene with our camera and Markers.

**Use as reference.** TerrainLines, as evidence that the Terrain approach is feasible.

---

## Rejected or dropped ideas

| Idea | Why dropped |
|---|---|
| Keep the About template's dark gradient look | Too close to common template tells. |
| Kanit at heavy weight, uppercase | Too loud. |
| Hotlinked corner images | Licence, reliability, and visual conflict. |
| Voxel avatar from an anime profile image | Auto-conversion was muddy. Single image gives only a relief. Ownership and fit concerns. |
| Supabase for the form | No notification without extra pieces. |
| Snapped sections | Fights smooth scrolling. |
| Bespoke 3D stage per Project | Cost and extensibility. |
| Particle field, single object, lettering, layered planes | See D9. |
| Direct redirect from Project Markers | Skips the card's context. |

---

## Open decisions

See `design.md`, section 14, for the full list. The main ones: real About copy, the three Projects' content, which social profiles, name and Hero line, hosting, analytics, and page metadata.
