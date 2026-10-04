import { projects } from './projects'

export const socialMarkers = [
  {
    id: "github",
    label: "GitHub",
    position: [12, 0, 25] as [number, number, number],
    href: "https://github.com"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    position: [-18, 0, 15] as [number, number, number],
    href: "https://linkedin.com"
  },
  {
    id: "instagram",
    label: "Instagram",
    position: [0, -2, 20] as [number, number, number],
    href: "https://instagram.com"
  }
];

export const projectMarkers = projects.map((proj, i) => ({
  id: `project-${i}`,
  label: proj.title,
  // The marker should be placed somewhere in view of the waypoint
  position: [proj.waypoint[0], proj.waypoint[1] - 3, proj.waypoint[2] - 5] as [number, number, number],
  onClick: () => {
    // We would scroll to the specific project section
    const el = document.getElementById('projects');
    if (el) {
      // Very basic jump logic for now
      window.scrollTo({ top: el.offsetTop + (i * window.innerHeight), behavior: 'smooth' });
    }
  }
}));
