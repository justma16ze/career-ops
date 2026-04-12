/**
 * styles/blush.mjs — Warm Blush-Cream Editorial
 *
 * Warm blush-cream background, centered serif editorial, single yellow accent,
 * Italian typography restraint. CSS @layer, fluid clamp() type, rlh spacing.
 */

export const name = 'blush';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #fdf3e7;
  --bg-alt: #f8edd9;
  --bg-card: #fdf3e7;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #3d2f1e;
  --text-muted: #5a4a38;
  --text-faint: #8a7560;

  /* Accent */
  --accent: #3d2f1e;
  --accent-hover: #3d2f1e;

  /* Borders */
  --border: #e6d5c3;
  --border-light: #f0e6d8;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  --font-mono: Georgia, serif;

  /* Spacing */
  --wrap-width: 640px;
  --nav-height: 48px;

  /* Footer — light bg */
  --footer-text: #665540;
  --footer-link: #44362a;
  --footer-link-hover: #3d2f1e;
  --footer-border: var(--border);
}

@layer reset, base, layout, components, responsive, print;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer base {
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: scroll;
  }
  body {
    font-family: var(--font-body);
    font-size: clamp(0.875rem, 0.8rem + 0.25vw, 1.125rem);
    color: var(--text);
    background: var(--bg);
    line-height: 1.7;
    margin: 0;
    padding: 0;
  }
  a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-color: #c9b99a;
    transition: text-decoration-color 0.2s;
  }
  a:hover {
    color: var(--accent-hover);
    text-decoration-color: var(--text);
  }
  ::selection {
    background: #FFF7B1;
    color: var(--text);
  }
}

@layer layout {
  .wrap {
    max-width: var(--wrap-width);
    margin: 0 auto;
    padding: 3rlh 2.5rem 3rlh;
  }
}

