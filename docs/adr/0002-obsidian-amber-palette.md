# 2. Obsidian & Amber Color Palette (Deus Ex Style)

Date: 2026-10-05

## Status

Accepted

## Context

The initial Deep Blue / Cyan color palette lacked the premium, striking contrast required for the Data-Viz Sci-Fi aesthetic. Furthermore, the typography was too large and basic, failing to communicate a futuristic, highly technical interface, and the HUD elements were overlapping with the core site navigation.

## Decision

We are switching the color palette and typography to an **Obsidian / Amber** theme (often associated with the "Deus Ex" aesthetic).

Specifically:
1. **Base Theme**: "Obsidian" - Deep black/charcoal backgrounds (`#050505` or Tailwind `neutral-950`) with high-contrast elements and glassmorphism.
2. **Accent Glow**: "Amber / Gold" - The 3D terrain, HUD lines, and interactive elements will glow in shades of Amber and Gold (`#f59e0b` / `#fbbf24`), providing a warm, premium contrast against the cold black void.
3. **Typography**: "Sleek & Technical" - Headers will be scaled down, set to uppercase, and highly tracked (wide letter-spacing). This mimics advanced terminal readouts.
4. **Layout**: The HUD component will be pushed strictly to the background layer (`-z-10` or behind text) or properly padded so it does not intersect with the Header or readable text.

## Consequences

- We must update the WebGL shaders (`Terrain.tsx`) to mix amber/gold colors instead of blue/cyan.
- The `Scene.tsx` or `Terrain.tsx` fog must match the new deep black background.
- Tailwind global styles (`index.css` or `App.tsx` container) must be changed from `bg-slate-900` to `bg-neutral-950`.
- All `text-cyan-*` and `border-cyan-*` classes in `Hud.tsx` must become `amber`.
- `Hero.tsx` and `Header.tsx` typography must be aggressively re-styled for the technical look.
