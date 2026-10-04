# 0001. One shared Scene with one Waypoint per Project

Status: accepted, 2026-10-04.

## Context

The portfolio uses a 3D background and scroll-driven camera. We had to decide whether each Project gets its own 3D stage or whether one Scene serves the whole page. The owner plans to add two more Projects later.

## Decision

There is one persistent **Scene** behind the whole page. The camera moves between **Waypoints**, one per Project. A Project's visual, title, and link are HTML laid over the Scene, not part of it.

## Consequences

- Adding a Project is a data entry. It adds a Waypoint and a card, not a new 3D asset.
- GPU load and download size stay low.
- The scroll moment is less spectacular than a per-Project 3D stage.
- Sections without a Project (Hero, About) have no Waypoint. The camera is simply travelling.
- Reversing this later means rebuilding the Scene and the scroll logic.

## Alternative rejected

A bespoke 3D stage per Project. More spectacle, but each new Project needs a modeled and optimised asset, and the stage would compete with the Project's own screenshot.

See `decisions.md`, D2.
