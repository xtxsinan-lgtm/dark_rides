/* Dark Ride Atlas — application logic (no build step, no dependencies). */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ utils */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (v) =>
    String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const pad = (n) => String(n).padStart(2, "0");
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const stripTags = (s) => String(s).replace(/<[^>]+>/g, " ");

  const RIDES = window.RIDES || [];
  const GROUPS = window.GROUPS || [];
  const VIDEOS = window.VIDEOS || {};
  const MECH = window.MECH;
  const LAB = window.LAB;
  const PARKS = window.PARK_MATRIX_DATA || {};
  const NOTES = window.DISTINCTIONS_DATA || [];
  const TECH = window.TECHNIQUES || { visual: [], interaction: [] };
  const FACTS = window.FACTS || [];

  const GROUP_LABEL = {};
  GROUPS.forEach((g) => (GROUP_LABEL[g.key] = g.label));

  const VIDEO_TYPES = [
    ["pov", "实拍"],
    ["lights", "开灯"],
    ["demo", "厂商演示"],
    ["explain", "原理讲解"]
  ];

  // Stills: prefer a frame from inside the video (hq1–hq3) over the uploader's thumbnail, which often has text on it.
  const frameOf = (id) => (VIDEOS[id] && VIDEOS[id].f ? VIDEOS[id].f.slice(2) : "");
  const still = (id, size) => {
    const n = frameOf(id);
    const name = { hq: n ? "hq" + n : "hqdefault", sd: n ? "sd" + n : "sddefault", max: n ? "maxres" + n : "maxresdefault" }[size];
    return "https://i.ytimg.com/vi/" + id + "/" + name + ".jpg";
  };
  const thumb = (id) => still(id, "hq");
  const card = (id) => still(id, "sd");
  const big = (id) => still(id, "max");
  const ytUrl = (id) => "https://www.youtube.com/watch?v=" + id;
  const ytSearch = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const biliSearch = (q) => "https://search.bilibili.com/all?keyword=" + encodeURIComponent(q);
  const embed = (id) =>
    '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
    '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="YouTube 视频播放器" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

  /* ------------------------------------------------------- mechanism index */
  const LEAVES = [];
  const LEAF = {};
  MECH.parts.forEach((part) => {
    part.cats.forEach((cat) => {
      const walk = (node, path) => {
        if (node.children) node.children.forEach((c) => walk(c, path.concat(node)));
        else {
          const e = { node: node, cat: cat, part: part, path: path, index: LEAVES.length };
          LEAVES.push(e);
          LEAF[node.code] = e;
        }
      };
      cat.children.forEach((c) => walk(c, []));
    });
  });

  const catKeyOf = (code) => (LEAF[code] ? LEAF[code].cat.key : /^T\d/.test(code) ? "t" + code[1] : "c" + code[0]);
  const ridesFor = (code) => RIDES.filter((r) => r.code === code);
  const firstVideo = (r) => (r.v ? r.v.pov || r.v.lights || r.v.demo || r.v.explain : null);

  const usedVideos = new Set();
  RIDES.forEach((r) => r.v && Object.values(r.v).forEach((id) => usedVideos.add(id)));
  LEAVES.forEach((e) => e.node.demo && usedVideos.add(e.node.demo));
  LAB.modes.forEach((m) => m.videos.forEach((v) => usedVideos.add(v.id)));
  FACTS.forEach((f) => f.video && usedVideos.add(f.video));

  /* ------------------------------------------------------------------ state */
  const store = {
    get(k, d) {
      try { return localStorage.getItem(k) || d; } catch (e) { return d; }
    },
    set(k, v) {
      try { localStorage.setItem(k, v); } catch (e) { /* private mode */ }
    }
  };

  const state = {
    view: null,
    group: "all",
    cat: "all",
    q: "",
    onlyLights: false,
    onlyDemo: false,
    layout: store.get("dra-layout", "grid"),
    compare: [],
    part: "ride",
    mech: "1.1.3.1",
    collapsed: {},
    lab: 0,
    labParams: {},
    playing: false,
    park: "disney",
    parkQ: "",
    fact: Math.floor(Math.random() * Math.max(FACTS.length, 1)),
    pushed: false
  };
  MECH.parts.forEach((p) => p.cats.forEach((c) => (state.collapsed[c.key] = true)));

  /* ------------------------------------------------------------------ theme */
  const root = document.documentElement;
  const themeParam = location.search.match(/[?&]theme=(light|dark)/);
  let theme = themeParam ? themeParam[1] : store.get("dra-theme", "dark");

  function applyTheme() {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    const btn = $("#theme-toggle");
    btn.innerHTML = (theme === "light" ? icon("moon") : icon("bulb")) + '<span class="label">' + (theme === "light" ? "关灯" : "开灯") + "</span>";
    btn.setAttribute("aria-label", theme === "light" ? "切换到暗色" : "切换到亮色");
    btn.title = theme === "light" ? "关灯（暗色）" : "开灯（亮色）";
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#f4f2ec" : "#0e0e0d";
  }

  /* ------------------------------------------------------------------ views */
  const VIEW_TITLES = { rides: "", mechanisms: "机制", lab: "原理", parks: "乐园", notes: "辨析", glossary: "视效与交互" };

  function showView(name) {
    const changed = state.view !== name;
    state.view = name;
    $$(".view").forEach((v) => (v.hidden = v.dataset.view !== name));
    $$(".site-nav a").forEach((a) => {
      if (a.dataset.route === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.title = (VIEW_TITLES[name] ? VIEW_TITLES[name] + " · " : "") + "Dark Ride Atlas · 黑暗乘骑图鉴";
    if (name !== "lab") stopLab();
    if (changed) window.scrollTo(0, 0);
    return changed;
  }

  /* ------------------------------------------------------------------- hero */
  function renderHero() {
    $("#stat-cats").textContent = MECH.parts[0].cats.length;
    $("#stat-mechs").textContent = LEAVES.length;
    $("#stat-rides").textContent = RIDES.length;
    $("#stat-videos").textContent = usedVideos.size;
    renderFact();
  }

  function renderFact() {
    if (!FACTS.length) return;
    const i = state.fact % FACTS.length;
    const f = FACTS[i];
    const e = LEAF[f.code];
    $("#feature").innerHTML =
      '<a class="plate-media" href="' + ytUrl(f.video) + '" data-video="' + f.video + '" data-title="' + esc(f.caption) + '">' +
      '<img src="' + big(f.video) + '" data-fallback="' + thumb(f.video) + '" alt="">' +
      '<span class="thumb-play">' + icon("play") + "</span></a>" +
      '<figcaption class="plate-caption"><span class="plate-no">图 ' + pad(i + 1) + " / " + pad(FACTS.length) + "</span>" +
      "<span>" + esc(f.caption) + "</span></figcaption>" +
      '<div class="plate-body"><p class="plate-kicker">你可能不知道</p>' +
      '<blockquote class="plate-text">' + esc(f.text) + "</blockquote>" +
      '<div class="plate-foot"><a class="text-link" href="#/mechanisms/' + f.code + '"><span class="code">' + f.code + "</span>" + esc(e ? e.node.short : "") + icon("arrowRight") + "</a>" +
      '<button class="plate-shuffle" type="button" data-action="next-fact">' + icon("refresh") + "换一条</button></div></div>";
  }

  /* --------------------------------------------------------------- rides */
  function matches(r, skipGroup) {
    if (!skipGroup && state.group !== "all" && r.g !== state.group) return false;
    if (state.cat !== "all" && catKeyOf(r.code) !== state.cat) return false;
    if (state.onlyLights && !(r.v && r.v.lights)) return false;
    if (state.onlyDemo && !(r.v && (r.v.demo || r.v.explain))) return false;
    if (state.q) {
      const e = LEAF[r.code];
      const hay = [r.zh, r.en, r.park, r.mfg, r.code, GROUP_LABEL[r.g], e ? e.node.title + e.node.short : ""].join(" ").toLowerCase();
      if (!state.q.toLowerCase().split(/\s+/).every((t) => hay.indexOf(t) !== -1)) return false;
    }
    return true;
  }

  function rideCard(r, mini) {
    const v = r.v || {};
    const vid = firstVideo(r);
    const e = LEAF[r.code];
    let media;
    if (vid) {
      const tags = [];
      if (v.lights) tags.push('<span class="thumb-tag is-lit">开灯</span>');
      if (v.demo) tags.push('<span class="thumb-tag">厂商演示</span>');
      media =
        '<div class="thumb"><img loading="lazy" decoding="async" src="' + card(vid) + '" data-fallback="' + thumb(vid) + '" alt="">' +
        (tags.length ? '<span class="thumb-tags">' + tags.join("") + "</span>" : "") +
        '<span class="thumb-play">' + icon("play") + "</span></div>";
    } else {
      media =
        '<div class="thumb is-empty">' + glyph(catKeyOf(r.code)) +
        '<span class="thumb-empty-note">暂无可嵌入影像</span></div>';
    }
    const on = state.compare.indexOf(r.id) !== -1;
    return (
      '<article class="ride-card">' +
      '<a class="ride-link" href="#/rides/' + r.id + '" data-ride="' + r.id + '">' + media +
      '<div class="ride-body"><p class="ride-meta"><span class="park">' + esc(r.park) + "</span>" +
      (r.year ? '<span class="year">' + r.year + "</span>" : "") + "</p>" +
      '<h3 class="ride-title">' + esc(r.zh) + "</h3>" +
      '<p class="ride-en">' + esc(r.en) + "</p>" +
      (mini ? "" : '<p class="ride-summary">' + esc(r.text) + "</p>") +
      "</div></a>" +
      (mini
        ? ""
        : '<div class="ride-foot"><span class="ride-mech"><span class="code">' + r.code + "</span>" + esc(e ? e.node.short : "") + "</span>" +
          '<button class="compare-toggle" type="button" data-compare="' + r.id + '" aria-pressed="' + on + '">' +
          icon(on ? "check" : "plus") + "<span>" + (on ? "已加入对比" : "对比") + "</span></button></div>") +
      "</article>"
    );
  }

  function rideTable(list) {
    return (
      '<div class="table-wrap"><table class="ride-table"><thead><tr><th>编号</th><th>项目</th><th>乐园</th><th>制造商</th><th>影像</th></tr></thead><tbody>' +
      list
        .map((r) => {
          const v = r.v || {};
          return (
            '<tr data-ride="' + r.id + '" tabindex="0"><td class="t-code">' + r.code + "</td>" +
            '<td><span class="t-title">' + esc(r.zh) + '</span><span class="t-en">' + esc(r.en) + "</span></td>" +
            '<td class="t-muted">' + esc(r.park) + (r.year ? " · " + r.year : "") + "</td>" +
            '<td class="t-muted">' + esc(r.mfg || "—") + "</td>" +
            '<td><span class="media-marks"><span class="' + (v.pov ? "on" : "") + '">实拍</span>' +
            '<span class="' + (v.lights ? "on" : "") + '">开灯</span>' +
            '<span class="' + (v.demo || v.explain ? "on" : "") + '">演示</span></span></td></tr>'
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  }

  function renderGroupChips() {
    const counts = { all: 0 };
    RIDES.forEach((r) => {
      if (matches(r, true)) {
        counts.all++;
        counts[r.g] = (counts[r.g] || 0) + 1;
      }
    });
    $("#group-chips").innerHTML = [{ key: "all", label: "全部" }]
      .concat(GROUPS)
      .map((g) => '<button class="chip" type="button" data-group="' + g.key + '" aria-pressed="' + (state.group === g.key) + '">' + g.label + '<span class="count">' + (counts[g.key] || 0) + "</span></button>")
      .join("");
  }

  function renderCatSelect() {
    $("#cat-select").innerHTML =
      '<option value="all">全部门类</option>' +
      MECH.parts.map((p) => '<optgroup label="' + p.label + '">' + p.cats.map((c) => '<option value="' + c.key + '">' + c.num + " · " + c.title + "</option>").join("") + "</optgroup>").join("");
    $("#cat-select").value = state.cat;
  }

  function renderRides() {
    renderGroupChips();
    const list = RIDES.filter((r) => matches(r));
    $("#result-count").innerHTML = "<strong>" + list.length + "</strong> / " + RIDES.length + " 个项目";
    $$("#layout-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.layout === state.layout)));
    const box = $("#ride-results");
    if (!list.length) {
      box.className = "ride-grid";
      box.innerHTML = '<div class="empty-state"><h3>没有找到符合条件的项目</h3><p>换个关键词，或者清除筛选条件。</p><button class="btn" type="button" data-action="reset-filters">清除筛选</button></div>';
      return;
    }
    if (state.layout === "list") {
      box.className = "";
      box.innerHTML = rideTable(list);
    } else {
      box.className = "ride-grid";
      box.innerHTML = list.map((r) => rideCard(r)).join("");
    }
  }

  function resetFilters() {
    state.group = "all";
    state.cat = "all";
    state.q = "";
    state.onlyLights = false;
    state.onlyDemo = false;
    $("#filter-q").value = "";
    $("#cat-select").value = "all";
    $("#only-lights").checked = false;
    $("#only-demo").checked = false;
    renderRides();
  }

  /* --------------------------------------------------------------- player */
  function playerHTML(id, caption) {
    const meta = VIDEOS[id] || {};
    const cap = caption ? '<span class="player-caption">' + esc(caption) + "</span>" : "";
    if (meta.noEmbed) {
      return (
        '<div class="player"><img src="' + big(id) + '" data-fallback="' + thumb(id) + '" alt="">' +
        '<a class="player-start" href="' + ytUrl(id) + '" target="_blank" rel="noopener" aria-label="在 YouTube 观看"><span class="ring">' + icon("external") + "</span></a>" +
        '<span class="player-caption">' + esc(caption || "") + "（该视频需在 YouTube 观看）</span></div>"
      );
    }
    return (
      '<div class="player"><img src="' + big(id) + '" data-fallback="' + thumb(id) + '" alt="">' +
      '<button class="player-start" type="button" data-play="' + id + '" aria-label="播放视频"><span class="ring">' + icon("play") + "</span></button>" + cap + "</div>"
    );
  }

  function emptyPlayer(r) {
    return (
      '<div class="player is-empty"><div>' + glyph(catKeyOf(r.code)) +
      "<p>暂未收录可嵌入的影像</p><p>" +
      '<a class="text-link" href="' + biliSearch(r.bili || r.zh) + '" target="_blank" rel="noopener">在 B 站搜索</a> · ' +
      '<a class="text-link" href="' + ytSearch(r.en + " ride") + '" target="_blank" rel="noopener">在 YouTube 搜索</a></p></div></div>'
    );
  }

  /* ---------------------------------------------------------- backdrops */
  let lastFocus = null;

  function openBackdrop(id) {
    const b = document.getElementById(id);
    if (!$$(".backdrop.is-open").length) lastFocus = document.activeElement;
    b.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const f = b.querySelector("[data-autofocus]") || b.querySelector("input, button, a[href]");
      if (f) f.focus({ preventScroll: true });
    }, 40);
  }

  function closeBackdrop(id) {
    const b = document.getElementById(id);
    if (!b.classList.contains("is-open")) return;
    b.classList.remove("is-open");
    if (id !== "palette-backdrop") {
      const content = b.querySelector(".dialog");
      setTimeout(() => { if (!b.classList.contains("is-open") && content) content.innerHTML = ""; }, 280);
    }
    if (!$$(".backdrop.is-open").length) {
      document.body.style.overflow = "";
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    }
  }

  function closeTop() {
    const order = ["palette-backdrop", "video-backdrop", "compare-backdrop", "ride-backdrop"];
    for (let i = 0; i < order.length; i++) {
      if (document.getElementById(order[i]).classList.contains("is-open")) {
        if (order[i] === "ride-backdrop") requestCloseRide();
        else closeBackdrop(order[i]);
        return;
      }
    }
  }

  /* --------------------------------------------------------- ride dialog */
  function openRide(id) {
    const r = RIDES.find((x) => x.id === id);
    if (!r) return;
    const e = LEAF[r.code];
    const types = VIDEO_TYPES.filter((t) => r.v && r.v[t[0]]);
    const first = types.length ? types[0][0] : null;
    const on = state.compare.indexOf(r.id) !== -1;
    state.ride = r;

    const tabs = types.length
      ? '<div class="media-tabs">' +
        types.map((t) => '<button class="chip" type="button" data-vtype="' + t[0] + '" aria-selected="' + (t[0] === first) + '">' + t[1] + "</button>").join("") +
        '<span class="source" id="ride-source">' + sourceLine(r, first) + "</span></div>"
      : "";

    $("#ride-dialog").innerHTML =
      '<button class="dialog-close" type="button" data-close="ride" aria-label="关闭">' + icon("close") + "</button>" +
      '<div id="ride-player">' + (first ? playerHTML(r.v[first], captionFor(r, first)) : emptyPlayer(r)) + "</div>" + tabs +
      '<div class="dialog-body"><div>' +
      (e ? '<a class="dialog-kicker" href="#/mechanisms/' + r.code + '"><span class="code">' + r.code + "</span><span>" + esc(e.node.title) + "</span>" + icon("arrowRight") + "</a>" : "") +
      '<h2 class="dialog-title" id="ride-dialog-title">' + esc(r.zh) + "</h2>" +
      '<p class="dialog-en">' + esc(r.en) + "</p>" +
      '<p class="dialog-summary">' + esc(r.text) + "</p>" +
      '<div class="dialog-actions">' +
      (first
        ? '<a class="btn" id="ride-yt" href="' + ytUrl(r.v[first]) + '" target="_blank" rel="noopener">在 YouTube 打开' + icon("external") + "</a>"
        : "") +
      '<a class="btn" href="' + biliSearch(r.bili || r.zh) + '" target="_blank" rel="noopener">在 B 站搜索' + icon("external") + "</a>" +
      '<button class="btn" type="button" data-compare="' + r.id + '" aria-pressed="' + on + '">' + (on ? "已加入对比" : "加入对比") + "</button>" +
      "</div></div>" +
      '<dl class="spec"><dt>乐园</dt><dd>' + esc(r.park) + "</dd>" +
      (r.year ? "<dt>开业</dt><dd>" + r.year + "</dd>" : "") +
      (e
        ? "<dt>门类</dt><dd>" + e.cat.num + " · " + esc(e.cat.title) + "</dd>" +
          "<dt>支撑与导引</dt><dd>" + esc(e.node.support) + "</dd>" +
          "<dt>自由度</dt><dd>" + esc(e.node.dof) + "</dd>"
        : "") +
      "<dt>制造商</dt><dd>" + esc(r.mfg || "—") + "</dd></dl></div>";

    openBackdrop("ride-backdrop");

    if (state.view === "rides") {
      const target = "#/rides/" + r.id;
      if (location.hash !== target) {
        history.pushState(null, "", target);
        state.pushed = true;
      }
    }
  }

  function captionFor(r, type) {
    const id = r.v[type];
    return (r.note && r.note[type]) || (VIDEOS[id] && VIDEOS[id].t) || "";
  }

  function sourceLine(r, type) {
    const meta = VIDEOS[r.v[type]] || {};
    return meta.c ? "YouTube · " + esc(meta.c) : "YouTube";
  }

  function switchRideVideo(type) {
    const r = state.ride;
    if (!r || !r.v || !r.v[type]) return;
    $$("#ride-dialog [data-vtype]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.vtype === type)));
    $("#ride-player").innerHTML = playerHTML(r.v[type], captionFor(r, type));
    $("#ride-source").innerHTML = sourceLine(r, type);
    const yt = $("#ride-yt");
    if (yt) yt.href = ytUrl(r.v[type]);
  }

  function closeRide() {
    closeBackdrop("ride-backdrop");
    state.ride = null;
  }

  function requestCloseRide() {
    if (state.pushed && location.hash.indexOf("#/rides/") === 0) {
      state.pushed = false;
      history.back();
      return;
    }
    closeRide();
    if (location.hash.indexOf("#/rides/") === 0) history.replaceState(null, "", "#/");
  }

  /* -------------------------------------------------------- video dialog */
  function openVideo(id, label) {
    const meta = VIDEOS[id] || {};
    if (meta.noEmbed) {
      window.open(ytUrl(id), "_blank", "noopener");
      return;
    }
    $("#video-dialog").innerHTML =
      '<button class="dialog-close" type="button" data-close="video" aria-label="关闭">' + icon("close") + "</button>" +
      '<div class="player">' + embed(id) + "</div>" +
      '<div class="media-tabs"><span class="video-title">' + esc(label || meta.t || "") + "</span>" +
      '<a class="source text-link" href="' + ytUrl(id) + '" target="_blank" rel="noopener">' + esc(meta.c || "YouTube") + icon("external") + "</a></div>";
    openBackdrop("video-backdrop");
  }

  /* ------------------------------------------------------------- compare */
  function toggleCompare(id) {
    const i = state.compare.indexOf(id);
    if (i !== -1) state.compare.splice(i, 1);
    else {
      if (state.compare.length >= 3) state.compare.shift();
      state.compare.push(id);
    }
    renderTray();
    $$("[data-compare]").forEach((b) => {
      const on = state.compare.indexOf(b.dataset.compare) !== -1;
      b.setAttribute("aria-pressed", String(on));
      if (b.classList.contains("compare-toggle")) b.innerHTML = icon(on ? "check" : "plus") + "<span>" + (on ? "已加入对比" : "对比") + "</span>";
      else b.textContent = on ? "已加入对比" : "加入对比";
    });
  }

  function renderTray() {
    const n = state.compare.length;
    $("#compare-tray").classList.toggle("is-visible", n > 0);
    $("#tray-items").innerHTML = state.compare
      .map((id) => {
        const r = RIDES.find((x) => x.id === id);
        return '<span class="tray-item">' + esc(r.zh) + '<button type="button" data-uncompare="' + id + '" aria-label="移出对比">' + icon("close") + "</button></span>";
      })
      .join("");
    const go = $("#tray-go");
    go.disabled = n < 2;
    go.textContent = n < 2 ? "再选一个" : "对比 " + n + " 项";
  }

  function openCompare() {
    const rs = state.compare.map((id) => RIDES.find((r) => r.id === id)).filter(Boolean);
    if (rs.length < 2) return;
    const leaf = (r) => LEAF[r.code] || { node: {}, cat: {} };
    const rows = [
      ["乐园", (r) => esc(r.park)],
      ["开业", (r) => r.year || "—"],
      ["机制", (r) => '<a class="code-link" href="#/mechanisms/' + r.code + '">' + r.code + "</a> " + esc(leaf(r).node.title || "")],
      ["支撑与导引", (r) => esc(leaf(r).node.support || "—")],
      ["自由度", (r) => esc(leaf(r).node.dof || "—")],
      ["制造商", (r) => esc(r.mfg || "—")],
      ["简介", (r) => esc(r.text)]
    ];
    $("#compare-dialog").innerHTML =
      '<div class="dialog-head"><h2>项目对比</h2><button class="dialog-close" type="button" data-close="compare" aria-label="关闭">' + icon("close") + "</button></div>" +
      '<div class="compare-body"><div class="table-wrap"><table class="data-table"><thead><tr><th></th>' +
      rs.map((r) => "<th>" + (firstVideo(r) ? '<img src="' + thumb(firstVideo(r)) + '" alt="">' : "") + esc(r.zh) + "</th>").join("") +
      "</tr></thead><tbody>" +
      rows.map((row) => "<tr><td>" + row[0] + "</td>" + rs.map((r) => "<td>" + row[1](r) + "</td>").join("") + "</tr>").join("") +
      "</tbody></table></div></div>";
    openBackdrop("compare-backdrop");
  }

  /* ---------------------------------------------------------- mechanisms */
  function renderMechNav() {
    const part = MECH.parts.find((p) => p.id === state.part) || MECH.parts[0];
    $("#part-switch").innerHTML = MECH.parts
      .map((p) => '<button type="button" data-part="' + p.id + '" aria-pressed="' + (p.id === part.id) + '">' + p.label + "</button>")
      .join("");
    $("#mech-tree").innerHTML = part.cats
      .map((cat) => {
        const open = !state.collapsed[cat.key];
        return (
          '<div class="tree-cat"><button class="tree-cat-btn" type="button" data-toggle-cat="' + cat.key + '" aria-expanded="' + open + '">' +
          '<span class="num">' + cat.num + "</span><span>" + esc(cat.title) + "</span>" + icon("chevronDown", "chev") + "</button>" +
          '<div class="tree-group"' + (open ? "" : " hidden") + ">" + cat.children.map(treeNode).join("") + "</div></div>"
        );
      })
      .join("");
  }

  function treeNode(n) {
    if (n.children) {
      return (
        '<div class="tree-label"><span class="code">' + n.code + "</span><span>" + esc(n.title) + "</span></div>" +
        '<div class="tree-group">' + n.children.map(treeNode).join("") + "</div>"
      );
    }
    return (
      '<a class="tree-leaf" href="#/mechanisms/' + n.code + '"' + (n.code === state.mech ? ' aria-current="page"' : "") + ">" +
      '<span class="code">' + n.code + "</span><span>" + esc(n.short) + "</span></a>"
    );
  }

  function selectMech(code) {
    const e = LEAF[code] || LEAF[state.mech] || LEAVES[0];
    state.mech = e.node.code;
    state.part = e.part.id;
    state.collapsed[e.cat.key] = false;
    renderMechNav();
    renderMechArticle(e);
    const active = $("#mech-tree [aria-current]");
    const nav = $(".side-nav");
    if (active && nav && nav.scrollHeight > nav.clientHeight + 4) {
      const top = active.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop;
      if (top < nav.scrollTop + 40 || top > nav.scrollTop + nav.clientHeight - 60) nav.scrollTop = Math.max(0, top - 140);
    }
  }

  function renderMechArticle(e) {
    const n = e.node;
    const crumbs = [e.part.title, e.cat.num + " · " + e.cat.title].concat(e.path.map((b) => b.code + " " + b.title));
    const related = ridesFor(n.code);
    let video = null;
    if (n.demo) video = { id: n.demo, caption: n.demoNote };
    else {
      const r = related.find((x) => x.v && x.v.pov);
      if (r) video = { id: r.v.pov, caption: "相关项目：" + r.zh };
    }
    const prev = LEAVES[e.index - 1];
    const next = LEAVES[e.index + 1];

    $("#mech-article").innerHTML =
      '<nav class="crumbs" aria-label="所在位置">' + crumbs.map((c) => "<span>" + esc(c) + "</span>").join("") + "</nav>" +
      '<p class="article-code">' + n.code + "</p>" +
      '<h2 class="article-title">' + esc(n.title) + "</h2>" +
      '<p class="article-en">' + esc(n.en) + "</p>" +
      '<p class="article-lede">' + esc(n.text) + "</p>" +
      '<dl class="spec-grid"><div><dt>支撑与导引</dt><dd>' + esc(n.support) + "</dd></div>" +
      "<div><dt>自由度</dt><dd>" + esc(n.dof) + "</dd></div>" +
      "<div><dt>主要制造商</dt><dd>" + esc(n.mfg) + "</dd></div></dl>" +
      (video
        ? '<figure class="article-video">' + playerHTML(video.id, "") +
          "<figcaption><span>" + esc(video.caption || "") + "</span><span>" + (VIDEOS[video.id] && VIDEOS[video.id].c ? "YouTube · " + esc(VIDEOS[video.id].c) : "") + "</span></figcaption></figure>"
        : "") +
      '<section class="article-section"><h3 class="article-h">各乐园的同类项目</h3><dl class="park-rows">' +
      n.parks.map((p) => '<div class="park-row"><dt>' + esc(p[0]) + "</dt><dd>" + esc(p[1]) + "</dd></div>").join("") +
      "</dl></section>" +
      (related.length
        ? '<section class="article-section"><h3 class="article-h">收录的项目<small>' + related.length + " 个</small></h3>" +
          '<div class="mini-grid">' + related.map((r) => rideCard(r, true)).join("") + "</div></section>"
        : "") +
      '<nav class="pager" aria-label="翻页">' +
      (prev ? '<a href="#/mechanisms/' + prev.node.code + '"><small>上一个</small><span class="code">' + prev.node.code + "</span>" + esc(prev.node.short) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="#/mechanisms/' + next.node.code + '"><small>下一个</small><span class="code">' + next.node.code + "</span>" + esc(next.node.short) + "</a>" : "") +
      "</nav>";
  }

  /* ----------------------------------------------------------------- lab */
  let raf = 0;
  let frame = 0;
  let labStart = 0;
  let labElapsed = 0;

  const fmt = (v, unit) => Math.round(v) + unit;

  function renderLabList() {
    $("#lab-list").innerHTML = LAB.modes
      .map((m, i) =>
        '<button class="lab-item" type="button" role="tab" data-lab="' + i + '" aria-selected="' + (i === state.lab) + '">' +
        '<span class="num">' + pad(i + 1) + '</span><span class="t">' + esc(m.t) + '</span><span class="s">' + esc(m.s) + "</span></button>")
      .join("");
  }

  function selectLab(i) {
    if (!(i >= 0 && i < LAB.modes.length)) i = 0;
    state.lab = i;
    const m = LAB.modes[i];
    state.labParams = {};
    m.controls.forEach((c) => (state.labParams[c.k] = c.v));
    renderLabList();
    renderLabControls();
    drawLab();
    renderLabNotes();
    $("#lab-tb").innerHTML =
      "<span><small>图号</small>DRA–" + pad(i + 1) + "</span>" +
      "<span><small>比例</small>示意 · 不按比例</span>" +
      "<span><small>对照</small>" + esc(m.s) + "</span>";
  }

  function drawLab() {
    $("#lab-canvas").innerHTML = LAB.render(state.lab, state.labParams);
  }

  function renderLabControls() {
    const m = LAB.modes[state.lab];
    $("#lab-controls").innerHTML =
      m.controls
        .map((c) =>
          '<div class="range-field"><label for="ctl-' + c.k + '"><span>' + esc(c.label) + '</span><output id="out-' + c.k + '">' + fmt(state.labParams[c.k], c.unit) + "</output></label>" +
          '<input id="ctl-' + c.k + '" type="range" min="' + c.min + '" max="' + c.max + '" step="1" value="' + state.labParams[c.k] + '" data-ctl="' + c.k + '"></div>')
        .join("") +
      '<div class="lab-buttons"><button class="btn btn-sm" type="button" data-action="lab-play" id="lab-play"></button>' +
      '<button class="btn btn-sm" type="button" data-action="lab-reset">' + icon("refresh") + "复位</button></div>";
    updatePlayButton();
  }

  function renderLabNotes() {
    const m = LAB.modes[state.lab];
    $("#lab-notes").innerHTML =
      '<div><p class="eyebrow">' + pad(state.lab + 1) + " · " + esc(m.s) + "</p><h2>" + esc(m.title) + "</h2><p>" + esc(m.body) + "</p>" +
      '<div class="links">' +
      m.links.map((c) => '<a class="text-link" href="#/mechanisms/' + c + '">' + c + " " + esc(LEAF[c] ? LEAF[c].node.short : "") + "</a>").join("") +
      '<a class="text-link" href="#/notes/' + (m.note + 1) + '">读辨析' + icon("arrowRight") + "</a></div></div>" +
      '<div><p class="eyebrow" style="margin-bottom:10px">相关影像</p><div class="video-list">' +
      m.videos
        .map((v) =>
          '<button class="video-row" type="button" data-video="' + v.id + '" data-title="' + esc(v.label) + '">' +
          '<img src="' + thumb(v.id) + '" alt="" loading="lazy"><span><span class="vt">' + esc(v.label) + '</span><span class="vs">' + esc(VIDEOS[v.id] ? VIDEOS[v.id].c : "") + "</span></span></button>")
        .join("") +
      "</div></div>";
  }

  function updatePlayButton() {
    const b = $("#lab-play");
    if (b) b.innerHTML = state.playing ? icon("pause") + "暂停" : icon("play") + "自动演示";
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if ((frame++ & 1) === 1) return;
    labElapsed = now - labStart;
    const m = LAB.modes[state.lab];
    const vals = m.auto(labElapsed / 1000);
    m.controls.forEach((c) => {
      const v = clamp(vals[c.k], c.min, c.max);
      state.labParams[c.k] = v;
      const inp = document.getElementById("ctl-" + c.k);
      const out = document.getElementById("out-" + c.k);
      if (inp) inp.value = v;
      if (out) out.textContent = fmt(v, c.unit);
    });
    drawLab();
  }

  function startLab() {
    if (state.playing) return;
    state.playing = true;
    labStart = performance.now() - labElapsed;
    raf = requestAnimationFrame(tick);
    updatePlayButton();
  }

  function stopLab() {
    if (!state.playing) return;
    state.playing = false;
    cancelAnimationFrame(raf);
    updatePlayButton();
  }

  /* --------------------------------------------------------------- parks */
  const PARK_TABS = [
    { key: "disney", label: "迪士尼", title: "全球迪士尼", note: "6 个度假区 · 12 座乐园" },
    { key: "universal", label: "环球影城", title: "全球环球影城", note: "5 个度假区 · 7 座乐园（含史诗宇宙）" },
    { key: "fantawild", label: "方特", title: "中国方特", note: "按硬件门类归类 · 全国 38 座乐园" },
    { key: "chimelong", label: "长隆", title: "中国长隆集团", note: "珠海宇宙飞船 · 珠海海洋王国 · 广州长隆 · 清远长隆" },
    { key: "oct", label: "华侨城", title: "中国华侨城集团", note: "襄阳奇幻谷 · 东部华侨城 · 全国九大欢乐谷 · 卡乐星球" },
    { key: "merlin", label: "默林集团", title: "英国默林娱乐集团", note: "Alton Towers · Thorpe Park · Chessington · Gardaland · Heide Park · 全球 11 座乐高乐园" },
    { key: "sixflags", label: "六旗与雪松会", title: "美国六旗与雪松会集团", note: "Six Flags · Cedar Point · 诺氏百乐坊 · 国王岛 · 加拿大奇幻乐园等" },
    { key: "dubai", label: "迪拜与阿布扎比", title: "迪拜与阿布扎比", note: "7 座乐园" },
    { key: "genting", label: "云顶天城", title: "云顶天城世界", note: "马来西亚 · 原二十世纪福斯主题乐园" },
    { key: "europe", label: "欧洲四园", title: "欧洲四大暗黑乘骑乐园", note: "Phantasialand · Efteling · Europa-Park · Futuroscope" },
    { key: "eurocoaster", label: "欧洲名园", title: "欧洲六大过山车与电影主题名园", note: "PortAventura · Movieland · Parc Astérix · Liseberg · Alton Towers · Gardaland" }
  ];

  function linkCodes(html) {
    return String(html).replace(/<code>([^<]+)<\/code>/g, (_, inner) =>
      inner
        .split("/")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((c) => (LEAF[c] ? '<a class="code-link" href="#/mechanisms/' + c + '">' + c + "</a>" : '<span class="code-link">' + esc(c) + "</span>"))
        .join(" / ")
    );
  }

  function selectPark(key) {
    state.park = PARKS[key] ? key : "disney";
    const tab = PARK_TABS.find((t) => t.key === state.park);
    $("#park-tabs").innerHTML = PARK_TABS.map((t) => '<a class="chip" role="tab" href="#/parks/' + t.key + '" aria-selected="' + (t.key === state.park) + '">' + t.label + "</a>").join("");
    $("#park-title").textContent = tab.title;
    $("#park-note").textContent = tab.note;
    renderParkTable();
  }

  function renderParkTable() {
    const data = PARKS[state.park];
    const q = state.parkQ.toLowerCase();
    const rows = data.rows.filter((r) => !q || stripTags([r.col1].concat(r.col2, r.col3).join(" ")).toLowerCase().indexOf(q) !== -1);
    $("#park-table").innerHTML = rows.length
      ? '<table class="data-table"><thead><tr>' + data.headers.map((h) => "<th>" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" +
        rows
          .map((r) =>
            '<tr><td class="row-head">' + linkCodes(r.col1) + "</td>" +
            "<td><ul>" + r.col2.map((i) => "<li>" + linkCodes(i) + "</li>").join("") + "</ul></td>" +
            "<td><ul>" + r.col3.map((i) => "<li>" + linkCodes(i) + "</li>").join("") + "</ul></td></tr>")
          .join("") +
        "</tbody></table>"
      : '<div class="empty-state" style="border:0"><h3>没有匹配的内容</h3><p>换个关键词试试。</p></div>';
  }

  /* --------------------------------------------------------------- notes */
  const cleanTitle = (t) => t.replace(/^辨析[一二三四五六]：/, "").replace("终极", "");
  const shortTitle = (t) => cleanTitle(t).split("——")[0].split("（")[0];
  let noteObserver = null;

  function renderNotes() {
    $("#notes-toc").innerHTML = NOTES.map((d, i) => '<a href="#/notes/' + (i + 1) + '"><span class="num">' + pad(i + 1) + "</span><span>" + esc(shortTitle(d.title)) + "</span></a>").join("");
    $("#notes-body").innerHTML = NOTES.map((d, i) => {
      const codes = Array.from(new Set((d.subtitle.match(/T?\d+(?:\.\d+)+/g) || []).filter((c) => LEAF[c])));
      return (
        '<article class="note" id="note-' + (i + 1) + '"><p class="note-num">' + pad(i + 1) + "</p>" +
        '<h2 class="note-title">' + esc(cleanTitle(d.title)) + "</h2>" +
        '<p class="note-sub">' + esc(d.subtitle) + "</p>" +
        '<p class="note-intro">' + esc(d.intro) + "</p>" +
        '<div class="table-wrap"><table class="data-table"><thead><tr>' + d.headers.map((h) => "<th>" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" +
        d.rows.map((row) => "<tr>" + row.map((c) => "<td>" + c + "</td>").join("") + "</tr>").join("") +
        "</tbody></table></div>" +
        '<div class="note-foot"><a class="text-link" href="#/lab/' + (d.labTab + 1) + '">在原理实验室里看' + icon("arrowRight") + "</a>" +
        codes.map((c) => '<a class="text-link" href="#/mechanisms/' + c + '">' + c + " " + esc(LEAF[c].node.short) + "</a>").join("") +
        "</div></article>"
      );
    }).join("");

    if (noteObserver) noteObserver.disconnect();
    if ("IntersectionObserver" in window) {
      noteObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const n = en.target.id.split("-")[1];
            $$("#notes-toc a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#/notes/" + n));
          });
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      $$(".note").forEach((n) => noteObserver.observe(n));
    }
  }

  /* ------------------------------------------------------------ glossary */
  function renderGlossary() {
    const col = (title, items) =>
      '<section class="gloss-col"><h2>' + title + "<small>" + items.length + "</small></h2>" +
      items.map((t, i) => '<div class="gloss-item"><span class="num">' + pad(i + 1) + "</span><h3>" + esc(t.name) + "</h3><p>" + esc(t.desc) + '</p><p class="ex">' + esc(t.ex) + "</p></div>").join("") +
      "</section>";
    $("#glossary").innerHTML = col("视觉呈现", TECH.visual) + col("乘客互动", TECH.interaction);
  }

  /* ------------------------------------------------------------- palette */
  let paletteItems = [];
  let paletteIndex = 0;
  const SUGGESTED = ["forbidden-journey", "fantawild-qiangu", "pirates-shanghai", "indiana-jones", "villa-volta"];

  function openPalette() {
    $("#palette-input").value = "";
    renderPalette("");
    openBackdrop("palette-backdrop");
  }

  function renderPalette(raw) {
    const q = raw.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    const hit = (hay) => terms.every((t) => hay.toLowerCase().indexOf(t) !== -1);
    const groups = [];

    if (!q) {
      groups.push({
        label: "推荐",
        items: SUGGESTED.map((id) => RIDES.find((r) => r.id === id)).filter(Boolean).map((r) => ({ code: r.code, label: r.zh, sub: r.park, go: () => openRide(r.id) }))
      });
      groups.push({
        label: "页面",
        items: [
          { code: "", label: "机制总览", sub: "按支撑与导引方式分类", go: () => (location.hash = "#/mechanisms") },
          { code: "", label: "原理实验室", sub: "六组易混结构的示意图", go: () => (location.hash = "#/lab") },
          { code: "", label: "乐园总表", sub: "69 座乐园逐园盘点", go: () => (location.hash = "#/parks") }
        ]
      });
    } else {
      const rides = RIDES.filter((r) => hit([r.zh, r.en, r.park, r.code, r.mfg || "", GROUP_LABEL[r.g]].join(" "))).slice(0, 7);
      const mechs = LEAVES.filter((e) => hit([e.node.code, e.node.title, e.node.short, e.node.en, e.cat.title].join(" "))).slice(0, 6);
      const parks = PARK_TABS.filter((t) => hit(t.label + " " + t.title + " " + t.note));
      if (rides.length) groups.push({ label: "项目", items: rides.map((r) => ({ code: r.code, label: r.zh, sub: r.park, go: () => openRide(r.id) })) });
      if (mechs.length) groups.push({ label: "机制", items: mechs.map((e) => ({ code: e.node.code, label: e.node.title, sub: e.cat.title, go: () => (location.hash = "#/mechanisms/" + e.node.code) })) });
      if (parks.length) groups.push({ label: "乐园", items: parks.map((t) => ({ code: "", label: t.title, sub: t.note, go: () => (location.hash = "#/parks/" + t.key) })) });
    }

    paletteItems = [];
    paletteIndex = 0;
    const box = $("#palette-results");
    if (!groups.length) {
      box.innerHTML = '<div class="palette-empty">没有找到“' + esc(raw.trim()) + "”相关的内容</div>";
      return;
    }
    box.innerHTML = groups
      .map((g) =>
        '<div class="palette-group">' + g.label + "</div>" +
        g.items
          .map((it) => {
            const i = paletteItems.push(it) - 1;
            return (
              '<button class="palette-item" type="button" role="option" data-pi="' + i + '" aria-selected="' + (i === 0) + '">' +
              '<span class="code">' + esc(it.code) + '</span><span class="label">' + esc(it.label) + '</span><span class="sub">' + esc(it.sub) + "</span></button>"
            );
          })
          .join(""))
      .join("");
  }

  function movePalette(d) {
    if (!paletteItems.length) return;
    paletteIndex = (paletteIndex + d + paletteItems.length) % paletteItems.length;
    $$("#palette-results .palette-item").forEach((b) => b.setAttribute("aria-selected", String(Number(b.dataset.pi) === paletteIndex)));
    const cur = $('#palette-results [data-pi="' + paletteIndex + '"]');
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }

  function choosePalette(i) {
    const it = paletteItems[i];
    if (!it) return;
    closeBackdrop("palette-backdrop");
    it.go();
  }

  /* --------------------------------------------------------------- router */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    const parts = h.split("/");
    return { route: parts[0] || "rides", arg: decodeURIComponent(parts.slice(1).join("/")) };
  }

  function onRoute() {
    const { route, arg } = parseHash();
    ["palette-backdrop", "video-backdrop", "compare-backdrop"].forEach(closeBackdrop);
    if (!(route === "rides" && arg)) {
      state.pushed = false;
      if (state.ride) closeRide();
    }
    switch (route) {
      case "rides":
        showView("rides");
        if (arg) openRide(arg);
        break;
      case "mechanisms": {
        const wasHere = state.view === "mechanisms";
        showView("mechanisms");
        const before = state.mech;
        selectMech(arg || state.mech);
        if (wasHere && before !== state.mech) window.scrollTo(0, 0);
        break;
      }
      case "lab":
        showView("lab");
        selectLab(arg ? Number(arg) - 1 : state.lab);
        break;
      case "parks":
        showView("parks");
        selectPark(arg || state.park);
        break;
      case "notes": {
        showView("notes");
        const el = arg && document.getElementById("note-" + arg);
        if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        break;
      }
      case "glossary":
        showView("glossary");
        break;
      default:
        showView("rides");
    }
  }

  /* --------------------------------------------------------------- events */
  function isTyping(el) {
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
  }

  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const modifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      const play = t.closest("[data-play]");
      if (play) {
        play.closest(".player").innerHTML = embed(play.dataset.play);
        return;
      }
      const vtype = t.closest("[data-vtype]");
      if (vtype) return switchRideVideo(vtype.dataset.vtype);

      const video = t.closest("[data-video]");
      if (video && !modifier) {
        e.preventDefault();
        return openVideo(video.dataset.video, video.dataset.title);
      }
      const uncompare = t.closest("[data-uncompare]");
      if (uncompare) return toggleCompare(uncompare.dataset.uncompare);
      const cmp = t.closest("[data-compare]");
      if (cmp) return toggleCompare(cmp.dataset.compare);

      const ride = t.closest("[data-ride]");
      if (ride && !modifier) {
        e.preventDefault();
        return openRide(ride.dataset.ride);
      }
      const closeBtn = t.closest("[data-close]");
      if (closeBtn) {
        const which = closeBtn.dataset.close;
        if (which === "ride") requestCloseRide();
        else closeBackdrop(which + "-backdrop");
        return;
      }
      if (t.classList && t.classList.contains("backdrop")) {
        if (t.id === "ride-backdrop") requestCloseRide();
        else closeBackdrop(t.id);
        return;
      }
      const action = t.closest("[data-action]");
      if (action) {
        const a = action.dataset.action;
        if (a === "next-fact") { state.fact++; renderFact(); }
        else if (a === "reset-filters") resetFilters();
        else if (a === "lab-play") (state.playing ? stopLab : startLab)();
        else if (a === "lab-reset") { stopLab(); labElapsed = 0; selectLab(state.lab); }
        else if (a === "open-search") openPalette();
        else if (a === "scroll-index") document.getElementById("index").scrollIntoView({ behavior: "smooth" });
        return;
      }
      const grp = t.closest("[data-group]");
      if (grp) { state.group = grp.dataset.group; return renderRides(); }
      const lay = t.closest("[data-layout]");
      if (lay) { state.layout = lay.dataset.layout; store.set("dra-layout", state.layout); return renderRides(); }
      const part = t.closest("[data-part]");
      if (part) {
        state.part = part.dataset.part;
        const firstLeaf = LEAVES.find((x) => x.part.id === state.part);
        location.hash = "#/mechanisms/" + firstLeaf.node.code;
        return;
      }
      const cat = t.closest("[data-toggle-cat]");
      if (cat) {
        const k = cat.dataset.toggleCat;
        state.collapsed[k] = !state.collapsed[k];
        return renderMechNav();
      }
      const lab = t.closest("[data-lab]");
      if (lab) {
        location.hash = "#/lab/" + (Number(lab.dataset.lab) + 1);
        return;
      }
      const pi = t.closest("[data-pi]");
      if (pi) return choosePalette(Number(pi.dataset.pi));
    });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        return $("#palette-backdrop").classList.contains("is-open") ? closeBackdrop("palette-backdrop") : openPalette();
      }
      if (e.key === "/" && !isTyping(e.target) && !$$(".backdrop.is-open").length) {
        e.preventDefault();
        return openPalette();
      }
      if (e.key === "Escape") return closeTop();
      if (e.key === "Enter" && e.target.matches && e.target.matches("tr[data-ride]")) return openRide(e.target.dataset.ride);
    });

    $("#palette-input").addEventListener("input", (e) => renderPalette(e.target.value));
    $("#palette-input").addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); movePalette(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); movePalette(-1); }
      else if (e.key === "Enter") { e.preventDefault(); choosePalette(paletteIndex); }
    });

    $("#filter-q").addEventListener("input", (e) => { state.q = e.target.value.trim(); renderRides(); });
    $("#cat-select").addEventListener("change", (e) => { state.cat = e.target.value; renderRides(); });
    $("#only-lights").addEventListener("change", (e) => { state.onlyLights = e.target.checked; renderRides(); });
    $("#only-demo").addEventListener("change", (e) => { state.onlyDemo = e.target.checked; renderRides(); });
    $("#park-q").addEventListener("input", (e) => { state.parkQ = e.target.value.trim(); renderParkTable(); });
    $("#tray-go").addEventListener("click", openCompare);
    $("#theme-toggle").addEventListener("click", () => {
      theme = theme === "light" ? "dark" : "light";
      store.set("dra-theme", theme);
      applyTheme();
    });

    $("#lab-controls").addEventListener("input", (e) => {
      const k = e.target.dataset.ctl;
      if (!k) return;
      stopLab();
      const c = LAB.modes[state.lab].controls.find((x) => x.k === k);
      state.labParams[k] = Number(e.target.value);
      $("#out-" + k).textContent = fmt(state.labParams[k], c.unit);
      drawLab();
    });

    // Larger YouTube stills are not available for every video; fall back to hqdefault.
    const fixImg = (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement) || !img.dataset.fallback) return;
      if (e.type === "error" || img.naturalWidth <= 120) {
        const fb = img.dataset.fallback;
        delete img.dataset.fallback;
        img.src = fb;
      }
    };
    document.addEventListener("load", fixImg, true);
    document.addEventListener("error", fixImg, true);

    window.addEventListener("hashchange", onRoute);

    // A pool of work light that follows the pointer across the cover and reveals the track drawn under it.
    const cover = $("#cover");
    const track = $(".cover-track");
    if (track && window.matchMedia("(prefers-reduced-motion: reduce)").matches) track.pauseAnimations();
    if (cover && window.matchMedia("(hover: hover)").matches) {
      let pending = 0;
      cover.addEventListener("pointermove", (e) => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          pending = 0;
          const b = cover.getBoundingClientRect();
          cover.style.setProperty("--mx", ((e.clientX - b.left) / b.width) * 100 + "%");
          cover.style.setProperty("--my", ((e.clientY - b.top) / b.height) * 100 + "%");
        });
      });
    }
  }

  /* ----------------------------------------------------------------- init */
  function init() {
    $$("[data-icon]").forEach((el) => (el.outerHTML = icon(el.dataset.icon)));
    $$("[data-brand]").forEach((el) => (el.outerHTML = window.BRAND_MARK));
    applyTheme();
    renderHero();
    renderCatSelect();
    renderRides();
    renderNotes();
    renderGlossary();
    renderTray();
    bind();
    onRoute();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
