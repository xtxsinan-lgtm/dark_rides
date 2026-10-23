/*
  Mechanism lab — schematic drawings rendered as inline SVG.
  All strokes/fills use CSS classes (see .bp-* in styles.css) so drawings follow the theme.
  Each mode declares its own controls; render(mode, params) returns an SVG string.
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

  function divider() {
    return '<path d="M420 24V376" class="bp-faint"/>';
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

  /* ---------------------------------------------------------------- 0 */
  function armVsSuspended(p) {
    let s = open();
    s += title(24, "1.1.3.1", S("m0_l_name", "地面轨道 + 六轴机械臂"), S("m0_l_sub", "环球《禁忌之旅》《怪物大暴走》"));
    s += title(444, "3.3", S("m0_r_name", "顶部悬挂多自由度座舱"), S("m0_r_sub", "方特《烈焰风云》"));
    s += divider();

    // Left: floor-tracked robotic arm
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

    // Right: suspended motion cabin
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

  /* ---------------------------------------------------------------- 1 */
  function scoopVsEmv(p) {
    let s = open();
    s += title(24, "1.1.2.1", S("m1_l_name", "车载六自由度 + 旋转座舱"), S("m1_l_sub", "环球《蜘蛛侠》《变形金刚》、方特《女娲补天》"));
    s += title(444, "1.1.2.3", S("m1_r_name", "越野吉普（EMV）"), S("m1_r_sub", "迪士尼《印第安纳琼斯》、方特《秦俑地宫》"));
    s += divider();

    // Left: SCOOP
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
    // Yaw inset
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

  /* ---------------------------------------------------------------- 2 */
  function shenhua(p) {
    let s = open();
    s += title(24, "2.2.2", S("m2_name", "无轨动感车 + 倾斜球幕"), S("m2_sub", "方特《神画》《千古风华》：不悬空，如何做出飞行的体感"));

    // Floor and the edge of the platform
    s += '<rect x="24" y="300" width="446" height="12" fill="url(#bp-hatch)"/><path d="M24 300H470V384" class="bp-ink"/>';
    // Painting corridor
    [44, 120, 196].forEach((x) => {
      s += '<rect x="' + x + '" y="146" width="58" height="118" class="bp-faint"/>';
      s += '<path d="M' + (x + 8) + " 236l14 -22l10 12l8 -8l12 18" + '" class="bp-faint"/>';
    });
    s += text(150, 134, S("m2_step1", "① 名画长廊：平地无轨穿行"), "bp-label", "middle");
    // Tilted dome
    s += '<path d="M412 70C690 74 806 252 566 394" class="bp-screen"/>';
    s += '<path d="M432 88C670 92 778 252 562 378" class="bp-dash"/>';
    s += text(806, 92, S("m2_step2", "② 倾斜球幕：向下延伸，遮住地面"), "bp-label", "end");
    // Wind and mist
    [0, 1, 2].forEach((i) => {
      const y = 318 + i * 14;
      s += '<path d="M' + (500 + i * 6) + " " + y + "q10 -5 20 0t20 0" + '" class="bp-faint"/>';
    });
    s += text(560, 362, S("m2_wind", "迎面风与水雾"), "bp-label");

    const vx = lerp(76, 428, p.t / 100);
    const near = clamp((p.t - 72) / 28, 0, 1);
    const pitch = p.a * near;
    // Field of view cone
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

    // Rear view inset for roll
    s += '<rect x="34" y="330" width="128" height="54" class="bp-faint"/>';
    s += text(40, 326, S("m2_roll_inset", "后视 · 侧倾"), "bp-label");
    s += '<path d="M60 374H136" class="bp-ink"/>';
    s += '<g transform="translate(98 368) rotate(' + f(p.b) + ')"><rect x="-26" y="-6" width="52" height="6" class="bp-body"/><rect x="-22" y="-24" width="44" height="16" rx="3" class="bp-move-body"/>' + rider(-8, -29, 0.8) + rider(8, -29, 0.8) + "</g>";
    return s + close();
  }

  /* ---------------------------------------------------------------- 3 */
  function boats(p) {
    let s = open();
    s += title(24, "5.1.3.1", S("m3_l_name", "水下导轨 + 直线电机"), S("m3_l_sub", "上海迪士尼《加勒比海盗：沉落宝藏之战》"));
    s += title(444, "5.1.3.2", S("m3_r_name", "铰接摇摆船（Rocking Boat）"), S("m3_r_sub", "Futuroscope《百慕大任务》· Mack Rides"));
    s += divider();

    const wave = (x1, x2, y, amp, phase) => {
      let d = "M" + x1 + " " + y;
      for (let x = x1; x <= x2; x += 8) d += "L" + x + " " + f(y + Math.sin(x / 26 + phase) * amp);
      return '<path d="' + d + '" class="bp-water"/>';
    };

    // Left
    s += wave(24, 396, 204, 1.4, 0);
    s += wave(24, 396, 232, 1, 1.4).replace("bp-water", "bp-faint");
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
    s += wave(444, 816, 206, 5, phase);
    s += wave(444, 816, 234, 1, phase * 0.5).replace("bp-water", "bp-faint");
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
    s += wave(746, 810, 120, 1.5, phase);
    s += '<g transform="translate(778 118) rotate(' + f(p.b) + ')"><path d="M-22 -10H22L16 4H-16Z" class="bp-move-body"/>' + rider(-6, -15, 0.7) + rider(8, -15, 0.7) + "</g>";
    s += text(444, 388, S("m3_r_foot", "水道无侧墙，船体随水面与浪摇摆，也能倒退"), "bp-label");
    return s + close();
  }

  /* ---------------------------------------------------------------- 4 */
  function stageVsSphere(p) {
    let s = open();
    s += title(24, "T3.1", S("m4_l_name", "倾斜、升降的多级旋转舞台"), S("m4_l_sub", "Efteling《骷髅之舞》"));
    s += title(444, "T2.5", S("m4_r_name", "球形屏幕中的悬挂座椅环"), S("m4_r_sub", "阿布扎比海洋世界《超球体 360°》"));
    s += divider();

    // Left
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

  /* ---------------------------------------------------------------- 5 */
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

  window.LAB = {
    modes: [
      {
        t: "机械臂 vs 悬挂座舱",
        s: "1.1.3.1 / 3.3",
        title: "地面轨道上的机械臂，与吊在天花板上的座舱",
        body: "两者都会让乘客在半空中翻仰，所以常被混为一谈。区别在轨道的位置和受力方式：《禁忌之旅》的轨道在地面，六轴机械臂从椅背后方举起座椅，可以大幅伸缩、抬升；方特《烈焰风云》的轨道在天花板，座舱通过回转支承和液压连杆吊在下方，重心始终在轨道正下方。",
        links: ["1.1.3.1", "3.3"],
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
        links: ["1.1.2.1", "1.1.2.3"],
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
        s: "2.2.2",
        title: "不悬空的飞行体验",
        body: "方特《神画》《千古风华》的车辆分上下两层：下层是无轨底盘，上层是可俯仰、侧倾的动感平台。车辆驶到倾斜球幕边缘停下，球幕向下延伸、遮住地面；画面俯冲时车身前倾，重心的变化被大脑理解为下坠，再加上迎面的风，飞行感就成立了。",
        links: ["2.2.2"],
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
        links: ["5.1.3.1", "5.1.3.2"],
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
        links: ["T3.1", "T2.5"],
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
      }
    ],
    render: function (i, params) {
      const m = this.modes[i];
      const p = { t: 50, a: 0, b: 0, y: 0 };
      m.controls.forEach((c) => { p[c.k] = c.v; });
      Object.assign(p, params || {});
      return m.render(p);
    }
  };
})();
