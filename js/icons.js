/* Inline SVG icon set (16px grid, 1.5 stroke) and mechanism glyphs (48px grid). */
(function () {
  const PATHS = {
    search: '<circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>',
    bulb:
      '<path d="M6 12.5h4M6.6 14.5h2.8"/><path d="M8 1.75a4.25 4.25 0 0 0-2.6 7.6c.5.4.85 1 .85 1.65v.25h3.5V11c0-.65.35-1.25.85-1.65A4.25 4.25 0 0 0 8 1.75z"/>',
    moon: '<path d="M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8a5.6 5.6 0 1 0 6.8 6.8z"/>',
    play: '<path class="icon-fill" d="M5 3.2v9.6c0 .4.45.65.8.43l7.4-4.8a.5.5 0 0 0 0-.86L5.8 2.77A.5.5 0 0 0 5 3.2z"/>',
    pause: '<path d="M5.5 3.5v9M10.5 3.5v9"/>',
    external: '<path d="M9.5 2.5h4v4M13.5 2.5L7.5 8.5"/><path d="M12 9.5V13a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 3 13V5a.5.5 0 0 1 .5-.5H7"/>',
    arrowRight: '<path d="M3 8h10M9 4l4 4-4 4"/>',
    arrowLeft: '<path d="M13 8H3M7 4L3 8l4 4"/>',
    arrowDown: '<path d="M8 3v10M4 9l4 4 4-4"/>',
    close: '<path d="M4 4l8 8M12 4l-8 8"/>',
    grid: '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx=".6"/><rect x="9" y="2.5" width="4.5" height="4.5" rx=".6"/><rect x="2.5" y="9" width="4.5" height="4.5" rx=".6"/><rect x="9" y="9" width="4.5" height="4.5" rx=".6"/>',
    list: '<path d="M6 4h7.5M6 8h7.5M6 12h7.5"/><circle class="icon-fill" cx="3" cy="4" r=".9"/><circle class="icon-fill" cx="3" cy="8" r=".9"/><circle class="icon-fill" cx="3" cy="12" r=".9"/>',
    plus: '<path d="M8 3.5v9M3.5 8h9"/>',
    check: '<path d="M3.5 8.5l3 3 6-7"/>',
    chevronDown: '<path d="M4 6l4 4 4-4"/>',
    refresh: '<path d="M13.25 8a5.25 5.25 0 1 1-1.54-3.71"/><path d="M13.25 2.5v3.25H10"/>',
    columns: '<rect x="2.5" y="3" width="4.5" height="10" rx=".6"/><rect x="9" y="3" width="4.5" height="10" rx=".6"/>',
    enter: '<path d="M13 3.5v4a2 2 0 0 1-2 2H3.5M6 6.5l-3 3 3 3"/>',
    updown: '<path d="M5 6l3-3 3 3M5 10l3 3 3-3"/>',
    book: '<path d="M3 3.25A1.25 1.25 0 0 1 4.25 2H13v10H4.25A1.25 1.25 0 0 0 3 13.25zM3 13.25A1.25 1.25 0 0 0 4.25 14.5H13"/>',
    github:
      '<path class="icon-fill" d="M8 1.3a6.7 6.7 0 0 0-2.12 13.06c.34.06.46-.15.46-.32v-1.15c-1.86.4-2.25-.9-2.25-.9-.3-.78-.74-.98-.74-.98-.61-.42.05-.41.05-.41.67.05 1.03.7 1.03.7.6 1.02 1.57.72 1.95.55.06-.43.23-.72.42-.89-1.49-.17-3.05-.74-3.05-3.3 0-.73.26-1.33.69-1.8-.07-.17-.3-.85.06-1.77 0 0 .56-.18 1.84.69a6.4 6.4 0 0 1 3.35 0c1.28-.87 1.84-.69 1.84-.69.36.92.13 1.6.07 1.77.43.47.69 1.07.69 1.8 0 2.57-1.57 3.13-3.06 3.3.24.21.46.62.46 1.25v1.85c0 .18.12.39.46.32A6.7 6.7 0 0 0 8 1.3z"/>'
  };

  // 48 x 48 line drawings used when a ride has no embeddable footage.
  const GLYPHS = {
    c1:
      '<path d="M5 39h38M5 43h38" /><path d="M8 39v4M16 39v4M24 39v4M32 39v4M40 39v4" opacity=".5"/>' +
      '<path d="M12 33h24l-2.5-11h-19z"/><path d="M18 22v-5h12v5"/><circle cx="17" cy="35.5" r="2.5"/><circle cx="31" cy="35.5" r="2.5"/>',
    c2:
      '<path d="M5 41h38" /><path d="M9 36c6-10 24-10 30 0" stroke-dasharray="2 3"/>' +
      '<path d="M15 33h18l-2-8H17z"/><circle cx="19" cy="35" r="2"/><circle cx="29" cy="35" r="2"/><path d="M24 15v4M20.5 16.5l1.5 2.5M27.5 16.5l-1.5 2.5" opacity=".7"/>',
    c3:
      '<path d="M5 8h38M5 11h38" /><path d="M24 11v8"/><circle cx="24" cy="11" r="1.6"/>' +
      '<path d="M15 19h18v13a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3z"/><path d="M19 25h10" opacity=".6"/><path d="M10 42c4-2 8-2 12 0s8 2 12 0" opacity=".45"/>',
    c4:
      '<path d="M15 4v40M33 4v40" /><path d="M15 4h18" opacity=".5"/>' +
      '<rect x="18" y="19" width="12" height="13" rx="1"/><path d="M24 10v5M21.5 12.5L24 10l2.5 2.5M24 41v-5M21.5 38.5L24 41l2.5-2.5"/>',
    c5:
      '<path d="M4 33c3.5-2.5 7-2.5 10 0s6.5 2.5 10 0 6.5-2.5 10 0 6.5 2.5 10 0" /><path d="M4 39c3.5-2.5 7-2.5 10 0s6.5 2.5 10 0 6.5-2.5 10 0 6.5 2.5 10 0" opacity=".5"/>' +
      '<path d="M11 27h26l-4 6H15z"/><path d="M24 27V15l8 8h-8"/>',
    t1:
      '<path d="M5 40a19 19 0 0 1 38 0" /><path d="M10 40a14 14 0 0 1 28 0" opacity=".35"/>' +
      '<path d="M18 30h12M16 34h16M14 38h20"/><path d="M24 30v-6" opacity=".6"/>',
    t2:
      '<rect x="13" y="12" width="22" height="13" rx="2"/><path d="M18 18h12" opacity=".6"/>' +
      '<path d="M16 25l-5 13M24 25v13M32 25l5 13M18 25l12 13M30 25L18 38" opacity=".75"/><path d="M8 40h32"/>',
    t3:
      '<ellipse cx="24" cy="31" rx="17" ry="6"/><ellipse cx="24" cy="31" rx="7" ry="2.5" opacity=".6"/><path d="M24 31v9M14 40h20"/>' +
      '<path d="M33 18a12 7 0 0 1 3.5 4" /><path d="M36.5 18.5v3.5H33" />',
    t4:
      '<path d="M6 40V22a18 18 0 0 1 36 0v18"/><path d="M11 40V23a13 13 0 0 1 26 0v17" opacity=".35"/>' +
      '<rect x="16" y="28" width="16" height="8" rx="1.5"/><path d="M14 40h20" />',
    t5:
      '<rect x="11" y="11" width="26" height="26" rx="1" transform="rotate(18 24 24)"/>' +
      '<path d="M18 29h12M20 29v4M28 29v4" /><path d="M24 15v10" opacity=".6"/><path d="M7 15a19 19 0 0 1 8-8" /><path d="M15 3.5V7h-3.5"/>',
    t6:
      '<path d="M9 41L39 11" opacity=".55"/><circle cx="31" cy="21" r="3"/><path d="M27 33c0-4 2-7 4-7s4 3 4 7"/>' +
      '<circle cx="17" cy="21" r="3" opacity=".45" stroke-dasharray="1.5 2"/><path d="M13 33c0-4 2-7 4-7s4 3 4 7" opacity=".45" stroke-dasharray="1.5 2"/><path d="M6 41h36"/>'
  };

  window.icon = function (name, cls) {
    return (
      '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 16 16" aria-hidden="true">' +
      (PATHS[name] || "") +
      "</svg>"
    );
  };

  window.glyph = function (key, cls) {
    return (
      '<svg class="' + (cls || "thumb-glyph") + '" viewBox="0 0 48 48" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (GLYPHS[key] || GLYPHS.c1) +
      "</svg>"
    );
  };

  window.BRAND_MARK =
    '<svg class="brand-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 20.25V11a7 7 0 0 1 14 0v9.25"/><path d="M2.5 20.25h19"/>' +
    '<circle cx="12" cy="16.4" r="1.9" fill="currentColor" stroke="none"/></svg>';
})();
