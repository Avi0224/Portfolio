# 1. Data-Viz Sci-Fi Aesthetic

Date: 2026-10-05

## Status

Accepted

## Context

The initial design of the 3D terrain felt "empty" and lacked a clear futuristic direction. The point cloud density led to visual noise rather than a sleek look, and the camera animations tied strictly to scroll position felt too fast and jarring, preventing the user from appreciating the 3D environment.

We needed to define a specific aesthetic sub-genre of "futuristic" to guide the visual language and solve the emptiness without cluttering the screen with unnecessary geometry.

## Decision

We are adopting a **Data-Viz Sci-Fi** aesthetic. 

Specifically, this means:
1. **Visual Language**: Clean, stark, technical. We will use a HUD (Heads Up Display) overlay (crosshairs, subtle grids, coordinate readouts) to frame the content and fill the empty space at the edges of the screen.
2. **Environment**: We will introduce volumetric fog to the Three.js scene so the terrain fades gracefully into the horizon, enhancing the depth and atmospheric scale.
3. **Motion**: We are decoupling the dramatic forward camera travel from the initial scroll. During the Hero and About sections, the camera will feature a slow, ambient drift/orbit. Major camera movements will be reserved for navigating between Project markers to ensure the motion is deliberate and not jarring.

## Consequences

- We will need to build a 2D HTML/CSS HUD overlay component that sits on top of the R3F canvas but behind the main text content.
- We must configure `scene.fog` in Three.js and ensure the terrain materials respond correctly to it.
- `CameraRig.tsx` will need to be refactored to separate ambient continuous rotation from scroll-triggered waypoint interpolation.