@layer components {
  /* Nav */
  nav {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin-bottom: 2rlh;
    padding-bottom: 1rlh;
    border-bottom: 1px solid var(--border);
  }
  .site-name {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem);
    color: var(--text);
    text-decoration: none;
    margin-right: auto;
    letter-spacing: 0.01em;
  }
  nav a {
    font-size: 0.85em;
    color: #6b5744;
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  nav a:hover { color: var(--text); }
  nav .active {
    font-size: 0.85em;
    color: var(--text);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background-image: linear-gradient(to top, #FFF7B1 30%, transparent 30%);
    padding-bottom: 1px;
  }

  /* Headings — yellow highlight underline */
  h2 {
    font-family: var(--font-display);
    font-size: clamp(1rem, 0.95rem + 0.2vw, 1.2rem);
    font-weight: 700;
    color: var(--text);
    margin: 2.5rlh 0 1rlh;
    letter-spacing: -0.01em;
    display: inline-block;
    background-image: linear-gradient(to top, #FFF7B1 35%, transparent 35%);
    padding: 0 0.15em;
    margin-left: -0.15em;
  }

  /* Home bio */
  .home-bio {
    font-size: clamp(0.9375rem, 0.85rem + 0.25vw, 1.125rem);
    color: #4a3a28;
    line-height: 1.85;
    margin-bottom: 2rlh;
    margin-top: 0.5rlh;
  }
  .home-bio p { margin-bottom: 1.25rlh; }
  .home-bio a { color: var(--text); font-weight: 600; }

  /* Intro */
  .intro {
    font-size: clamp(0.9375rem, 0.85rem + 0.25vw, 1.125rem);
    color: #4a3a28;
    line-height: 1.8;
    margin-bottom: 2rlh;
  }
  .intro p { margin-bottom: 1rlh; }
  .intro a { color: var(--text); }

  /* Entries */
  .entries { margin-top: 1rlh; }
  .entry { padding: 1rlh 0; border-bottom: 1px solid var(--border); }
  .entry:last-child { border-bottom: none; }
  .entry-header {
    display: flex; justify-content: space-between; align-items: baseline;
    gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.25rlh;
  }
  .entry-title {
    font-family: var(--font-display); font-weight: 700;
    font-size: clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem);
    color: var(--text);
  }
  .entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: #c9b99a; text-underline-offset: 0.15em; }
  .entry-title a:hover { text-decoration-color: var(--text); }
  .entry-date { font-size: 0.8em; color: var(--text-faint); white-space: nowrap; letter-spacing: 0.02em; font-family: var(--font-mono); }
  .entry-role { font-size: 0.9em; color: var(--text-muted); font-style: italic; margin-bottom: 0.25rlh; }
  .entry-desc { font-size: 0.9em; color: var(--text-muted); line-height: 1.7; }
  .entry ul { margin: 0.5rlh 0 0 0; padding-left: 1.2em; font-size: 0.9em; color: var(--text-muted); list-style: disc; }
  .entry li { margin-bottom: 0.25rlh; line-height: 1.6; color: var(--text-muted); }

  /* Sub-entries */
  .sub-entry { padding: 0.75rlh 0 0; margin-top: 0.75rlh; border-top: 1px solid var(--border-light); }
  .sub-entry:first-child { padding-top: 0.25rlh; margin-top: 0.25rlh; border-top: none; }
  .sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 0.9em; color: var(--text); }
  .sub-entry .entry-date { font-size: 0.75em; }

  /* Details */
  details { margin-top: 0.5rlh; }
  details summary { cursor: pointer; font-size: 0.8em; color: var(--text-faint); list-style: none; }
  details summary::-webkit-details-marker { display: none; }
  details summary::before { content: '+ more'; }
  details[open] summary::before { content: '- less'; }
  details .detail-content { padding-top: 0.5rlh; }

  /* Projects */
  .project-entry { padding: 1rlh 0; border-bottom: 1px solid var(--border); }
  .project-entry:last-child { border-bottom: none; }
  .project-name { font-family: var(--font-display); font-weight: 700; font-size: clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem); color: var(--text); }
  .project-name a { color: var(--text); text-decoration: underline; text-decoration-color: #c9b99a; text-underline-offset: 0.15em; }
  .project-name a:hover { text-decoration-color: var(--text); }
  .project-metric { display: inline-block; font-size: 0.8em; color: #6b5744; background: #FFF7B1; padding: 0.1em 0.5em; margin-left: 0.5em; letter-spacing: 0.02em; }
  .project-desc { font-size: 0.9em; color: var(--text-muted); line-height: 1.7; margin-top: 0.25rlh; }

  /* About */
  .strengths-list { list-style: none; padding: 0; margin: 0; }
  .strengths-list li { font-size: 0.95em; color: #4a3a28; padding: 0.25rlh 0; border-bottom: 1px solid #efe3d5; }
  .strengths-list li:last-child { border-bottom: none; }
  .skills-grid { font-size: 0.9em; color: var(--text-muted); line-height: 1.6; column-count: 3; column-gap: 1.5rem; }
  .skills-grid span { display: block; padding: 0.15rlh 0; }
  .skills-list { font-size: 0.9em; color: var(--text-muted); }
  .contact-line { font-size: 0.95em; }
  .contact-line a { margin-right: 1.25rem; }

  /* Footer */
  footer { margin-top: 3rlh; padding-top: 1rlh; border-top: 1px solid var(--footer-border); font-size: 0.75em; color: var(--footer-text); letter-spacing: 0.04em; }
  footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-decoration-color: #c9b99a; }
  footer a:hover { color: var(--footer-link-hover); text-decoration-color: var(--footer-link); }
}

@layer responsive {
  @media (max-width: 660px) {
    .wrap { width: 100% !important; padding: 2rlh 1.5rem; }
    nav { font-size: 0.9em; gap: 0.75rem; flex-wrap: wrap; }
    .entry-header { flex-direction: column; }
    .entry-date { float: none; margin-bottom: 0.15rlh; }
    .sub-entry .entry-header { flex-direction: column; }
    .sub-entry .entry-date { float: none; }
    .skills-grid { column-count: 2; }
    .home-bio { font-size: 0.9375rem; }
    p { word-wrap: break-word; overflow-wrap: break-word; }
  }
  @media (max-width: 480px) {
    .wrap { padding: 1.5rlh 1rem !important; }
    nav .site-name { font-size: 1.2rem; }
    h2 { font-size: 0.95rem; }
    nav { font-size: 0.8em; gap: 0.5rem; }
    .entry-title { font-size: 0.9rem; }
    .entry-desc { font-size: 0.85em; }
    .entry ul { font-size: 0.85em; }
    .home-bio { font-size: 0.875rem; }
    .strengths-list li { font-size: 0.875rem; }
    .skills-grid { column-count: 1; }
  }
}

@layer print {
  @media print {
    nav, footer { display: none; }
    .wrap { padding: 1rem; max-width: none; width: 100%; }
    body { background: #fff; }
  }
}
`;
}
