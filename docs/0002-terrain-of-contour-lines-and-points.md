# 0002. The Scene is a Terrain of contour lines and points

Status: accepted, 2026-10-04.

## Context

With a shared Scene (ADR 0001), the world must look good from several camera angles and support interactive points. We considered a single sculptural object, a grounded composition of blocks, a particle field, a contour surface, extruded lettering, and layered planes. The owner chose to combine the particle field and the contour surface. A voxel avatar built from a personal image was also explored and dropped.

## Decision

The **Scene** is a **Terrain**: a landscape drawn with contour lines, plus sparse points near the peaks. The camera flies over it. A few points are **Markers** that lead somewhere (see `CONTEXT.md`).

## Consequences

- Camera travel is natural: each Waypoint is a position over the Terrain, and the Contact section rests at an Overview.
- Lines and points are unlit and cheap to draw. No model files, no scene lighting.
- There is no single hero object, so the original brief's "object follows the mouse" becomes "the cursor swells the Terrain".
- Moving linework behind body text is a legibility risk. It is unverified and must be tested on a real phone.
- Topographic contours are a recognisable look (opinion). The sparse points, the Markers, and the cursor response are what keep it distinctive.
- Reversing later means replacing the Scene content and the Marker positions, though the camera and scroll wiring would survive.

## Alternatives rejected

Single object, grounded composition, particle field alone, extruded lettering, layered planes, and the voxel avatar. Reasons are in `decisions.md`, D9.

## Evidence

A similar procedural contour approach exists as a Framer Marketplace component (TerrainLines), built on three.js and custom shaders, which supports feasibility. It is reference only, not a dependency.
