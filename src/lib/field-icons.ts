// Small line drawings that decorate each field's tile on the home page (src/components/GroupTiles.astro).
// Drawn for this site on a 24×24 grid, stroked in currentColor; each field has three, and a tile shows
// four (the first repeats).

const book = '<path d="M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1zM12 6v14"/>';
const pen = '<path d="M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3"/>';
const scroll = '<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8M6 4a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2zM8 8v10a2 2 0 0 1-4 0M11 9h5M11 13h5"/>';
const palette = '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><path d="M7.5 11h.01M9.5 7h.01M14.5 7h.01" stroke-width="3"/>';
const brush = '<path d="M18 3l3 3-9 9-3-3zM9 12c-3 0-5 2-5 5 0 1.5-1 2.5-2 3 4 1 8 0 9-3"/>';
const picture = '<path d="M3 4h18v15H3zM3 16l5-5 4 4 3-3 6 6M15.5 8.5h.01"/>';
const note = '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>';
const mask = '<path d="M4 4h16v6a8 8 0 0 1-16 0zM8 9h1.5M14.5 9H16M9 14c1.5 1.5 4.5 1.5 6 0"/>';
const film = '<path d="M3 5h18v14H3zM7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/>';
const atom = '<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/><circle cx="12" cy="12" r="1"/>';
const flask = '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7 15h10"/>';
const rocket = '<path d="M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10zM9 16l-2 5 3-2M15 16l2 5-3-2"/><circle cx="12" cy="9" r="1.5"/>';
const mace = '<path d="M12 22V11M9.5 11h5"/><circle cx="12" cy="6.5" r="4"/><path d="M12 2.5v8M8 6.5h8"/>';
const shield = '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>';
const flag = '<path d="M5 21V4M5 4h12l-2.5 4L17 12H5"/>';
const megaphone = '<path d="M3 10v4h3l9 5V5l-9 5zM6 14l1 5h2M18.5 9a4 4 0 0 1 0 6"/>';
const scales = '<path d="M12 3v18M8 21h8M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>';
const dove = '<path d="M21 6c-2 0-3 1-4 2-2-4-7-5-11-3 2 1 3 3 3 5-3 0-5 1-6 3 3 1 6 1 9 0 2 3 6 3 9 1-1-1-2-2-2-4 1-1 2-2 2-4z"/>';
const church = '<path d="M12 2v4M10 4h4M8 11a4 4 0 0 1 8 0M6 21V11h12v10M10 21v-5h4v5M3 21h18"/>';
const candle = '<path d="M12 3c1.5 2 1.5 3.5 0 4.5-1.5-1-1.5-2.5 0-4.5zM9.5 10h5v11h-5zM7 21h10"/>';
const cross = '<path d="M12 2v20M7 7h10M8 15l8-3"/>';
const ball = '<circle cx="12" cy="12" r="9"/><path d="M12 7.5l4 3-1.5 4.5h-5L8 10.5zM12 7.5V3M16 10.5l4-1.5M14.5 15l2.5 4M9.5 15L7 19M8 10.5L4 9"/>';
const dumbbell = '<path d="M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11"/>';
const medal = '<path d="M8 2l4 7 4-7"/><circle cx="12" cy="15" r="6"/><path d="M12 12.5v5"/>';
const helmet = '<path d="M3 16a9 9 0 0 1 18 0zM2 16h20M12 7V4M7 16v3h10v-3"/>';
const star = '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z"/>';

export const fieldIcons: Record<string, string[]> = {
  statehood: [mace, shield, flag],
  literature: [book, pen, scroll],
  'visual-arts': [palette, brush, picture],
  'performing-arts': [note, mask, film],
  science: [atom, flask, rocket],
  civic: [megaphone, scales, dove],
  faith: [church, candle, cross],
  sport: [ball, dumbbell, medal],
  defenders: [shield, helmet, star],
};

// Where the four drawings sit on a 300×200 tile (top-left corner, scale, rotation), clear of the
// faces (top left) and the name (bottom left); the drawing is anchored to the tile's right edge.
export const iconSpots = [
  { x: 232, y: 18, s: 2.5, r: -12 },
  { x: 194, y: 68, s: 1.4, r: 12 },
  { x: 246, y: 96, s: 1.7, r: 16 },
  { x: 192, y: 14, s: 1.1, r: -18 },
];
