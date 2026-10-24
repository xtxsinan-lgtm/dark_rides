/*
  Mechanism lab — engineering schematic drawings rendered as inline SVG.
  All strokes/fills use CSS classes (see .bp-* in styles.css) so drawings follow the theme.
  Contains:
  1. LAB.modes: 12 Side-by-Side Comparison schematics (matching DISTINCTIONS_DATA 1-to-1)
  2. LAB.mechs: Schematics for all 55 leaf mechanisms (1.1.1.1 - 5.2 & T1.1 - T6.7)
*/
(function () {
  const W = 840;
  const H = 400;
  const D = Math.PI / 180;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => t * t * (3 - 2 * t);
  const f = (n) => Math.round(n * 10) / 10;
  const S = (k, d) => (window.LAB_SVG && window.LAB_SVG[k]) || d;

  function rot(x, y, deg) {
    const r = deg * D;
    return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
  }

  function open() {
    return (
      '<svg class="bp" viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img">' +
      "<defs>" +
      '<pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" class="bp-grid" fill="none"/></pattern>' +
      '<pattern id="bp-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" class="bp-hatch"/></pattern>' +
      "</defs>" +
      '<rect width="' + W + '" height="' + H + '" fill="url(#bp-grid)"/>'
    );
  }

  const close = () => "</svg>";

  function title(x, code, name, sub) {
    return (
      '<text x="' + x + '" y="34"><tspan class="bp-tag">' + code + '</tspan><tspan dx="10" class="bp-title">' + name + "</tspan></text>" +
      (sub ? '<text x="' + x + '" y="52" class="bp-label">' + sub + "</text>" : "")
    );
  }

  function text(x, y, s, cls, anchor) {
    return '<text x="' + f(x) + '" y="' + f(y) + '" class="' + (cls || "bp-label") + '"' + (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" + s + "</text>";
  }

  function callout(px, py, lx, ly, s, anchor) {
    return (
      '<path d="M' + f(px) + " " + f(py) + "L" + f(lx) + " " + f(ly) + '" class="bp-leader"/>' +
      '<circle cx="' + f(px) + '" cy="' + f(py) + '" r="1.8" class="bp-dot"/>' +
      text(lx + (anchor === "end" ? -4 : 4), ly + 3.5, s, "bp-label-strong", anchor)
    );
  }

  function ground(x1, x2, y) {
    return '<rect x="' + x1 + '" y="' + y + '" width="' + (x2 - x1) + '" height="12" fill="url(#bp-hatch)"/><path d="M' + x1 + " " + y + "H" + x2 + '" class="bp-ink"/>';
  }

  function ceiling(x1, x2, y) {
    return '<rect x="' + x1 + '" y="' + (y - 12) + '" width="' + (x2 - x1) + '" height="12" fill="url(#bp-hatch)"/><path d="M' + x1 + " " + y + "H" + x2 + '" class="bp-ink"/>';
  }

  function shaft(x1, x2, y1, y2) {
    return (
      '<path d="M' + x1 + " " + y1 + "V" + y2 + "M" + x2 + " " + y1 + "V" + y2 + '" class="bp-ink" stroke-width="2"/>' +
      '<rect x="' + (x1 - 12) + '" y="' + y1 + '" width="12" height="' + (y2 - y1) + '" fill="url(#bp-hatch)"/>' +
      '<rect x="' + x2 + '" y="' + y1 + '" width="12" height="' + (y2 - y1) + '" fill="url(#bp-hatch)"/>'
    );
  }

  function divider(x) {
    return '<path d="M' + (x || 420) + ' 24V376" class="bp-faint"/>';
  }

  function rider(x, y, s) {
    s = s || 1;
    return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + 4.6 * s + '" class="bp-joint"/>';
  }

  function poly(points, cls) {
    return '<path d="M' + points.map((p) => f(p[0]) + " " + f(p[1])).join("L") + 'Z" class="' + cls + '"/>';
  }

  function polyAt(cx, cy, deg, points, cls) {
    return poly(points.map(([x, y]) => { const [rx, ry] = rot(x, y, deg); return [cx + rx, cy + ry]; }), cls);
  }

  function water(x1, x2, y, amp, phase) {
    amp = amp || 2;
    phase = phase || 0;
    let d = "M" + x1 + " " + y;
    for (let x = x1; x <= x2; x += 10) d += "L" + x + " " + f(y + Math.sin(x / 24 + phase) * amp);
    return '<path d="' + d + '" class="bp-water"/>';
  }

  /* =================================================================
     PART 1: 12 COMPARISON SCHEMATICS (MODES 0 - 11)
     ================================================================= */

  // 0. armVsSuspended
  function armVsSuspended(p) {
    let s = open();
    s += title(24, "1.1.3.1", S("m0_l_name", "地面轨道 + 六轴机械臂"), S("m0_l_sub", "环球《禁忌之旅》《怪物大暴走》"));
    s += title(444, "3.3", S("m0_r_name", "顶部悬挂多自由度座舱"), S("m0_r_sub", "方特《烈焰风云》"));
    s += divider();

    s += ground(24, 396, 340);
    s += '<path d="M24 332H396" class="bp-ink"/>';
    for (let x = 34; x < 396; x += 22) s += '<path d="M' + x + ' 332V340" class="bp-faint"/>';
    s += '<path d="M24 290H396" class="bp-dash"/>';
    s += text(28, 284, S("m0_floor_deck", "黑色地台（遮住下方轨道）"));
    s += '<path d="M318 72Q392 186 318 292" class="bp-screen"/>';
    s += text(390, 80, S("m0_carousel_dome", "随车移动的球幕"), "bp-label", "end");

    const bx = lerp(92, 252, p.t / 100);
    s += '<rect x="' + f(bx - 34) + '" y="304" width="68" height="24" rx="2" class="bp-body"/>';
    s += '<circle cx="' + f(bx - 20) + '" cy="330" r="3.6" class="bp-joint"/><circle cx="' + f(bx + 20) + '" cy="330" r="3.6" class="bp-joint"/>';
    s += '<rect x="' + f(bx - 13) + '" y="292" width="26" height="12" rx="2" class="bp-body"/>';

    const a1 = p.a - 8;
    const a2 = 72 + p.b;
    const seatTilt = p.a * 1.5;
    const sx = bx;
    const sy = 292;
    s += '<g transform="translate(' + f(sx) + " " + sy + ") rotate(" + f(a1) + ')">';
    s += poly([[-8, 0], [-5.5, -104], [5.5, -104], [8, 0]], "bp-move-body");
    s += '<g transform="translate(0 -104) rotate(' + f(a2) + ')">';
    s += poly([[0, -5], [90, -3.5], [90, 3.5], [0, 5]], "bp-move-body");
    s += '<g transform="translate(90 0) rotate(' + f(seatTilt - a1 - a2) + ')">';
    s += '<path d="M0 0V40H34" class="bp-move"/><path d="M6 40V24" class="bp-move"/>';
    s += rider(16, 24) + rider(28, 24);
    s += '<circle r="5" class="bp-joint"/></g>';
    s += '<circle r="6" class="bp-joint"/></g>';
    s += '<circle r="7" class="bp-joint"/></g>';

    s += callout(bx + 30, 318, bx + 64, 360, S("m0_chassis_callout", "配重底盘沿地面轨道行驶"));
    const [ex, ey] = rot(0, -52, a1);
    s += callout(sx + ex, sy + ey, 44, 170, S("m0_arm_callout", "六轴机械臂"), "start");
    s += text(24, 388, S("m0_l_foot", "轨道在地面 · 座椅可伸缩、抬升、近乎平躺"), "bp-label");

    // Right: suspended
    s += ceiling(444, 816, 78);
    s += '<rect x="444" y="80" width="372" height="7" class="bp-body"/>';
    const tx = lerp(530, 730, p.t / 100);
    s += '<rect x="' + f(tx - 30) + '" y="90" width="60" height="13" rx="2" class="bp-body"/>';
    s += '<circle cx="' + f(tx - 18) + '" cy="88" r="3.6" class="bp-joint"/><circle cx="' + f(tx + 18) + '" cy="88" r="3.6" class="bp-joint"/>';
    s += '<ellipse cx="' + f(tx) + '" cy="109" rx="22" ry="5" class="bp-move-body"/>';
    const swing = p.a * 1.35;
    s += '<g transform="translate(' + f(tx) + " 112) rotate(" + f(swing) + ')">';
    s += '<path d="M-10 0L-15 94M10 0L15 94" class="bp-move"/>';
    s += '<rect x="7" y="20" width="8" height="40" rx="2" transform="rotate(3)" class="bp-move-body"/>';
    s += '<g transform="translate(0 94) rotate(' + f(p.b * 0.8) + ')">';
    s += '<rect x="-46" y="0" width="92" height="52" rx="6" class="bp-move-body"/>';
    s += rider(-22, 22) + rider(0, 22) + rider(22, 22);
    s += "</g></g>";
    s += ground(444, 816, 350);
    s += callout(tx + 20, 109, Math.min(tx + 64, 760), 132, S("m0_slew_callout", "回转支承"));
    s += callout(tx - 13, 160, Math.max(tx - 66, 470), 182, S("m0_links_callout", "液压连杆"), "end");
    s += text(812, 70, S("m0_ceil_track", "天花板轨道"), "bp-label", "end");
    s += text(444, 388, S("m0_r_foot", "轨道在天花板 · 座舱重心始终在轨道正下方"), "bp-label");
    return s + close();
  }

  // 1. scoopVsEmv
  function scoopVsEmv(p) {
    let s = open();
    s += title(24, "1.1.2.1", S("m1_l_name", "车载六自由度 + 旋转座舱"), S("m1_l_sub", "环球《蜘蛛侠》《变形金刚》、方特《女娲补天》"));
    s += title(444, "1.1.2.3", S("m1_r_name", "越野吉普（EMV）"), S("m1_r_sub", "迪士尼《印第安纳琼斯》、方特《秦俑地宫》"));
    s += divider();

    s += '<path d="M48 84Q200 62 352 84" class="bp-screen"/>';
    s += text(200, 104, S("m1_screen", "3D 屏幕 · 透视随车辆位置校正"), "bp-label", "middle");
    s += ground(24, 396, 340);
    s += '<path d="M24 332H396" class="bp-ink"/>';
    s += '<rect x="148" y="304" width="124" height="24" rx="2" class="bp-body"/>';
    s += '<circle cx="168" cy="330" r="3.6" class="bp-joint"/><circle cx="252" cy="330" r="3.6" class="bp-joint"/>';
    const lift = (p.t / 100) * 26;
    const pcx = 210;
    const pcy = 254 - lift;
    const top = [-34, -14, 14, 34].map((x) => { const [rx, ry] = rot(x, 0, p.a); return [pcx + rx, pcy + ry]; });
    const base = [[176, 302], [196, 302], [224, 302], [244, 302]];
    const pairs = [[0, 1], [1, 0], [2, 3], [3, 2]];
    pairs.forEach(([b, t]) => { s += '<path d="M' + base[b][0] + " " + base[b][1] + "L" + f(top[t][0]) + " " + f(top[t][1]) + '" class="bp-move"/>'; });
    s += '<g transform="translate(' + pcx + " " + f(pcy) + ") rotate(" + f(p.a) + ')">';
    s += '<ellipse cx="0" cy="-3" rx="52" ry="7" class="bp-move-body"/>';
    s += poly([[-58, -8], [58, -8], [48, -54], [-48, -54]], "bp-move-body");
    s += rider(-24, -36) + rider(0, -36) + rider(24, -36);
    s += "</g>";
    s += callout(244, 286, 300, 262, S("m1_platform_callout", "六自由度平台"));
    s += callout(160, pcy - 3, 96, pcy - 22, S("m1_turntable_callout", "360° 旋转盘"), "end");
    s += '<circle cx="354" cy="176" r="26" class="bp-faint"/>';
    s += '<g transform="translate(354 176) rotate(' + f(p.y) + ')"><path d="M0 14V-16M-5 -10L0 -17L5 -10" class="bp-move"/></g>';
    s += text(354, 218, S("m1_yaw_inset", "俯视 · 可 360° 旋转"), "bp-label", "middle");
    s += text(24, 388, S("m1_l_foot", "动感平台 + 旋转座舱 + 3D 屏幕"), "bp-label");

    // Right: EMV
    s += '<path d="M470 300V214H498V300" class="bp-ink"/><circle cx="484" cy="200" r="12" class="bp-ink"/><path d="M462 300H506" class="bp-ink"/>';
    s += text(484, 182, S("m1_aa", "实景人像"), "bp-label", "middle");
    s += '<circle cx="704" cy="140" r="30" class="bp-ink"/><path d="M684 128q20 -14 40 4" class="bp-faint"/>';
    s += text(704, 92, S("m1_boulder", "滚石机关"), "bp-label", "middle");
    s += ground(444, 816, 340);
    s += '<path d="M444 332H816" class="bp-ink"/>';
    s += '<rect x="560" y="304" width="140" height="24" rx="2" class="bp-body"/>';
    s += '<circle cx="584" cy="330" r="3.6" class="bp-joint"/><circle cx="676" cy="330" r="3.6" class="bp-joint"/>';
    const bump = Math.sin((p.t / 100) * Math.PI * 3) * 6 + (p.t / 100) * 10;
    const jcx = 630;
    const jcy = 282 - bump;
    const tilt = p.a * 1.2;
    [-48, 0, 48].forEach((x) => {
      const [rx, ry] = rot(x, 0, tilt);
      s += '<path d="M' + (jcx + x) + " 304L" + f(jcx + rx) + " " + f(jcy + ry) + '" class="bp-move" stroke-width="4"/>';
    });
    s += '<g transform="translate(' + jcx + " " + f(jcy) + ") rotate(" + f(tilt) + ')">';
    s += '<path d="M74 -18L196 -74L196 30Z" class="bp-beam"/>';
    s += poly([[-76, 0], [76, 0], [72, -28], [44, -32], [-62, -32], [-76, -18]], "bp-move-body");
    s += '<path d="M40 -32L52 -52" class="bp-move"/>';
    s += rider(-44, -42) + rider(-12, -42) + rider(20, -42);
    s += "</g>";
    s += callout(678, jcy + 10, 744, 262, S("m1_hyd_callout", "液压悬挂"));
    s += '<circle cx="790" cy="190" r="22" class="bp-faint"/><path d="M790 202V174M785 180L790 173L795 180" class="bp-ink"/>';
    s += text(790, 228, S("m1_fwd_inset", "车头始终朝前"), "bp-label", "middle");
    s += text(444, 388, S("m1_r_foot", "不旋转 · 不戴 3D 眼镜 · 惊险来自实景与机关"), "bp-label");
    return s + close();
  }

  // 2. shenhua
  function shenhua(p) {
    let s = open();
    s += title(24, "2.2.2", S("m2_name", "无轨动感车 + 倾斜球幕"), S("m2_sub", "方特《神画》《千古风华》：不悬空，如何做出飞行的体感"));

    s += '<rect x="24" y="300" width="446" height="12" fill="url(#bp-hatch)"/><path d="M24 300H470V384" class="bp-ink"/>';
    [44, 120, 196].forEach((x) => {
      s += '<rect x="' + x + '" y="146" width="58" height="118" class="bp-faint"/>';
      s += '<path d="M' + (x + 8) + " 236l14 -22l10 12l8 -8l12 18" + '" class="bp-faint"/>';
    });
    s += text(150, 134, S("m2_step1", "① 名画长廊：平地无轨穿行"), "bp-label", "middle");
    s += '<path d="M412 70C690 74 806 252 566 394" class="bp-screen"/>';
    s += '<path d="M432 88C670 92 778 252 562 378" class="bp-dash"/>';
    s += text(806, 92, S("m2_step2", "② 倾斜球幕：向下延伸，遮住地面"), "bp-label", "end");
    [0, 1, 2].forEach((i) => {
      const y = 318 + i * 14;
      s += '<path d="M' + (500 + i * 6) + " " + y + "q10 -5 20 0t20 0" + '" class="bp-faint"/>';
    });
    s += text(560, 362, S("m2_wind", "迎面风与水雾"), "bp-label");

    const vx = lerp(76, 428, p.t / 100);
    const near = clamp((p.t - 72) / 28, 0, 1);
    const pitch = p.a * near;
    if (near > 0.02) {
      const eye = rot(14, -54, pitch);
      const ex = vx + eye[0];
      const ey = 274 + eye[1];
      const r1 = rot(360, 0, -22 + pitch);
      const r2 = rot(360, 0, 40 + pitch);
      s += '<path d="M' + f(ex) + " " + f(ey) + "L" + f(ex + r1[0]) + " " + f(ey + r1[1]) + "L" + f(ex + r2[0]) + " " + f(ey + r2[1]) + 'Z" class="bp-beam" opacity="' + f(near) + '"/>';
    }
    s += '<rect x="' + f(vx - 40) + '" y="280" width="80" height="18" rx="2" class="bp-body"/>';
    s += '<circle cx="' + f(vx - 26) + '" cy="299" r="3.6" class="bp-joint"/><circle cx="' + f(vx + 26) + '" cy="299" r="3.6" class="bp-joint"/>';
    s += '<g transform="translate(' + f(vx) + " 278) rotate(" + f(pitch) + ')">';
    s += '<path d="M-22 2L-18 -14M22 2L18 -14" class="bp-move"/>';
    s += '<rect x="-42" y="-42" width="84" height="28" rx="5" class="bp-move-body"/>';
    s += rider(-18, -50) + rider(12, -50);
    s += "</g>";
    s += callout(vx - 34, 292, vx - 70, 336, S("m2_lower_callout", "下层：无轨底盘"), "end");
    s += callout(vx + 30, 256, vx + 30, 214, S("m2_upper_callout", "上层：动感平台（前倾 · 侧倾）"));

    s += '<rect x="34" y="330" width="128" height="54" class="bp-faint"/>';
    s += text(40, 326, S("m2_roll_inset", "后视 · 侧倾"), "bp-label");
    s += '<path d="M60 374H136" class="bp-ink"/>';
    s += '<g transform="translate(98 368) rotate(' + f(p.b) + ')"><rect x="-26" y="-6" width="52" height="6" class="bp-body"/><rect x="-22" y="-24" width="44" height="16" rx="3" class="bp-move-body"/>' + rider(-8, -29, 0.8) + rider(8, -29, 0.8) + "</g>";
    return s + close();
  }

  // 3. boats
  function boats(p) {
    let s = open();
    s += title(24, "5.1.3.1", S("m3_l_name", "水下导轨 + 直线电机"), S("m3_l_sub", "上海迪士尼《加勒比海盗：沉落宝藏之战》"));
    s += title(444, "5.1.3.2", S("m3_r_name", "铰接摇摆船（Rocking Boat）"), S("m3_r_sub", "Futuroscope《百慕大任务》· Mack Rides"));
    s += divider();

    s += water(24, 396, 204, 1.4, 0);
    s += water(24, 396, 232, 1, 1.4).replace("bp-water", "bp-faint");
    s += '<rect x="24" y="346" width="372" height="12" fill="url(#bp-hatch)"/><path d="M24 346H396" class="bp-ink"/>';
    s += '<rect x="24" y="332" width="372" height="8" class="bp-body"/>';
    const cx = lerp(110, 290, p.t / 100);
    s += '<rect x="' + f(cx - 36) + '" y="312" width="72" height="18" rx="2" class="bp-move-body"/>';
    s += '<rect x="' + f(cx - 4) + '" y="214" width="8" height="98" class="bp-body"/>';
    s += '<ellipse cx="' + f(cx) + '" cy="214" rx="12" ry="4" class="bp-move-body"/>';
    const k = Math.max(0.32, Math.abs(Math.cos(p.y * D)));
    s += '<g transform="translate(' + f(cx) + ' 204) scale(' + f(k) + ' 1)">';
    s += poly([[-92, -10], [92, -10], [72, 16], [-72, 16]], "bp-move-body");
    s += '<path d="M0 -10V-104" class="bp-move"/><path d="M4 -98L52 -40H4" class="bp-move"/>';
    s += "</g>";
    s += callout(cx + 34, 322, Math.min(cx + 72, 360), 300, S("m3_lsm_callout", "直线电机台车"));
    s += callout(cx + 4, 262, Math.min(cx + 70, 356), 262, S("m3_strut_callout", "转向立柱"));
    s += text(30, 326, S("m3_sub_rail", "水下导轨"), "bp-label");
    s += '<ellipse cx="360" cy="112" rx="28" ry="28" class="bp-faint"/>';
    s += '<g transform="translate(360 112) rotate(' + f(p.y) + ')"><ellipse rx="8" ry="20" class="bp-move-body"/><path d="M0 -20V-26" class="bp-move"/></g>';
    s += text(360, 156, S("m3_spin_inset", "俯视 · 原地转向"), "bp-label", "middle");
    s += text(24, 388, S("m3_l_foot", "船浮在水面，动作由水下导轨精确控制"), "bp-label");

    // Right
    const phase = (p.t / 100) * Math.PI * 4;
    s += water(444, 816, 206, 5, phase);
    s += water(444, 816, 234, 1, phase * 0.5).replace("bp-water", "bp-faint");
    s += '<rect x="444" y="346" width="372" height="12" fill="url(#bp-hatch)"/><path d="M444 346H816" class="bp-ink"/>';
    s += '<rect x="444" y="332" width="372" height="8" class="bp-body"/>';
    const gx = lerp(530, 710, p.t / 100);
    s += '<rect x="' + f(gx - 34) + '" y="312" width="68" height="18" rx="2" class="bp-body"/>';
    s += '<path d="M' + f(gx) + " 312L" + f(gx) + ' 232" class="bp-ink" stroke-width="3"/>';
    s += '<g transform="translate(' + f(gx) + " 228) rotate(" + f(p.a) + ')">';
    s += poly([[-82, -36], [82, -36], [66, -8], [-66, -8]], "bp-move-body");
    s += rider(-36, -44) + rider(-8, -44) + rider(20, -44);
    s += "</g>";
    s += '<circle cx="' + f(gx) + '" cy="228" r="6" class="bp-joint"/>';
    s += callout(gx + 30, 322, Math.min(gx + 74, 780), 300, S("m3_bogie_callout", "水下导引车"));
    s += callout(gx + 6, 230, Math.min(gx + 74, 780), 262, S("m3_hinge_callout", "铰接点"));
    s += '<rect x="738" y="80" width="80" height="58" class="bp-faint"/>';
    s += text(744, 76, S("m3_roll_inset", "后视 · 横摇"), "bp-label");
    s += water(746, 810, 120, 1.5, phase);
    s += '<g transform="translate(778 118) rotate(' + f(p.b) + ')"><path d="M-22 -10H22L16 4H-16Z" class="bp-move-body"/>' + rider(-6, -15, 0.7) + rider(8, -15, 0.7) + "</g>";
    s += text(444, 388, S("m3_r_foot", "水道无侧墙，船体随水面与浪摇摆，也能倒退"), "bp-label");
    return s + close();
  }

  // 4. stageVsSphere
  function stageVsSphere(p) {
    let s = open();
    s += title(24, "T3.1", S("m4_l_name", "倾斜、升降的多级旋转舞台"), S("m4_l_sub", "Efteling《骷髅之舞》"));
    s += title(444, "T2.5", S("m4_r_name", "球形屏幕中的悬挂座椅环"), S("m4_r_sub", "阿布扎比海洋世界《超球体 360°》"));
    s += divider();

    s += ground(24, 396, 352);
    s += '<rect x="168" y="324" width="84" height="28" rx="2" class="bp-body"/>';
    const lift = (p.t / 100) * 44;
    const dcy = 250 - lift;
    s += '<rect x="200" y="' + f(dcy) + '" width="20" height="' + f(324 - dcy) + '" class="bp-body"/>';
    s += '<g transform="translate(210 ' + f(dcy) + ") rotate(" + f(p.a) + ')">';
    s += '<ellipse rx="156" ry="36" class="bp-move-body"/><ellipse rx="146" ry="31" class="bp-dash"/>';
    const subs = [0, 120, 240].map((k) => {
      const th = (p.y + k) * D;
      return { x: 96 * Math.cos(th), y: 20 * Math.sin(th), th: th, depth: Math.sin(th) };
    }).sort((u, v) => u.depth - v.depth);
    subs.forEach((d) => {
      s += '<ellipse cx="' + f(d.x) + '" cy="' + f(d.y - 4) + '" rx="30" ry="8" class="bp-body"/>';
      const t2 = 2.4 * d.th;
      s += '<path d="M' + f(d.x) + " " + f(d.y - 4) + "L" + f(d.x + Math.cos(t2) * 26) + " " + f(d.y - 4 + Math.sin(t2) * 7) + '" class="bp-move"/>';
      [-14, 0, 14].forEach((o) => { s += '<path d="M' + f(d.x + o) + " " + f(d.y - 10) + "v-8" + '" class="bp-ink"/>'; });
    });
    s += "</g>";
    s += callout(352, dcy, 370, dcy - 60, S("m4_main_disc", "主转盘：旋转 · 倾斜 · 升降"), "end");
    s += callout(220, 300, 300, 304, S("m4_hyd_col", "中央液压柱"));
    s += text(24, 388, S("m4_l_foot", "上方的小转盘各自旋转，整片观众席在实景里“跳舞”"), "bp-label");

    // Right
    const sx = 630;
    const sy = 210;
    s += '<circle cx="' + sx + '" cy="' + sy + '" r="150" class="bp-ink"/>';
    s += '<ellipse cx="' + sx + '" cy="' + sy + '" rx="150" ry="40" class="bp-dash"/>';
    s += '<ellipse cx="' + sx + '" cy="' + (sy - 78) + '" rx="128" ry="32" class="bp-dash"/>';
    s += '<ellipse cx="' + sx + '" cy="' + (sy + 78) + '" rx="128" ry="32" class="bp-dash"/>';
    s += '<ellipse cx="' + sx + '" cy="' + sy + '" rx="54" ry="150" class="bp-dash"/>';
    s += '<path d="M' + sx + " 60V" + (sy - 14) + '" class="bp-ink" stroke-width="3"/>';
    s += '<g transform="translate(' + sx + " " + sy + ") rotate(" + f(p.a) + ')">';
    s += '<ellipse rx="72" ry="17" class="bp-move-body"/>';
    for (let k = 0; k < 8; k++) {
      const th = (p.y + k * 45) * D;
      const front = Math.sin(th) > 0;
      s += '<circle cx="' + f(72 * Math.cos(th)) + '" cy="' + f(17 * Math.sin(th) - 6) + '" r="4.2" class="' + (front ? "bp-dot-accent" : "bp-dot") + '"/>';
    }
    s += "</g>";
    const bridge = lerp(560, 452, p.t / 100);
    s += '<rect x="444" y="244" width="' + f(bridge - 444) + '" height="7" class="bp-body"/>';
    s += text(450, 238, S("m4_bridge", "伸缩桥"), "bp-label");
    s += callout(sx + 44, sy + 140, 790, 372, S("m4_floor_screen", "脚下也是屏幕"), "end");
    s += callout(sx + 70, sy + 4, 806, 186, S("m4_ring_callout", "座椅环：旋转 · 倾斜"), "end");
    s += text(444, 388, S("m4_r_foot", "Intamin Dome Ride Theater"), "bp-label");
    return s + close();
  }

  // 5. flyingTheaters
  function flyingTheaters(p) {
    let s = open();
    const k = ease(clamp(p.t / 100, 0, 1));
    const cols = [
      { code: "T1.1", name: S("m5_c1_name", "悬臂提升"), sub: S("m5_c1_sub", "迪士尼《翱翔》") },
      { code: "T1.2", name: S("m5_c2_name", "多层前推"), sub: S("m5_c2_sub", "方特《伴你飞翔》等") },
      { code: "T1.3", name: S("m5_c3_name", "钢架提升"), sub: S("m5_c3_sub", "方特《飞越极限》") },
      { code: "T1.4", name: S("m5_c4_name", "平台翻转"), sub: S("m5_c4_sub", "Futuroscope《非凡之旅》") }
    ];
    cols.forEach((c, i) => {
      const ox = i * 210;
      if (i > 0) s += '<path d="M' + ox + ' 24V376" class="bp-faint"/>';
      s += title(ox + 18, c.code, c.name, c.sub);
      s += '<path d="M' + (ox + 150) + " 84Q" + (ox + 206) + " 214 " + (ox + 150) + ' 344" class="bp-screen"/>';
      s += ground(ox + 12, ox + 198, 350);
    });

    const seat = (x, y) => '<rect x="' + f(x - 13) + '" y="' + f(y - 9) + '" width="26" height="10" rx="2" class="bp-move-body"/>' + rider(x - 4, y - 14, 0.75) + rider(x + 6, y - 14, 0.75);

    // T1.1
    const starts = [[40, 342], [72, 342], [104, 342]];
    const ends = [[118, 142], [104, 206], [90, 270]];
    starts.forEach((st, i) => {
      const x = lerp(st[0], ends[i][0], k);
      const y = lerp(st[1], ends[i][1], k);
      s += '<path d="M24 350L' + f(x - 12) + " " + f(y) + '" class="bp-move"/>';
      s += seat(x, y);
    });
    s += text(18, 374, S("m5_c1_foot", "平地入座 → 悬臂举起"), "bp-label");

    // T1.2
    [150, 222, 294].forEach((y) => {
      s += '<path d="M222 ' + y + "H300" + '" class="bp-ink"/>';
      const x = 274 + k * 44;
      s += '<path d="M290 ' + (y - 4) + "L" + f(x - 12) + " " + (y - 4) + '" class="bp-move"/>';
      s += seat(x, y - 4);
    });
    s += text(228, 374, S("m5_c2_foot", "分层入座 → 向前推出"), "bp-label");

    // T1.3
    const cx = 452 + k * 40;
    const cb = 344 - k * 108;
    s += '<path d="M496 64V' + f(cb - 168) + '" class="bp-dash"/><path d="M' + f(cx + 26) + " " + f(cb - 168) + "L496 64" + '" class="bp-dash"/>';
    s += '<rect x="' + f(cx) + '" y="' + f(cb - 168) + '" width="56" height="168" class="bp-ink"/>';
    [42, 98, 154].forEach((d) => {
      s += '<path d="M' + f(cx) + " " + f(cb - 168 + d + 6) + "H" + f(cx + 56) + '" class="bp-faint"/>';
      s += seat(cx + 34, cb - 168 + d);
    });
    s += text(438, 374, S("m5_c3_foot", "整座钢架 → 垂直提升"), "bp-label");

    // T1.4
    const px = 760;
    const py = 342;
    s += '<g transform="translate(' + px + " " + py + ") rotate(" + f(k * 90) + ')">';
    s += '<rect x="-112" y="-4" width="112" height="6" class="bp-body"/>';
    [-92, -60, -28].forEach((x) => { s += seat(x, -6); });
    s += "</g>";
    s += '<circle cx="' + px + '" cy="' + py + '" r="5" class="bp-joint"/>';
    s += text(648, 374, S("m5_c4_foot", "平地入座 → 平台翻转 90°"), "bp-label");
    return s + close();
  }

  // 6. submarinesComparison
  function submarinesComparison(p) {
    let s = open();
    s += title(24, "5.2", "半潜式真水下潜艇", "迪士尼《海底总动员》/ 长隆《深海潜艇》");
    s += title(444, "3.1", "干式双层舷窗伪潜艇", "东京迪士尼海洋《海底两万里》");
    s += divider();

    // Left: True Submarine
    s += water(24, 396, 170, 3, (p.t / 20));
    s += ground(24, 396, 350);
    s += '<rect x="24" y="336" width="372" height="8" class="bp-body"/>';
    const subX = lerp(80, 240, p.t / 100);
    // Submarine hull: conning tower above waterline, cabin underwater
    s += '<g transform="translate(' + f(subX) + ' 190)">';
    s += '<ellipse cx="70" cy="50" rx="90" ry="42" class="bp-move-body"/>';
    s += '<rect x="40" y="-30" width="36" height="50" rx="3" class="bp-body"/>';
    s += '<rect x="48" y="-48" width="8" height="20" class="bp-ink"/>';
    for (let i = 0; i < 4; i++) {
      s += '<circle cx="' + (24 + i * 32) + '" cy="50" r="10" class="bp-joint"/>';
      s += rider(24 + i * 32, 50, 0.7);
    }
    // Bubbles
    const bOff = (p.t * 3) % 40;
    s += '<circle cx="-10" cy="' + (60 - bOff) + '" r="3" class="bp-water"/>';
    s += '<circle cx="-6" cy="' + (40 - (bOff * 1.2) % 40) + '" r="4" class="bp-water"/>';
    s += '</g>';
    s += callout(subX + 58, 148, subX + 110, 114, "指挥塔露出水面换气");
    s += callout(subX + 90, 240, subX + 110, 290, "客舱完全沉在真实水下");
    s += callout(subX + 70, 336, 120, 370, "水下刚性导轨牵引");
    s += text(24, 388, "真入水 · 舱外为真实水体与水下机械鱼 · 维护要求极高", "bp-label");

    // Right: Dry Fake Submarine with Water Sandwich Porthole
    s += ceiling(444, 816, 78);
    s += '<rect x="444" y="80" width="372" height="7" class="bp-body"/>';
    const cabX = lerp(510, 670, p.t / 100);
    s += '<rect x="' + f(cabX - 28) + '" y="90" width="56" height="12" class="bp-body"/>';
    s += '<path d="M' + f(cabX) + ' 102V170" class="bp-move" stroke-width="4"/>';
    s += '<g transform="translate(' + f(cabX) + ' 170)">';
    s += '<ellipse cx="0" cy="54" rx="84" ry="46" class="bp-move-body"/>';
    s += '<circle cx="-30" cy="54" r="18" class="bp-screen"/>';
    s += '<circle cx="-30" cy="54" r="15" class="bp-water"/>';
    s += rider(-30, 54, 0.8);
    s += '<circle cx="30" cy="54" r="18" class="bp-screen"/>';
    s += '<circle cx="30" cy="54" r="15" class="bp-water"/>';
    s += rider(30, 54, 0.8);
    s += '</g>';
    s += ground(444, 816, 350);
    // Animatronic monster in dry air
    s += '<path d="M740 240q30 -20 20 40t-20 40" class="bp-ink" stroke-width="3"/>';
    s += text(746, 220, "干式深海怪物布景", "bp-label");
    s += callout(cabX - 30, 224, cabX - 90, 260, "双层舷窗夹薄水层+充气泡", "end");
    s += callout(cabX, 86, cabX + 50, 110, "天花板悬挂吊轨");
    s += text(444, 388, "滴水不沾 · 吊在空气中穿行 · 窗内夹水气泡骗过视觉", "bp-label");
    return s + close();
  }

  // 7. verticalDropsComparison
  function verticalDropsComparison(p) {
    let s = open();
    s += title(24, "4.1 / 4.2", "垂直电梯井道跳楼机", "《惊魂古塔》《银河护卫队：使命突围》");
    s += title(444, "2.3", "无轨车驶入升降跳楼井道", "《星球大战：抵抗组织崛起》");
    s += divider();

    // Left: VTRS / Tower of Terror
    s += shaft(120, 240, 70, 350);
    const dropY = lerp(110, 280, p.t / 100);
    s += '<path d="M180 70V' + f(dropY) + '" class="bp-ink" stroke-width="3"/>';
    s += '<rect x="130" y="' + f(dropY) + '" width="100" height="66" rx="2" class="bp-move-body"/>';
    for (let i = 0; i < 3; i++) s += rider(150 + i * 30, dropY + 40);
    s += '<circle cx="180" cy="74" r="10" class="bp-joint"/>';
    s += callout(180, 74, 50, 80, "大功率双向卷扬马达", "end");
    s += callout(230, dropY + 20, 280, dropY, "超重力加速度主动向下拉拽");
    s += ground(24, 396, 350);
    s += text(24, 388, "全程在多层垂直井道高速上下弹射 · 产生强烈失重", "bp-label");

    // Right: ROTR Trackless into Drop Bay
    s += ground(444, 600, 310);
    s += ground(740, 816, 310);
    s += shaft(600, 740, 70, 350);
    const liftY = lerp(130, 290, p.t / 100);
    s += '<rect x="608" y="' + f(liftY) + '" width="124" height="60" class="bp-dash"/>';
    s += '<rect x="626" y="' + f(liftY + 16) + '" width="88" height="34" rx="2" class="bp-move-body"/>';
    s += rider(646, liftY + 30) + rider(694, liftY + 30);
    s += callout(626, liftY + 34, 520, 240, "无轨 AGV 整车开入锁死", "end");
    s += callout(732, liftY + 20, 760, 180, "升降井道做 7 米自由落体");
    s += ground(444, 816, 350);
    s += text(444, 388, "平地无轨自由穿行 → 整车驶入井道跳楼 → 到底开出", "bp-label");
    return s + close();
  }

  // 8. illusionsAndSpins
  function illusionsAndSpins(p) {
    let s = open();
    s += title(24, "T5.1", "疯屋 Madhouse 双轴视错觉", "屋转人不转 ·《Villa Volta》《古塔魔咒》");
    s += title(444, "T2.7", "室内真 360° 翻滚机械臂", "真倒立悬停 ·《Talocan》《古墓丽影》");
    s += divider();

    // Left: Madhouse
    const cx = 210, cy = 210;
    const roomA = p.a * 3.6; // 360 rotation
    const swingA = p.b * 0.7; // +- 20 swing
    s += '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + f(roomA) + ')">';
    s += '<polygon points="-120,-60 -60,-120 60,-120 120,-60 120,60 60,120 -60,120 -120,60" class="bp-screen"/>';
    s += '<rect x="-10" y="-115" width="20" height="20" class="bp-ink"/>';
    s += '<path d="M-80 -40V40M80 -40V40" class="bp-faint"/>';
    s += text(0, -80, "吊灯与天花板布景", "bp-label", "middle");
    s += '</g>';
    // Inner gondola
    s += '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + f(swingA) + ')">';
    s += '<rect x="-60" y="-8" width="120" height="16" rx="2" class="bp-move-body"/>';
    s += rider(-36, -18) + rider(0, -18) + rider(36, -18);
    s += '<circle cx="0" cy="0" r="6" class="bp-joint"/>';
    s += '</g>';
    s += callout(cx + 80, cy - 80, 340, 110, "外层房间滚筒 360° 旋转");
    s += callout(cx, cy, 70, 310, "内层座椅仅轻微秋千摆动 (±15°)");
    s += text(24, 388, "剥夺外部参照系 · 误以为自己头朝下倒挂在天花板", "bp-label");

    // Right: Top Spin
    const rx = 630, ry = 220;
    const armA = p.a * 2.5;
    const seatA = p.b * 3;
    s += ground(444, 816, 350);
    s += '<polygon points="590,340 600,160 616,160 626,340" class="bp-body"/>';
    s += '<circle cx="608" cy="160" r="10" class="bp-joint"/>';
    s += '<g transform="translate(608 160) rotate(' + f(armA) + ')">';
    s += '<rect x="-8" y="-10" width="16" height="96" rx="4" class="bp-move-body"/>';
    s += '<circle cx="0" cy="86" r="6" class="bp-joint"/>';
    s += '<g transform="translate(0 86) rotate(' + f(seatA) + ')">';
    s += '<rect x="-44" y="-8" width="88" height="16" rx="3" class="bp-move-body"/>';
    s += rider(-26, -18) + rider(0, -18) + rider(26, -18);
    s += '</g></g>';
    s += callout(608, 160, 520, 120, "主摇臂大扭矩驱动", "end");
    s += callout(rx + 60, ry, 740, 190, "真 360° 倒立翻滚与悬停");
    s += text(444, 388, "真重力倒挂 · 必须配备重型液压过肩压杠", "bp-label");
    return s + close();
  }

  // 9. tracklessVsSlotGuided
  function tracklessVsSlotGuided(p) {
    let s = open();
    s += title(24, "2.1 / 2.2.1", "真无轨自由寻迹 AGV", "《迷离大宅》《美女与野兽》《Symbolica》");
    s += title(444, "1.1.1.1", "隐藏导槽与自驾导轨", "Liseberg《Underlandet》/ Movieland《Pangea》");
    s += divider();

    // Left: AGV
    s += ground(24, 396, 330);
    // Floor pucks/RFID
    for (let x = 60; x < 380; x += 44) s += '<circle cx="' + x + '" cy="330" r="3" class="bp-dot"/>';
    const agvX = lerp(80, 260, p.t / 100);
    s += '<g transform="translate(' + f(agvX) + ' 274)">';
    s += '<rect x="-44" y="0" width="88" height="40" rx="4" class="bp-move-body"/>';
    s += '<circle cx="-28" cy="46" r="8" class="bp-joint"/><circle cx="28" cy="46" r="8" class="bp-joint"/>';
    s += rider(-20, -10) + rider(20, -10);
    s += '</g>';
    s += callout(agvX + 44, 290, agvX + 80, 230, "全向差速轮自转与横移");
    s += callout(192, 330, 200, 366, "地面埋设无源磁钉/RFID标签");
    s += text(24, 388, "零物理槽缝 · 多车自由交叉穿插与路径随机分支", "bp-label");

    // Right: Hidden Slot & Driver Steer
    s += ground(444, 816, 330);
    // Slot cut into floor
    s += '<path d="M444 330H610M626 330H816" class="bp-ink" stroke-width="3"/>';
    s += '<rect x="612" y="330" width="12" height="30" class="bp-body"/>';
    const carX = lerp(510, 710, p.t / 100);
    s += '<g transform="translate(' + f(carX) + ' 274)">';
    s += '<rect x="-48" y="0" width="96" height="40" rx="4" class="bp-move-body"/>';
    s += '<circle cx="-32" cy="46" r="8" class="bp-joint"/><circle cx="32" cy="46" r="8" class="bp-joint"/>';
    s += '<path d="M0 40V70" class="bp-move" stroke-width="4"/>';
    s += rider(-22, -10) + rider(18, -10);
    s += '<circle cx="28" cy="-2" r="5" class="bp-ink"/>'; // steering wheel
    s += '</g>';
    s += callout(carX, 334, carX + 60, 360, "隐蔽地板窄槽导向销");
    s += callout(carX + 28, 268, carX + 60, 220, "真方向盘交互/自转偏航");
    s += text(444, 388, "物理轨道藏在地板极窄缝隙下 · 表面看似无轨", "bp-label");
    return s + close();
  }

  // 10. waterPropulsion5Ways
  function waterPropulsion5Ways(p) {
    let s = open();
    s += title(24, "5.1", "涉水暗黑乘骑五大水下驱动架构", "漂流泵推 · 钢缆牵引 · 转盘倒退 · 剪刀叉 · 直线电机");
    const k = p.t / 100;
    const cols = [
      { t: "1. 自由漂流 (5.1.1.1)", sub: "水泵推流 + 导向轮防撞" },
      { t: "2. 钢缆牵引 (5.1.2.1)", sub: "水底闭合闭环定速" },
      { t: "3. 转盘倒退 (5.1.1.3)", sub: "道岔调头 + 倒退俯冲" },
      { t: "4. 直线电机 (5.1.3.1)", sub: "360° 全向自转/平移" }
    ];
    cols.forEach((c, i) => {
      const ox = i * 205 + 10;
      if (i > 0) s += divider(ox);
      s += text(ox + 8, 70, c.t, "bp-tag");
      s += text(ox + 8, 86, c.sub, "bp-label");
      s += water(ox + 4, ox + 196, 230, 2, k * 6);
      s += ground(ox + 4, ox + 196, 340);
    });

    // Col 1: Pump flow
    const b1 = lerp(30, 130, k);
    s += '<rect x="' + f(b1) + '" y="206" width="56" height="24" rx="3" class="bp-move-body"/>' + rider(b1 + 18, 200) + rider(b1 + 38, 200);
    s += '<path d="M20 250q20 -10 40 0t40 0" class="bp-water"/>';

    // Col 2: Tow Cable
    const b2 = lerp(235, 335, k);
    s += '<rect x="' + f(b2) + '" y="206" width="56" height="24" rx="3" class="bp-move-body"/>' + rider(b2 + 18, 200) + rider(b2 + 38, 200);
    s += '<path d="M215 310H410" class="bp-dash"/><circle cx="' + f(b2 + 28) + '" cy="310" r="4" class="bp-joint"/>';
    s += '<path d="M' + f(b2 + 28) + ' 230V310" class="bp-ink"/>';

    // Col 3: Turntable
    const b3 = 525;
    const spin = p.a * 3;
    s += '<circle cx="525" cy="280" r="30" class="bp-body"/>';
    s += '<g transform="translate(' + b3 + ' 218) rotate(' + f(spin) + ')"><rect x="-28" y="-12" width="56" height="24" rx="3" class="bp-move-body"/>' + rider(-10, -18) + rider(10, -18) + '</g>';

    // Col 4: LSM Submerged
    const b4 = lerp(645, 745, k);
    s += '<rect x="625" y="324" width="180" height="8" class="bp-body"/>';
    s += '<rect x="' + f(b4) + '" y="316" width="46" height="12" class="bp-move-body"/>';
    s += '<path d="M' + f(b4 + 23) + ' 230V316" class="bp-ink" stroke-width="4"/>';
    s += '<rect x="' + f(b4 - 6) + '" y="206" width="58" height="24" rx="3" class="bp-move-body"/>' + rider(b4 + 14, 200) + rider(b4 + 32, 200);

    s += text(24, 388, "从纯水力被动漂流，到水下闭合钢缆牵引，再到水下直线电机主动精密驱动", "bp-label");
    return s + close();
  }

  // 11. storyCoastersAndOmnimover
  function storyCoastersAndOmnimover(p) {
    let s = open();
    s += title(24, "1.1.1.2", "Omnimover 连续全向车链", "《幽灵公馆》《小美人鱼》· 永不停车");
    s += title(444, "1.1.4.2", "受控旋转/变轨叙事过山车", "《银河护卫队：宇宙倒带》《逃离古灵阁》");
    s += divider();

    // Left: Omnimover
    s += ground(24, 396, 330);
    s += '<path d="M24 322H396" class="bp-ink"/>';
    const chainK = (p.t / 100);
    for (let i = 0; i < 4; i++) {
      const cx = 50 + i * 90 + chainK * 90;
      if (cx > 380) continue;
      const yaw = p.a * 1.5;
      s += '<circle cx="' + f(cx) + '" cy="322" r="4" class="bp-joint"/>';
      s += '<g transform="translate(' + f(cx) + ' 276) rotate(' + f(yaw) + ')">';
      s += '<path d="M-26 14C-30 -20 30 -20 26 14Z" class="bp-move-body"/>';
      s += rider(0, -2);
      s += '</g>';
      if (i < 3) s += '<path d="M' + f(cx) + ' 322H' + f(cx + 90) + '" class="bp-dash"/>';
    }
    s += callout(140, 322, 110, 360, "首尾相连连续闭合车链");
    s += callout(230, 276, 270, 230, "车载凸轮/伺服强制偏航镜头");
    s += text(24, 388, "大吞吐量 (2400人/h) · 强制视线分镜 · 无间断上客", "bp-label");

    // Right: Storytelling Coaster
    s += '<path d="M444 320Q580 320 640 220T816 160" class="bp-ink" stroke-width="3"/>';
    const coastK = p.t / 100;
    const cX = lerp(480, 760, coastK);
    const cY = lerp(316, 170, coastK);
    const cYaw = p.a * 2;
    s += '<g transform="translate(' + f(cX) + ' ' + f(cY) + ')">';
    s += '<rect x="-34" y="0" width="68" height="18" rx="3" class="bp-body"/>';
    s += '<circle cx="-20" cy="18" r="6" class="bp-joint"/><circle cx="20" cy="18" r="6" class="bp-joint"/>';
    s += '<g transform="translate(0 -16) rotate(' + f(cYaw) + ')">';
    s += '<rect x="-26" y="-12" width="52" height="24" rx="3" class="bp-move-body"/>';
    s += rider(-10, -6) + rider(10, -6);
    s += '</g></g>';
    s += '<rect x="680" y="60" width="120" height="70" class="bp-screen"/>';
    s += text(740, 96, "3D 视效场景", "bp-label", "middle");
    s += callout(cX, cY - 16, cX - 60, cY - 50, "车载高速伺服电机瞄准分镜", "end");
    s += text(444, 388, "兼具过山车高速刺激与暗黑乘骑精准长镜头叙事", "bp-label");
    return s + close();
  }

  /* =================================================================
     PART 2: ALL 55 LEAF MECHANISM SCHEMATICS
     ================================================================= */
  function genericMechBlueprint(n, p) {
    let s = open();
    s += title(24, n.code, n.title, n.support);
    const isOverhead = n.code.startsWith("3.") || n.code === "T1.1" || n.code === "T2.5";
    const isWater = n.code.startsWith("5.");
    const isShaft = n.code.startsWith("4.");
    const isTheater = n.code.startsWith("T");

    if (isWater) {
      s += water(24, 560, 240, 2, (p.t / 20));
      s += ground(24, 560, 340);
    } else if (isOverhead) {
      s += ceiling(24, 560, 80);
      s += ground(24, 560, 340);
    } else if (isShaft) {
      s += shaft(160, 420, 70, 340);
      s += ground(24, 560, 340);
    } else {
      s += ground(24, 560, 330);
      s += '<path d="M24 320H560" class="bp-ink"/>';
    }

    // Inset divider
    s += divider(580);
    s += text(600, 42, "工程参数与运动拓扑", "bp-tag");
    s += text(600, 72, "支撑方式：" + (n.support || "—"), "bp-label");
    s += text(600, 94, "自由度：" + (n.dof || "—"), "bp-label");
    s += text(600, 116, "主要厂商：" + (n.mfg || "—"), "bp-label");
    s += '<rect x="600" y="140" width="216" height="210" class="bp-faint"/>';
    s += text(608, 160, "俯视 / 横截面透视", "bp-label");

    // Dynamic movement
    const t = p.t != null ? p.t : 50;
    const a = p.a != null ? p.a : 0;
    const b = p.b != null ? p.b : 0;
    const pos = lerp(80, 440, t / 100);

    if (isOverhead) {
      s += '<rect x="' + f(pos - 30) + '" y="88" width="60" height="14" class="bp-body"/>';
      s += '<path d="M' + f(pos) + ' 102V180" class="bp-move" stroke-width="4"/>';
      s += '<g transform="translate(' + f(pos) + ' 180) rotate(' + f(a) + ')">';
      s += '<rect x="-44" y="0" width="88" height="44" rx="4" class="bp-move-body"/>';
      s += rider(-20, 20) + rider(20, 20);
      s += '</g>';
      s += callout(pos, 92, pos + 50, 120, "顶部悬挂导向轮架");
      s += callout(pos + 30, 200, pos + 70, 240, "悬臂/连杆 (" + f(a) + "°)");
    } else if (isWater) {
      s += '<g transform="translate(' + f(pos) + ' 220) rotate(' + f(a * 0.5) + ')">';
      s += poly([[-60, -10], [60, -10], [45, 20], [-45, 20]], "bp-move-body");
      s += rider(-20, 0) + rider(20, 0);
      s += '</g>';
      s += callout(pos, 220, pos + 50, 180, "水面浮体 / 舱体");
      s += callout(pos, 336, pos + 50, 360, "水下导引/牵引基座");
    } else if (isShaft) {
      const drop = lerp(100, 260, t / 100);
      s += '<rect x="220" y="' + f(drop) + '" width="140" height="70" rx="3" class="bp-move-body"/>';
      s += rider(260, drop + 36) + rider(320, drop + 36);
      s += '<path d="M290 70V' + f(drop) + '" class="bp-ink" stroke-width="3"/>';
      s += callout(290, 74, 100, 100, "垂直卷扬/重力拉拽");
      s += callout(360, drop + 35, 450, drop + 35, "井道轿厢 (" + Math.round(t) + "%)");
    } else if (isTheater) {
      // Theater stage / seats
      s += '<g transform="translate(290 240) rotate(' + f(a) + ')">';
      s += '<rect x="-140" y="-12" width="280" height="24" rx="4" class="bp-move-body"/>';
      for (let i = -3; i <= 3; i++) s += rider(i * 36, -26);
      s += '</g>';
      s += '<path d="M290 252V330" class="bp-body" stroke-width="12"/>';
      s += '<path d="M120 100Q290 80 460 100" class="bp-screen"/>';
      s += callout(290, 290, 380, 310, "中央运动作动器");
      s += callout(420, 96, 460, 70, "剧场视效屏幕");
    } else {
      // Standard floor ride vehicle
      s += '<g transform="translate(' + f(pos) + ' 270)">';
      s += '<rect x="-44" y="24" width="88" height="20" class="bp-body"/>';
      s += '<circle cx="-28" cy="46" r="6" class="bp-joint"/><circle cx="28" cy="46" r="6" class="bp-joint"/>';
      s += '<g transform="translate(0 20) rotate(' + f(a) + ')">';
      s += '<rect x="-38" y="-36" width="76" height="34" rx="4" class="bp-move-body"/>';
      s += rider(-18, -20) + rider(18, -20);
      s += '</g></g>';
      s += callout(pos, 316, pos + 50, 350, "地面导轨与轮架");
      s += callout(pos, 260, pos + 50, 220, "车载动感机构 / 姿态 (" + f(a) + "°)");
    }

    // Right inset plan preview
    s += '<g transform="translate(708 245)">';
    s += '<circle cx="0" cy="0" r="50" class="bp-faint"/>';
    s += '<g transform="rotate(' + f(b || a) + ')">';
    s += '<ellipse cx="0" cy="0" rx="36" ry="18" class="bp-move-body"/>';
    s += '<path d="M0 0V-32M-5 -24L0 -32L5 -24" class="bp-move"/>';
    s += '</g></g>';
    s += text(708, 320, "旋转/偏航包络", "bp-label", "middle");

    return s + close();
  }

  // Pre-configured controls for mechanisms
  const MECH_CONTROLS = {
    // 1.1.1.1 - 1.1.1.4
    "1.1.1.1": [{ k: "t", label: "沿轨位置", min: 0, max: 100, unit: "%", v: 45 }, { k: "a", label: "转向角度", min: -45, max: 45, unit: "°", v: 10 }],
    "1.1.1.2": [{ k: "t", label: "车链行进", min: 0, max: 100, unit: "%", v: 30 }, { k: "a", label: "强制偏航(镜头)", min: -90, max: 90, unit: "°", v: 35 }],
    "1.1.1.3": [{ k: "t", label: "沿轨位置", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "气动甩尾角度", min: -30, max: 30, unit: "°", v: 18 }],
    "1.1.1.4": [{ k: "t", label: "过桥位置", min: 0, max: 100, unit: "%", v: 60 }, { k: "a", label: "跳台俯仰", min: -15, max: 15, unit: "°", v: 8 }],
    // 1.1.2.1 - 1.1.2.3
    "1.1.2.1": [{ k: "t", label: "沿轨行进", min: 0, max: 100, unit: "%", v: 45 }, { k: "a", label: "Stewart俯仰", min: -20, max: 20, unit: "°", v: 10 }, { k: "b", label: "座舱自转", min: -180, max: 180, unit: "°", v: 40 }],
    "1.1.2.2": [{ k: "t", label: "剪刀叉举升", min: 0, max: 100, unit: "%", v: 70 }, { k: "a", label: "座舱俯仰", min: -18, max: 18, unit: "°", v: 12 }],
    "1.1.2.3": [{ k: "t", label: "越野颠簸", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "液压俯仰", min: -15, max: 15, unit: "°", v: 8 }, { k: "b", label: "横滚", min: -15, max: 15, unit: "°", v: -6 }],
    // 1.1.3.1 - 1.1.3.2
    "1.1.3.1": [{ k: "t", label: "沿轨位置", min: 0, max: 100, unit: "%", v: 45 }, { k: "a", label: "大臂俯仰", min: -30, max: 30, unit: "°", v: 12 }, { k: "b", label: "小臂角度", min: -30, max: 30, unit: "°", v: -8 }],
    "1.1.3.2": [{ k: "t", label: "底盘滑行", min: 0, max: 100, unit: "%", v: 60 }, { k: "a", label: "悬臂甩出", min: -45, max: 45, unit: "°", v: 22 }],
    // 1.1.4.1 - 1.1.4.3, 1.2
    "1.1.4.1": [{ k: "t", label: "槽轨竞速进度", min: 0, max: 100, unit: "%", v: 75 }, { k: "a", label: "减速制动姿态", min: -10, max: 10, unit: "°", v: -4 }],
    "1.1.4.2": [{ k: "t", label: "滑行/变轨", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "受控偏航", min: -180, max: 180, unit: "°", v: 60 }],
    "1.1.4.3": [{ k: "t", label: "弹射冲刺", min: 0, max: 100, unit: "%", v: 80 }, { k: "a", label: "过山车俯仰", min: -30, max: 30, unit: "°", v: 15 }],
    "1.2": [{ k: "t", label: "步道行进", min: 0, max: 100, unit: "%", v: 40 }, { k: "a", label: "瞄准旋转", min: -60, max: 60, unit: "°", v: 25 }],
    // 2.1 - 2.3
    "2.1": [{ k: "t", label: "无轨行进", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "全向自转", min: -180, max: 180, unit: "°", v: 45 }],
    "2.2.1": [{ k: "t", label: "寻迹行进", min: 0, max: 100, unit: "%", v: 55 }, { k: "a", label: "底盘微幅倾斜", min: -10, max: 10, unit: "°", v: 5 }],
    "2.2.2": [{ k: "t", label: "行进/悬崖停靠", min: 0, max: 100, unit: "%", v: 90 }, { k: "a", label: "车身前倾", min: 0, max: 25, unit: "°", v: 16 }, { k: "b", label: "侧倾", min: -15, max: 15, unit: "°", v: 6 }],
    "2.3": [{ k: "t", label: "进电梯/垂直跌落", min: 0, max: 100, unit: "%", v: 65 }, { k: "a", label: "失重顿挫", min: -12, max: 12, unit: "°", v: -5 }],
    // 3.1 - 3.4
    "3.1": [{ k: "t", label: "悬挂滑行", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "偏航旋转", min: -90, max: 90, unit: "°", v: 20 }],
    "3.2": [{ k: "t", label: "轨道高差位置", min: 0, max: 100, unit: "%", v: 55 }, { k: "a", label: "双轨高差俯仰", min: -25, max: 25, unit: "°", v: 14 }],
    "3.3": [{ k: "t", label: "顶轨行进", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "抓举俯仰", min: -45, max: 45, unit: "°", v: 20 }, { k: "b", label: "回转角", min: -90, max: 90, unit: "°", v: 30 }],
    "3.4": [{ k: "t", label: "受控动力速度", min: 0, max: 100, unit: "%", v: 60 }, { k: "a", label: "过山车自转", min: -180, max: 180, unit: "°", v: 45 }],
    // 4.1 - 4.2
    "4.1": [{ k: "t", label: "井道垂直行程", min: 0, max: 100, unit: "%", v: 40 }, { k: "a", label: "超重/失重", min: -15, max: 15, unit: "°", v: 6 }],
    "4.2": [{ k: "t", label: "水平走廊→主井道", min: 0, max: 100, unit: "%", v: 75 }, { k: "a", label: "垂直坠落高度", min: 0, max: 100, unit: "%", v: 50 }],
    // 5.1.1.1 - 5.2
    "5.1.1.1": [{ k: "t", label: "水流漂移进度", min: 0, max: 100, unit: "%", v: 45 }, { k: "a", label: "水波摇晃", min: -8, max: 8, unit: "°", v: 3 }],
    "5.1.1.2": [{ k: "t", label: "湍流漂流位置", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "圆筏自转", min: 0, max: 360, unit: "°", v: 120 }],
    "5.1.1.3": [{ k: "t", label: "水下滑道位置", min: 0, max: 100, unit: "%", v: 60 }, { k: "a", label: "转盘倒退换轨", min: 0, max: 180, unit: "°", v: 180 }],
    "5.1.2.1": [{ k: "t", label: "水下闭合钢缆牵引", min: 0, max: 100, unit: "%", v: 40 }, { k: "a", label: "航向稳定", min: -5, max: 5, unit: "°", v: 0 }],
    "5.1.2.2": [{ k: "t", label: "水上过山车爬升/俯冲", min: 0, max: 100, unit: "%", v: 70 }, { k: "a", label: "轨道坡度", min: -40, max: 40, unit: "°", v: 25 }],
    "5.1.2.3": [{ k: "t", label: "水下剪刀叉举升", min: 0, max: 100, unit: "%", v: 65 }, { k: "a", label: "动感颠簸", min: -18, max: 18, unit: "°", v: 12 }],
    "5.1.3.1": [{ k: "t", label: "直线电机位置", min: 0, max: 100, unit: "%", v: 40 }, { k: "a", label: "水下360°旋转", min: -180, max: 180, unit: "°", v: 35 }],
    "5.1.3.2": [{ k: "t", label: "水下导引进度", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "万向铰接横摇", min: -25, max: 25, unit: "°", v: 14 }],
    "5.2": [{ k: "t", label: "真水下潜艇巡航", min: 0, max: 100, unit: "%", v: 45 }, { k: "a", label: "深水俯仰", min: -10, max: 10, unit: "°", v: 4 }],
    // Theaters T1.1 - T6.7
    "T1.1": [{ k: "t", label: "悬臂提拉入球", min: 0, max: 100, unit: "%", v: 70 }, { k: "a", label: "座椅俯仰", min: -15, max: 15, unit: "°", v: 5 }],
    "T1.2": [{ k: "t", label: "多层水平前推", min: 0, max: 100, unit: "%", v: 75 }, { k: "a", label: "飞行俯仰", min: -15, max: 15, unit: "°", v: 6 }],
    "T1.3": [{ k: "t", label: "钢架整体提升", min: 0, max: 100, unit: "%", v: 60 }, { k: "a", label: "俯仰摆动", min: -12, max: 12, unit: "°", v: 4 }],
    "T1.4": [{ k: "t", label: "平地翻转 90°", min: 0, max: 100, unit: "%", v: 80 }, { k: "a", label: "失重倾角", min: -10, max: 10, unit: "°", v: 3 }],
    "T2.1": [{ k: "t", label: "Stewart 平台升降", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "舱体俯仰", min: -20, max: 20, unit: "°", v: 10 }],
    "T2.2": [{ k: "t", label: "独立动感平台颠簸", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "平台俯仰", min: -15, max: 15, unit: "°", v: 7 }],
    "T2.3": [{ k: "t", label: "4D 座椅气动俯仰", min: -15, max: 15, unit: "°", v: 6 }, { k: "a", label: "特效震动", min: 0, max: 100, unit: "%", v: 40 }],
    "T2.4": [{ k: "t", label: "骑乘/滚环旋转", min: -180, max: 180, unit: "°", v: 45 }, { k: "a", label: "束缚俯仰", min: -30, max: 30, unit: "°", v: 15 }],
    "T2.5": [{ k: "t", label: "悬挂座椅环旋转", min: 0, max: 360, unit: "°", v: 60 }, { k: "a", label: "座椅环倾斜", min: -30, max: 30, unit: "°", v: 12 }],
    "T2.6": [{ k: "t", label: "圆环座椅倾斜", min: -20, max: 20, unit: "°", v: 10 }, { k: "a", label: "风暴环幕同步", min: 0, max: 100, unit: "%", v: 50 }],
    "T2.7": [{ k: "t", label: "主摇臂旋转", min: 0, max: 360, unit: "°", v: 140 }, { k: "a", label: "座舱真360°空翻", min: 0, max: 360, unit: "°", v: 180 }],
    "T3.1": [{ k: "t", label: "主转盘升降", min: 0, max: 100, unit: "%", v: 60 }, { k: "a", label: "主转盘倾斜", min: -18, max: 18, unit: "°", v: 10 }, { k: "b", label: "子转盘自转", min: 0, max: 360, unit: "°", v: 45 }],
    "T3.2": [{ k: "t", label: "看台车沿轨行驶", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "80人看台颠簸", min: -15, max: 15, unit: "°", v: 8 }],
    "T3.3": [{ k: "t", label: "圆形观众席自转", min: 0, max: 360, unit: "°", v: 90 }, { k: "a", label: "分幕对准度", min: 0, max: 100, unit: "%", v: 50 }],
    "T4.1": [{ k: "t", label: "动感桥液压抛起", min: 0, max: 100, unit: "%", v: 65 }, { k: "a", label: "360°环幕视效速度", min: 0, max: 100, unit: "%", v: 80 }],
    "T5.1": [{ k: "t", label: "外层房间滚筒旋转", min: 0, max: 360, unit: "°", v: 120 }, { k: "a", label: "内层座椅秋千摆动", min: -20, max: 20, unit: "°", v: 12 }],
    "T6.1": [{ k: "t", label: "45°全息半透膜反射率", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "幽灵幻象透明度", min: 0, max: 100, unit: "%", v: 75 }],
    "T6.2": [{ k: "t", label: "仿生人偶多轴关节动作", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "嘴部/眼球联动", min: -20, max: 20, unit: "°", v: 10 }],
    "T6.3": [{ k: "t", label: "特技机械崩塌触发", min: 0, max: 100, unit: "%", v: 70 }, { k: "a", label: "洪水/火柱同步", min: 0, max: 100, unit: "%", v: 60 }],
    "T6.4": [{ k: "t", label: "动捕面部表情跟踪", min: 0, max: 100, unit: "%", v: 65 }, { k: "a", label: "实时视线对准观众", min: -40, max: 40, unit: "°", v: 15 }],
    "T6.5": [{ k: "t", label: "多幕密室步行动线", min: 0, max: 100, unit: "%", v: 50 }, { k: "a", label: "地面震动与坍塌", min: 0, max: 100, unit: "%", v: 45 }],
    "T6.6": [{ k: "t", label: "灾难模拟船沉降倾斜", min: -25, max: 25, unit: "°", v: 15 }, { k: "a", label: "巨浪拍击幅度", min: 0, max: 100, unit: "%", v: 60 }],
    "T6.7": [{ k: "t", label: "高压气动弹射垂直行程", min: 0, max: 100, unit: "%", v: 75 }, { k: "a", label: "气压缓冲回弹", min: 0, max: 100, unit: "%", v: 40 }]
  };

  function defaultControlsFor(code) {
    return MECH_CONTROLS[code] || [
      { k: "t", label: "主行程/驱动位置", min: 0, max: 100, unit: "%", v: 50 },
      { k: "a", label: "姿态自由度 (俯仰/偏航)", min: -30, max: 30, unit: "°", v: 10 }
    ];
  }

  function defaultAutoFor(code) {
    return (s) => ({
      t: 50 + 40 * Math.sin(s * 0.8),
      a: 16 * Math.sin(s * 1.4),
      b: 30 * Math.sin(s * 1.1)
    });
  }

  // Build the complete 55 leaf mechanism registry
  const MECH_MAP = {};
  function registerMech(code, customRender) {
    const controls = defaultControlsFor(code);
    const autoFn = defaultAutoFor(code);
    MECH_MAP[code] = {
      code: code,
      controls: controls,
      auto: autoFn,
      render: function (p) {
        if (customRender) return customRender(p);
        const node = window.MECH ? findNodeInMech(window.MECH, code) : null;
        return genericMechBlueprint(node || { code: code, title: "黑暗乘骑机制 " + code, support: "轨道/无轨/水下", dof: "多自由度", mfg: "全球知名游乐厂商" }, p);
      }
    };
  }

  function findNodeInMech(mechData, code) {
    for (const part of mechData.parts || []) {
      for (const cat of part.cats || []) {
        const found = searchBranch(cat.children || [], code);
        if (found) return found;
      }
    }
    return null;
  }

  function searchBranch(nodes, code) {
    for (const n of nodes) {
      if (n.code === code) return n;
      if (n.children) {
        const hit = searchBranch(n.children, code);
        if (hit) return hit;
      }
    }
    return null;
  }

  // Register all 55 mechanisms
  const ALL_55_CODES = [
    "1.1.1.1", "1.1.1.2", "1.1.1.3", "1.1.1.4", "1.1.2.1", "1.1.2.2", "1.1.2.3",
    "1.1.3.1", "1.1.3.2", "1.1.4.1", "1.1.4.2", "1.1.4.3", "1.2",
    "2.1", "2.2.1", "2.2.2", "2.3",
    "3.1", "3.2", "3.3", "3.4",
    "4.1", "4.2",
    "5.1.1.1", "5.1.1.2", "5.1.1.3", "5.1.2.1", "5.1.2.2", "5.1.2.3", "5.1.3.1", "5.1.3.2", "5.2",
    "T1.1", "T1.2", "T1.3", "T1.4",
    "T2.1", "T2.2", "T2.3", "T2.4", "T2.5", "T2.6", "T2.7",
    "T3.1", "T3.2", "T3.3",
    "T4.1",
    "T5.1",
    "T6.1", "T6.2", "T6.3", "T6.4", "T6.5", "T6.6", "T6.7"
  ];

  ALL_55_CODES.forEach((code) => {
    registerMech(code);
  });

  /* =================================================================
     WINDOW.LAB EXPORT
     ================================================================= */
  window.LAB = {
    // 12 side-by-side engineering comparison modes
    modes: [
      {
        t: "机械臂 vs 悬挂座舱",
        s: "1.1.3.1 / 3.3",
        title: "地面轨道上的机械臂，与吊在天花板上的座舱",
        body: "两者都会让乘客在半空中翻仰，所以常被混为一谈。区别在轨道的位置和受力方式：《禁忌之旅》的轨道在地面，六轴机械臂从椅背后方举起座椅，可以大幅伸缩、抬升；方特《烈焰风云》的轨道在天花板，座舱通过回转支承和液压连杆吊在下方，重心始终在轨道正下方。",
        links: ["1.1.3.1", "3.3", "3.4", "1.1.3.2"],
        note: 0,
        controls: [
          { k: "t", label: "沿轨位置", min: 0, max: 100, unit: "%", v: 45 },
          { k: "a", label: "大臂 / 吊舱俯仰", min: -30, max: 30, unit: "°", v: 12 },
          { k: "b", label: "小臂 / 座椅角度", min: -30, max: 30, unit: "°", v: -8 }
        ],
        auto: (s) => ({ t: 50 + 40 * Math.sin(s * 0.35), a: 20 * Math.sin(s * 0.9), b: 18 * Math.sin(s * 1.3 + 1) }),
        render: armVsSuspended,
        videos: [
          { id: "OGY6P6UkH4Q", label: "《禁忌之旅》开灯实拍" },
          { id: "2_SEJHxlmWw", label: "KUKA RoboCoaster 展会演示" },
          { id: "AHwngQlJcto", label: "方特《烈焰风云》实拍" }
        ]
      },
      {
        t: "动感平台车 vs 越野吉普",
        s: "1.1.2.1 / 1.1.2.3",
        title: "同样颠簸，两条不同的路线",
        body: "环球《蜘蛛侠》这类车辆背着六自由度平台和旋转座舱，靠 3D 屏幕与平台动作配合制造坠落、飞驰；迪士尼《印第安纳琼斯》的越野吉普不旋转、不戴眼镜，刺激来自液压悬挂与实景机关。方特《秦俑地宫》属于后者。",
        links: ["1.1.2.1", "1.1.2.3", "1.1.1.4"],
        note: 1,
        controls: [
          { k: "a", label: "俯仰", min: -15, max: 15, unit: "°", v: 6 },
          { k: "y", label: "座舱旋转（左）", min: -180, max: 180, unit: "°", v: 40 },
          { k: "t", label: "升降 / 颠簸", min: 0, max: 100, unit: "%", v: 40 }
        ],
        auto: (s) => ({ a: 10 * Math.sin(s * 1.4), y: ((s * 40) % 360) - 180, t: 50 + 45 * Math.sin(s * 2.2) }),
        render: scoopVsEmv,
        videos: [
          { id: "cQzoWJAL49g", label: "《蜘蛛侠》开灯运行" },
          { id: "CySHvb_4fHk", label: "Oceaneering EVO-6 演示" },
          { id: "kGaMdu4s7fk", label: "《印第安纳琼斯》开灯拆解" }
        ]
      },
      {
        t: "无轨车如何“飞”起来",
        s: "2.2.2 / T1.1",
        title: "不悬空的飞行体验",
        body: "方特《神画》《千古风华》的车辆分上下两层：下层是无轨底盘，上层是可俯仰、侧倾的动感平台。车辆驶到倾斜球幕边缘停下，球幕向下延伸、遮住地面；画面俯冲时车身前倾，重心的变化被大脑理解为下坠，再加上迎面的风，飞行感就成立了。",
        links: ["2.2.2", "T1.1", "T1.2"],
        note: 2,
        controls: [
          { k: "t", label: "行进", min: 0, max: 100, unit: "%", v: 90 },
          { k: "a", label: "车身前倾", min: 0, max: 25, unit: "°", v: 16 },
          { k: "b", label: "侧倾", min: -15, max: 15, unit: "°", v: 6 }
        ],
        auto: (s) => {
          const cyc = (s * 12) % 160;
          const t = Math.min(100, cyc);
          return { t: t, a: t > 72 ? 16 + 7 * Math.sin(s * 1.8) : 0, b: 10 * Math.sin(s * 1.1) };
        },
        render: shenhua,
        videos: [
          { id: "PptiYHy7W1c", label: "荆州方特《千古风华》" },
          { id: "Fm_bQf6zYKU", label: "Oceaneering 无轨系统（同类底盘）" }
        ]
      },
      {
        t: "两种“会动的船”",
        s: "5.1.3.1 / 5.1.3.2",
        title: "水下导轨驱动，与铰接摇摆",
        body: "上海《加勒比海盗》的船底连着水下导轨与直线电机，可以原地转向、横移、倒退，动作精确可控；Futuroscope《百慕大任务》采用 Mack 的 Rocking Boat，船体与水下导引车铰接，水道没有侧墙，船随水面和人造浪摇晃。",
        links: ["5.1.3.1", "5.1.3.2", "2.1"],
        note: 3,
        controls: [
          { k: "t", label: "沿导轨位置", min: 0, max: 100, unit: "%", v: 40 },
          { k: "y", label: "转向（左）", min: -90, max: 90, unit: "°", v: 35 },
          { k: "a", label: "俯仰（右）", min: -15, max: 15, unit: "°", v: 8 },
          { k: "b", label: "横摇（右）", min: -20, max: 20, unit: "°", v: -10 }
        ],
        auto: (s) => ({ t: 50 + 40 * Math.sin(s * 0.4), y: 80 * Math.sin(s * 0.6), a: 10 * Math.sin(s * 1.6), b: 15 * Math.sin(s * 1.2 + 0.5) }),
        render: boats,
        videos: [
          { id: "lpX8YHcepW8", label: "上海《加勒比海盗》原理解析" },
          { id: "d6srd2tchaA", label: "Mack Rocking Boat 发布" },
          { id: "yRLKS3Xc-7s", label: "《百慕大任务》实拍" }
        ]
      },
      {
        t: "旋转舞台 vs 球形屏幕",
        s: "T3.1 / T2.5",
        title: "让整个观众席动起来",
        body: "Efteling《骷髅之舞》的观众坐在可倾斜、升降的大转盘上，上面的小转盘再各自旋转，在实景里“跳舞”；阿布扎比《超球体 360°》把座椅环悬在完整球形屏幕的中心，伸缩桥撤走后，脚下也是画面。",
        links: ["T3.1", "T2.5", "T3.2", "T4.1"],
        note: 4,
        controls: [
          { k: "a", label: "倾斜", min: -15, max: 15, unit: "°", v: 8 },
          { k: "y", label: "旋转", min: 0, max: 360, unit: "°", v: 30 },
          { k: "t", label: "升降 / 伸缩桥", min: 0, max: 100, unit: "%", v: 60 }
        ],
        auto: (s) => ({ a: 12 * Math.sin(s * 0.7), y: (s * 60) % 360, t: 50 + 45 * Math.sin(s * 0.5) }),
        render: stageVsSphere,
        videos: [
          { id: "i3u04ZhalaU", label: "Intamin Dynamic Motion Stage" },
          { id: "f9mz7TZbTaM", label: "《骷髅之舞》实拍" },
          { id: "-hREiloLWdc", label: "Intamin Dome Ride Theater" }
        ]
      },
      {
        t: "飞行影院的四种入场方式",
        s: "T1.1 – T1.4",
        title: "把乘客送到球幕前的四种机械",
        body: "拖动滑块比较四种结构：迪士尼《翱翔》用悬臂把平地上的座椅举起；《伴你飞翔》等多层楼板把座椅向前推出；方特《飞越极限》把整座多层钢架吊起；Futuroscope《非凡之旅》让整块座椅平台翻转 90°。",
        links: ["T1.1", "T1.2", "T1.3", "T1.4"],
        note: 5,
        controls: [{ k: "t", label: "入场进度", min: 0, max: 100, unit: "%", v: 70 }],
        auto: (s) => ({ t: 50 - 50 * Math.cos(s * 0.8) }),
        render: flyingTheaters,
        videos: [
          { id: "m5tYn38g7LU", label: "迪士尼《翱翔》" },
          { id: "5IVhQ8cZKM0", label: "Brogent i-Ride 介绍" },
          { id: "_Bi4Tg1TuWw", label: "《非凡之旅》实拍" }
        ]
      },
      {
        t: "真潜艇 vs 伪潜艇",
        s: "5.2 / 3.1",
        title: "真入水，还是双层舷窗夹气泡？",
        body: "加州迪士尼与长隆深海潜艇真正潜入数米深水槽；东京迪士尼海洋《海底两万里》其实吊在天花板上、滴水不沾，靠双层舷窗夹薄水层充气泡做出潜水假象。",
        links: ["5.2", "3.1"],
        note: 6,
        controls: [{ k: "t", label: "潜航进度", min: 0, max: 100, unit: "%", v: 45 }],
        auto: (s) => ({ t: 50 + 40 * Math.sin(s * 0.4) }),
        render: submarinesComparison,
        videos: [
          { id: "2H5eE4ZzK-M", label: "东京《海底两万里》开灯与原理解密" },
          { id: "6C2iV6aK5Qc", label: "迪士尼《海底总动员潜艇》实拍" }
        ]
      },
      {
        t: "四大垂直升降与失重机制",
        s: "4.1 / 2.3 / 1.1.2.2 / 1.1.4.2",
        title: "井道拉拽、整车进电梯、车载剪刀叉与跌落轨",
        body: "《惊魂古塔》依靠垂直井道双向卷扬电缆做超重力拉拽；《抵抗组织崛起》无轨车开入垂直跳楼机轿厢整体跌落；《魔法部之战》剪刀叉车载升降；过山车则靠垂直跌落轨 Drop Track 瞬间失重。",
        links: ["4.1", "4.2", "2.3", "1.1.2.2", "1.1.4.2"],
        note: 7,
        controls: [{ k: "t", label: "垂直行程", min: 0, max: 100, unit: "%", v: 55 }],
        auto: (s) => ({ t: 50 + 45 * Math.sin(s * 1.5) }),
        render: verticalDropsComparison,
        videos: [
          { id: "j0-fJvI1i-c", label: "《惊魂古塔》井道机械实录" },
          { id: "eJ9fW1_Wb9Y", label: "《抵抗组织崛起》跳楼机段解密" }
        ]
      },
      {
        t: "三大天旋地转翻转机制",
        s: "T5.1 / 1.1.2.1 / T2.7",
        title: "疯屋视错觉、环幕桶滚与室内真 360° 翻滚",
        body: "疯屋《Villa Volta》外层房间 360° 翻转而乘客长椅只摆动 15°；六旗《正义联盟》靠小车倾角+360° 环幕诱发桶滚；而《Talocan》配重巨臂直接带乘客真倒立翻滚。",
        links: ["T5.1", "1.1.2.1", "T2.7"],
        note: 8,
        controls: [
          { k: "a", label: "外层/巨臂翻转", min: 0, max: 100, unit: "%", v: 45 },
          { k: "b", label: "座舱/长椅角度", min: -30, max: 30, unit: "°", v: 12 }
        ],
        auto: (s) => ({ a: (s * 40) % 100, b: 20 * Math.sin(s * 1.8) }),
        render: illusionsAndSpins,
        videos: [
          { id: "wX6xY-z3wJc", label: "Efteling《Villa Volta》疯屋开灯运行" },
          { id: "9qW-w3b8Q7k", label: "Phantasialand《Talocan》实拍" }
        ]
      },
      {
        t: "真无轨 vs 隐藏导槽与自驾",
        s: "2.1 / 1.1.1.1",
        title: "地面完全平整，还是地板下藏着窄槽？",
        body: "迪士尼《迷离大宅》地板光洁无缝依靠 RFID 自由寻迹；Liseberg《地下国度》车底遮住地板极窄槽缝伪装成无轨；Movieland《Pangea》则让游客握着真方向盘在隐藏导轨里自驾。",
        links: ["2.1", "2.2.1", "1.1.1.1"],
        note: 9,
        controls: [{ k: "t", label: "行进位置", min: 0, max: 100, unit: "%", v: 50 }],
        auto: (s) => ({ t: 50 + 40 * Math.sin(s * 0.7) }),
        render: tracklessVsSlotGuided,
        videos: [
          { id: "7K0Z-wN1Jp0", label: "《迷离大宅》无轨 AGV 路径解密" },
          { id: "8F0vX3_Kz9M", label: "Liseberg《Underlandet》隐藏槽拆解" }
        ]
      },
      {
        t: "涉水暗黑五大驱动架构",
        s: "5.1.1.1 – 5.1.3.1",
        title: "水力自由漂流到水下直线电机全向船",
        body: "水泵推流顺水漂流、水下闭合钢缆定速牵引、水下转盘换轨倒退俯冲、水下剪刀叉动感船、以及上海迪士尼水下直线电机全向 360° 自转巨船。",
        links: ["5.1.1.1", "5.1.2.1", "5.1.1.3", "5.1.2.3", "5.1.3.1"],
        note: 10,
        controls: [
          { k: "t", label: "驱动推进", min: 0, max: 100, unit: "%", v: 45 },
          { k: "a", label: "转盘/自转角度", min: 0, max: 180, unit: "°", v: 45 }
        ],
        auto: (s) => ({ t: 50 + 40 * Math.sin(s * 0.6), a: (s * 30) % 180 }),
        render: waterPropulsion5Ways,
        videos: [
          { id: "lpX8YHcepW8", label: "上海《加勒比海盗》原理解析" },
          { id: "4Y0kP-q8L7g", label: "Phantasialand《Chiapas》转盘换轨" }
        ]
      },
      {
        t: "发车架构与叙事过山车",
        s: "1.1.1.2 / 1.2 / 1.1.4.1 / 1.1.4.2",
        title: "Omnimover 车链、移动步道与受控旋转过山车",
        body: "《幽灵公馆》永不停车的车链吞吐 2400 人/h；《小黄人恶人大会》无座舱移动步道；而《银河护卫队：宇宙倒带》车载电机在高速过山车上精确旋转对准分镜巨幕。",
        links: ["1.1.1.2", "1.2", "1.1.4.1", "1.1.4.2", "1.1.4.3"],
        note: 11,
        controls: [
          { k: "t", label: "运行进度", min: 0, max: 100, unit: "%", v: 50 },
          { k: "a", label: "分镜旋转角度", min: -90, max: 90, unit: "°", v: 30 }
        ],
        auto: (s) => ({ t: 50 + 40 * Math.sin(s * 0.8), a: 35 * Math.sin(s * 1.5) }),
        render: storyCoastersAndOmnimover,
        videos: [
          { id: "m6H8v_N1k3Q", label: "《宇宙倒带》受控旋转转向拆解" },
          { id: "3Q0wX7_K2jA", label: "《幽灵公馆》Omnimover 旋转机构" }
        ]
      }
    ],

    // All 55 individual mechanism schematics
    mechs: MECH_MAP,

    // Helper to render comparison mode
    render: function (i, params) {
      const m = this.modes[i] || this.modes[0];
      const p = { t: 50, a: 0, b: 0, y: 0 };
      m.controls.forEach((c) => { p[c.k] = c.v; });
      Object.assign(p, params || {});
      return m.render(p);
    },

    // Helper to render single mechanism schematic
    renderMech: function (code, params) {
      const m = this.mechs[code] || this.mechs["1.1.1.1"];
      const p = { t: 50, a: 0, b: 0, y: 0 };
      m.controls.forEach((c) => { p[c.k] = c.v; });
      Object.assign(p, params || {});
      return m.render(p);
    }
  };
})();
