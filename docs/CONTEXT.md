# 3D Portfolio

A personal portfolio site for a developer/designer. Its job is to get a visitor to look at the owner's work and then get in touch.

## Language

**Visitor**:
A recruiter or prospective client who arrives at the site to evaluate the owner's work.
_Avoid_: user, viewer, audience

**Project**:
One piece of the owner's work shown to a Visitor, with a visual and a link out. The site launches with three and is expected to grow to five.
_Avoid_: case study, work, item

**Scene**:
The single persistent 3D world that sits behind the whole page. It is shared by every section rather than rebuilt per section. Its form is the Terrain.
_Avoid_: background, canvas, stage

**Terrain**:
The Scene's landscape: a surface drawn as contour lines, with points on it. The camera travels over it as the Visitor scrolls.
_Avoid_: map, mesh, field

**Waypoint**:
The camera position and angle the Scene reaches for a given Project. Each Project has exactly one. The camera travels continuously between Waypoints as the Visitor scrolls, so sections without a Waypoint are stretches of travel, not stops.
_Avoid_: shot, view, keyframe

**Overview**:
The wide camera pose reached at Contact, showing the whole Terrain with every Marker visible. It is not a Waypoint, because it belongs to no Project.
_Avoid_: end pose, final shot, wide shot

**Marker**:
A point on the Scene that a Visitor can activate to go somewhere. It grows when hovered so a Visitor can tell it from a decorative point. A Marker is either a Project marker, which moves the camera to that Project's Waypoint and shows its card, or a social marker, which opens one of the owner's profiles in a new tab. Points that do nothing are not Markers.
_Avoid_: hotspot, pin, link, node

**Contact**:
The point at which a Visitor reaches out to the owner. This is the site's primary conversion. It also names the final page section where the contact form and profile links live.
_Avoid_: lead, submission, conversion

## Relationships

- A **Visitor** looks at one or more **Projects**, then makes **Contact**.
- There is one **Scene**, and its form is the **Terrain**. Each **Project** has one **Waypoint** within it.
- Sections without a **Project** (Hero, About) have no **Waypoint**. The Contact section rests at the **Overview**.
- The **Terrain** holds many points; only some are **Markers**.
- A **Project**'s own content (visual, title, link) is not part of the **Scene**.
