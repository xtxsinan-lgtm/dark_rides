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
  const deepClone = (o) => JSON.parse(JSON.stringify(o));

  const RIDES = window.RIDES || [];
  const GROUPS = window.GROUPS || [];
  const VIDEOS = window.VIDEOS || {};
  const MECH = window.MECH;
  const LAB = window.LAB;
  const PARKS = window.PARK_MATRIX_DATA || {};
  let NOTES = window.DISTINCTIONS_DATA || [];
  let TECH = window.TECHNIQUES || { visual: [], interaction: [] };
  let FACTS = window.FACTS || [];

  const LANGS = window.DRA_LANGS || [
    { code: "zh", htmlLang: "zh-CN", dir: "ltr", name: "中文" },
    { code: "en", htmlLang: "en", dir: "ltr", name: "English" },
    { code: "es", htmlLang: "es", dir: "ltr", name: "Español" },
    { code: "fr", htmlLang: "fr", dir: "ltr", name: "Français" },
    { code: "ja", htmlLang: "ja", dir: "ltr", name: "日本語" },
    { code: "ko", htmlLang: "ko", dir: "ltr", name: "한국어" },
    { code: "de", htmlLang: "de", dir: "ltr", name: "Deutsch" },
    { code: "ru", htmlLang: "ru", dir: "ltr", name: "Русский" },
    { code: "ar", htmlLang: "ar", dir: "rtl", name: "العربية" }
  ];
  const CORE = window.DRA_CORE || {};

  /* Snapshot base (zh) data so language switching is 100% reversible */
  RIDES.forEach((r) => {
    r._zh = { zh: r.zh, en: r.en, park: r.park, mfg: r.mfg, text: r.text, note: r.note ? deepClone(r.note) : null };
  });
  GROUPS.forEach((g) => {
    g._zhLabel = g.label;
  });
  MECH.parts.forEach((p) => {
    p._zh = { label: p.label, title: p.title, note: p.note };
    p.cats.forEach((c) => {
      c._zh = { title: c.title, en: c.en, desc: c.desc };
      const snapNode = (n) => {
        if (n.children) {
          n._zhTitle = n.title;
          n.children.forEach(snapNode);
        } else {
          n._zh = {
            short: n.short,
            title: n.title,
            en: n.en,
            support: n.support,
            dof: n.dof,
            mfg: n.mfg,
            text: n.text,
            demoNote: n.demoNote || "",
            parks: deepClone(n.parks || [])
          };
        }
      };
      c.children.forEach(snapNode);
    });
  });
  LAB.modes.forEach((m) => {
    m._zh = {
      t: m.t,
      title: m.title,
      body: m.body,
      controls: m.controls.map((c) => c.label),
      videos: m.videos.map((v) => v.label)
    };
  });
  const BASE_PARKS = deepClone(PARKS);
  const BASE_NOTES = deepClone(NOTES);
  const BASE_TECH = deepClone(TECH);
  const BASE_FACTS = deepClone(FACTS);

  const GROUP_LABEL = {};
  const syncGroupLabels = () => {
    GROUPS.forEach((g) => (GROUP_LABEL[g.key] = g.label));
  };
  syncGroupLabels();

  // Stills: prefer a frame from inside the video (hq1–hq3) over the uploader's thumbnail, which often has text on it.
  const parseBili = (id) => {
    const m = String(id || "").match(/^(BV[0-9A-Za-z]+)(?:_p(\d+))?$/);
    return m ? { bvid: m[1], page: m[2] ? Number(m[2]) : 1 } : null;
  };
  const isBili = (id) => Boolean(parseBili(id));
  const refAttr = (id) => (isBili(id) ? ' referrerpolicy="no-referrer"' : "");
  const frameOf = (id) => (VIDEOS[id] && VIDEOS[id].f ? VIDEOS[id].f.slice(2) : "");
  const still = (id, size) => {
    if (VIDEOS[id] && VIDEOS[id].pic) {
      const p = VIDEOS[id].pic;
      return size === "max" ? p : p + "@640w_360h_1c.jpg";
    }
    const n = frameOf(id);
    const name = { hq: n ? "hq" + n : "hqdefault", sd: n ? "sd" + n : "sddefault", max: n ? "maxres" + n : "maxresdefault" }[size];
    return "https://i.ytimg.com/vi/" + id + "/" + name + ".jpg";
  };
  const thumb = (id) => still(id, "hq");
  const card = (id) => still(id, "sd");
  const big = (id) => still(id, "max");
  const ytUrl = (id) => {
    const b = parseBili(id);
    if (b) return "https://www.bilibili.com/video/" + b.bvid + "/" + (b.page > 1 ? "?p=" + b.page : "");
    return "https://www.youtube.com/watch?v=" + id;
  };
  const ytSearch = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const biliSearch = (q) => "https://search.bilibili.com/all?keyword=" + encodeURIComponent(q);

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

  function detectInitialLang() {
    const m = location.search.match(/[?&]lang=(zh|en|es|fr|ja|ko|de|ru|ar)/);
    if (m) return m[1];
    const saved = store.get("dra-lang", "");
    if (saved && LANGS.some((l) => l.code === saved)) return saved;
    return "zh";
  }

  const state = {
    lang: detectInitialLang(),
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
    labView: "comparisons",
    lab: 0,
    labMech: "1.1.1.1",
    labParams: {},
    playing: false,
    mechParams: {},
    mechPlaying: false,
    park: "disney",
    parkQ: "",
    fact: Math.floor(Math.random() * Math.max(FACTS.length, 1)),
    pushed: false
  };
  MECH.parts.forEach((p) => p.cats.forEach((c) => (state.collapsed[c.key] = true)));

  /* ------------------------------------------------------------------- i18n */
  function uiDict() {
    const c = CORE[state.lang] || CORE.zh || {};
    const fallback = (CORE.zh && CORE.zh.ui) || {};
    return Object.assign({}, fallback, c.ui || {});
  }

  function T(key, vars) {
    const d = uiDict();
    let s = d[key] != null ? d[key] : key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return s;
  }

  function videoTypes() {
    return [
      ["pov", T("vtypePov")],
      ["lights", T("vtypeLights")],
      ["demo", T("vtypeDemo")],
      ["explain", T("vtypeExplain")]
    ];
  }

  function embed(id) {
    const b = parseBili(id);
    if (b) {
      return (
        '<iframe src="https://player.bilibili.com/player.html?bvid=' + b.bvid +
        "&page=" + b.page +
        '&high_quality=1&danmaku=0&autoplay=1" title="Bilibili video player" ' +
        'scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
      );
    }
    return (
      '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + esc(T("ytPlayerTitle")) + '" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    );
  }

  let PARK_TABS = (CORE.zh && CORE.zh.parkTabs) || [
    { key: "disney", label: "迪士尼", title: "全球迪士尼", note: "6 个度假区 · 12 座乐园" },
    { key: "universal", label: "环球影城", title: "全球环球影城", note: "5 个度假区 · 7 座乐园（含史诗宇宙）" },
    { key: "fantawild", label: "方特", title: "中国方特", note: "按硬件门类归类 · 全国 38 座乐园" },
    { key: "chimelong", label: "长隆", title: "中国长隆集团", note: "珠海宇宙飞船 · 珠海海洋王国 · 广州长隆 · 清远长隆" },
    { key: "oct", label: "华侨城", title: "中国华侨城集团", note: "襄阳奇幻谷 · 东部华侨城 · 全国九大欢乐谷 · 卡乐星球" },
    { key: "merlin", label: "默林集团", title: "英国默林娱乐集团", note: "Alton Towers · Thorpe Park · Chessington · Gardaland · Heide Park · 全球 11 座乐高乐园" },
    { key: "sixflags", label: "六旗与雪松会", title: "美国六旗与雪松会集团", note: "Six Flags · Cedar Point · 诺氏百乐坊 · 国王岛 · 加拿大奇幻乐园等" },
    { key: "seaworld", label: "海洋世界集团", title: "海洋世界与布什花园集团", note: "SeaWorld（奥兰多 · 圣地亚哥 · 圣安东尼奥）· Busch Gardens（威廉斯堡 · 坦帕湾）" },
    { key: "na-other", label: "北美其他主题乐园", title: "北美知名区域与独立主题乐园", note: "Dollywood · 银元城 · Lagoon · Knoebels · Kennywood · 圣克鲁兹海滨乐园" },
    { key: "europe", label: "欧洲主题乐园", title: "欧洲八大知名主题乐园", note: "Phantasialand · Efteling · Europa-Park · Futuroscope · PortAventura · Movieland · Parc Astérix · Liseberg" },
    { key: "uae", label: "阿联酋主题乐园", title: "阿联酋主题乐园（迪拜 · 阿布扎比）", note: "Motiongate · IMG 冒险世界 · 亚斯华纳兄弟 · 亚斯法拉利 · 亚斯海洋世界 · 迪拜乐高" },
    { key: "asia-other", label: "亚洲其他知名乐园", title: "亚洲其他知名主题乐园", note: "马来西亚云顶天城 · 韩国乐天世界与爱宝乐园 · 日本西武园与富士急 · 台湾六福村 · 香港海洋公园" }
  ];

  const loadingLocales = {};
  function ensureLocaleLoaded(code, cb) {
    if (code === "zh") return cb();
    if (window.DRA_LOCALES && window.DRA_LOCALES[code]) return cb();
    if (loadingLocales[code]) {
      loadingLocales[code].push(cb);
      return;
    }
    loadingLocales[code] = [cb];
    const s = document.createElement("script");
    s.src = "js/i18n/locale-" + code + ".js";
    const done = () => {
      const list = loadingLocales[code] || [];
      delete loadingLocales[code];
      list.forEach((fn) => fn());
    };
    s.onload = done;
    s.onerror = done;
    document.head.appendChild(s);
  }

  function applyCoreData(code) {
    const c = CORE[code] || CORE.zh;
    if (!c) return;
    const grpMap = c.groups || {};
    GROUPS.forEach((g) => {
      g.label = grpMap[g.key] || g._zhLabel;
    });
    syncGroupLabels();
    if (c.parkTabs) PARK_TABS = c.parkTabs;
    if (c.lab) {
      window.LAB_SVG = code === "zh" ? null : c.lab.svg || null;
      if (c.lab.modes) {
        LAB.modes.forEach((m, i) => {
          const lm = c.lab.modes[i];
          if (!lm) return;
          m.t = lm.t || m._zh.t;
          m.title = lm.title || m._zh.title;
          m.body = lm.body || m._zh.body;
          if (lm.controls) m.controls.forEach((ctl, j) => { if (lm.controls[j]) ctl.label = lm.controls[j]; });
          if (lm.videos) m.videos.forEach((vid, j) => { if (lm.videos[j]) vid.label = lm.videos[j]; });
        });
      }
    }
  }

  function applyDatasetLocale(code) {
    if (code === "zh" || !(window.DRA_LOCALES && window.DRA_LOCALES[code])) {
      RIDES.forEach((r) => {
        r.zh = r._zh.zh;
        r.en = r._zh.en;
        r.park = r._zh.park;
        r.mfg = r._zh.mfg;
        r.text = r._zh.text;
        r.note = r._zh.note ? deepClone(r._zh.note) : null;
      });
      MECH.parts.forEach((p) => {
        p.label = p._zh.label;
        p.title = p._zh.title;
        p.note = p._zh.note;
        p.cats.forEach((c) => {
          c.title = c._zh.title;
          c.en = c._zh.en;
          c.desc = c._zh.desc;
          const restoreNode = (n) => {
            if (n.children) {
              n.title = n._zhTitle;
              n.children.forEach(restoreNode);
            } else {
              Object.assign(n, deepClone(n._zh));
            }
          };
          c.children.forEach(restoreNode);
        });
      });
      Object.keys(BASE_PARKS).forEach((k) => {
        PARKS[k] = deepClone(BASE_PARKS[k]);
      });
      NOTES = deepClone(BASE_NOTES);
      TECH = deepClone(BASE_TECH);
      FACTS = deepClone(BASE_FACTS);
      return;
    }

    const loc = window.DRA_LOCALES[code];
    if (loc.rides) {
      const pMap = loc.rides.parks || {};
      const mMap = loc.rides.mfgs || {};
      const rMap = loc.rides.rides || {};
      RIDES.forEach((r) => {
        const tr = rMap[r.id] || {};
        const primary = tr.title || (code === "en" ? r._zh.en : r._zh.zh);
        r.zh = primary;
        if (code === "en") {
          r.en = primary.toLowerCase() === r._zh.en.toLowerCase() ? "" : r._zh.en;
        } else {
          r.en = primary.toLowerCase() === r._zh.en.toLowerCase() ? "" : r._zh.en;
        }
        r.park = pMap[r._zh.park] || r._zh.park;
        r.mfg = (r._zh.mfg && mMap[r._zh.mfg]) || r._zh.mfg;
        r.text = tr.text || r._zh.text;
        r.note = tr.note || r._zh.note;
      });
    }

    if (loc.mech) {
      const mp = loc.mech.parts || {};
      const mc = loc.mech.cats || {};
      const mb = loc.mech.branches || {};
      const ml = loc.mech.leaves || {};
      MECH.parts.forEach((p) => {
        if (mp[p.id]) {
          p.label = mp[p.id].label || p._zh.label;
          p.title = mp[p.id].title || p._zh.title;
          p.note = mp[p.id].note || p._zh.note;
        }
        p.cats.forEach((c) => {
          if (mc[c.key]) {
            c.title = mc[c.key].title || c._zh.title;
            c.desc = mc[c.key].desc || c._zh.desc;
          }
          const applyNode = (n) => {
            if (n.children) {
              if (mb[n.code]) n.title = mb[n.code];
              n.children.forEach(applyNode);
            } else {
              const l = ml[n.code];
              if (l) {
                n.short = l.short || n._zh.short;
                n.title = l.title || n._zh.title;
                n.en = code === "en" && n.title.toLowerCase() === n._zh.en.toLowerCase() ? "" : n._zh.en;
                n.support = l.support || n._zh.support;
                n.dof = l.dof || n._zh.dof;
                n.mfg = l.mfg || n._zh.mfg;
                n.text = l.text || n._zh.text;
                n.demoNote = l.demoNote != null ? l.demoNote : n._zh.demoNote;
                n.parks = l.parks || n._zh.parks;
              }
            }
          };
          c.children.forEach(applyNode);
        });
      });
    }

    if (loc.parks) {
      Object.keys(loc.parks).forEach((k) => {
        PARKS[k] = loc.parks[k];
      });
    }

    if (loc.distinctions) {
      if (loc.distinctions.distinctions) NOTES = loc.distinctions.distinctions;
      if (loc.distinctions.techniques) TECH = loc.distinctions.techniques;
      if (loc.distinctions.facts) FACTS = loc.distinctions.facts;
    }
  }

  function applyStaticI18n() {
    const meta = LANGS.find((l) => l.code === state.lang) || LANGS[0];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;

    $$("[data-i18n]").forEach((el) => {
      el.textContent = T(el.dataset.i18n);
    });
    $$("[data-i18n-html]").forEach((el) => {
      el.innerHTML = T(el.dataset.i18nHtml);
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = T(el.dataset.i18nPlaceholder);
    });
    $$("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", T(el.dataset.i18nAria));
    });

    const descMeta = $('meta[name="description"]');
    if (descMeta) descMeta.content = T("docDesc");
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = T("docTitle");
    const ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = T("docDesc");

    const cur = $("#lang-current");
    if (cur) cur.textContent = meta.name;
    renderLangMenu();
    applyTheme();
  }

  function renderLangMenu() {
    const menu = $("#lang-menu");
    if (!menu) return;
    menu.innerHTML = LANGS.map(
      (l) =>
        '<button class="lang-option" type="button" role="option" data-lang="' +
        l.code +
        '" aria-selected="' +
        (l.code === state.lang) +
        '"><span>' +
        esc(l.name) +
        '</span><span class="lang-code">' +
        l.code +
        "</span></button>"
    ).join("");
  }

  function toggleLangMenu(forceOpen) {
    const menu = $("#lang-menu");
    const btn = $("#lang-toggle");
    if (!menu || !btn) return;
    const open = forceOpen != null ? forceOpen : menu.hidden;
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }

  function setLang(code) {
    if (!LANGS.some((l) => l.code === code)) code = "zh";
    state.lang = code;
    store.set("dra-lang", code);
    toggleLangMenu(false);
    applyCoreData(code);
    applyStaticI18n();
    ensureLocaleLoaded(code, () => {
      if (state.lang !== code) return;
      applyDatasetLocale(code);
      rerenderAll();
    });
  }

  function rerenderAll() {
    updateDocumentTitle();
    renderHero();
    renderCatSelect();
    renderRides();
    renderMechNav();
    if (state.view === "mechanisms") selectMech(state.mech);
    else if (state.view === "lab") selectLab(state.lab);
    else if (state.view === "parks") selectPark(state.park);
    renderNotes();
    renderGlossary();
    renderTray();
    if (state.ride && $("#ride-backdrop").classList.contains("is-open")) openRide(state.ride.id);
    if ($("#compare-backdrop").classList.contains("is-open")) openCompare();
    if ($("#palette-backdrop").classList.contains("is-open")) renderPalette($("#palette-input").value);
  }

  /* ------------------------------------------------------------------ theme */
  const root = document.documentElement;
  const themeParam = location.search.match(/[?&]theme=(light|dark)/);
  let theme = themeParam ? themeParam[1] : store.get("dra-theme", "dark");

  function applyTheme() {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    const btn = $("#theme-toggle");
    if (!btn) return;
    btn.innerHTML =
      (theme === "light" ? icon("moon") : icon("bulb")) +
      '<span class="label">' +
      esc(theme === "light" ? T("themeDarkLabel") : T("themeLightLabel")) +
      "</span>";
    btn.setAttribute("aria-label", theme === "light" ? T("themeToDarkAria") : T("themeToLightAria"));
    btn.title = theme === "light" ? T("themeDarkTitle") : T("themeLightTitle");
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#f4f2ec" : "#0e0e0d";
  }

  /* ------------------------------------------------------------------ views */
  function viewTitle(name) {
    const map = {
      rides: "",
      mechanisms: T("navMechanisms"),
      lab: T("navLab"),
      parks: T("navParks"),
      notes: T("navNotes"),
      glossary: T("navGlossary")
    };
    return map[name] || "";
  }

  function updateDocumentTitle() {
    const vt = viewTitle(state.view);
    document.title = (vt ? vt + " · " : "") + T("docTitle");
  }

  function showView(name) {
    const changed = state.view !== name;
    state.view = name;
    $$(".view").forEach((v) => (v.hidden = v.dataset.view !== name));
    $$(".site-nav a").forEach((a) => {
      if (a.dataset.route === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    updateDocumentTitle();
    if (name !== "lab") stopLab();
    if (name !== "mechanisms") stopMechInline();
    if (changed) window.scrollTo(0, 0);
    return changed;
  }

  /* ------------------------------------------------------------------- hero */
  function renderHero() {
    const countEl = $("#hero-count");
    if (countEl) {
      countEl.innerHTML = T("heroCountHtml", {
        cats: MECH.parts[0].cats.length,
        mechs: LEAVES.length,
        rides: RIDES.length,
        videos: usedVideos.size
      });
    }
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
      '<figcaption class="plate-caption"><span class="plate-no">' + esc(T("plateFigPrefix")) + " " + pad(i + 1) + " / " + pad(FACTS.length) + "</span>" +
      "<span>" + esc(f.caption) + "</span></figcaption>" +
      '<div class="plate-body"><p class="plate-kicker">' + esc(T("plateKicker")) + "</p>" +
      '<blockquote class="plate-text">' + esc(f.text) + "</blockquote>" +
      '<div class="plate-foot"><a class="text-link" href="#/mechanisms/' + f.code + '"><span class="code">' + f.code + "</span>" + esc(e ? e.node.short : "") + icon("arrowRight") + "</a>" +
      '<button class="plate-shuffle" type="button" data-action="next-fact">' + icon("refresh") + esc(T("plateNext")) + "</button></div></div>";
  }

  /* --------------------------------------------------------------- rides */
  function matches(r, skipGroup) {
    if (!skipGroup && state.group !== "all" && r.g !== state.group) return false;
    if (state.cat !== "all" && catKeyOf(r.code) !== state.cat) return false;
    if (state.onlyLights && !(r.v && r.v.lights)) return false;
    if (state.onlyDemo && !(r.v && (r.v.demo || r.v.explain))) return false;
    if (state.q) {
      const e = LEAF[r.code];
      const hay = [
        r.zh,
        r.en,
        r._zh.zh,
        r._zh.en,
        r.park,
        r._zh.park,
        r.mfg,
        r.code,
        GROUP_LABEL[r.g],
        e ? e.node.title + " " + e.node.short + " " + e.node._zh.title : ""
      ]
        .join(" ")
        .toLowerCase();
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
      if (v.lights) tags.push('<span class="thumb-tag is-lit">' + esc(T("tagLights")) + "</span>");
      if (v.demo) tags.push('<span class="thumb-tag">' + esc(T("tagDemo")) + "</span>");
      media =
        '<div class="thumb"><img loading="lazy" decoding="async"' + refAttr(vid) + ' src="' + card(vid) + '" data-fallback="' + thumb(vid) + '" alt="">' +
        (tags.length ? '<span class="thumb-tags">' + tags.join("") + "</span>" : "") +
        '<span class="thumb-play">' + icon("play") + "</span></div>";
    } else {
      media =
        '<div class="thumb is-empty">' + glyph(catKeyOf(r.code)) +
        '<span class="thumb-empty-note">' + esc(T("noEmbedThumb")) + "</span></div>";
    }
    const on = state.compare.indexOf(r.id) !== -1;
    return (
      '<article class="ride-card">' +
      '<a class="ride-link" href="#/rides/' + r.id + '" data-ride="' + r.id + '">' + media +
      '<div class="ride-body"><p class="ride-meta"><span class="park">' + esc(r.park) + "</span>" +
      (r.year ? '<span class="year">' + r.year + "</span>" : "") + "</p>" +
      '<h3 class="ride-title">' + esc(r.zh) + "</h3>" +
      (r.en ? '<p class="ride-en">' + esc(r.en) + "</p>" : "") +
      (mini ? "" : '<p class="ride-summary">' + esc(r.text) + "</p>") +
      "</div></a>" +
      (mini
        ? ""
        : '<div class="ride-foot"><span class="ride-mech"><span class="code">' + r.code + "</span>" + esc(e ? e.node.short : "") + "</span>" +
          '<button class="compare-toggle" type="button" data-compare="' + r.id + '" aria-pressed="' + on + '">' +
          icon(on ? "check" : "plus") + "<span>" + esc(on ? T("comparedBtn") : T("compareBtn")) + "</span></button></div>") +
      "</article>"
    );
  }

  function rideTable(list) {
    return (
      '<div class="table-wrap"><table class="ride-table"><thead><tr><th>' +
      esc(T("thCode")) +
      "</th><th>" +
      esc(T("thRide")) +
      "</th><th>" +
      esc(T("thPark")) +
      "</th><th>" +
      esc(T("thMfg")) +
      "</th><th>" +
      esc(T("thMedia")) +
      "</th></tr></thead><tbody>" +
      list
        .map((r) => {
          const v = r.v || {};
          return (
            '<tr data-ride="' + r.id + '" tabindex="0"><td class="t-code">' + r.code + "</td>" +
            '<td><span class="t-title">' + esc(r.zh) + "</span>" + (r.en ? '<span class="t-en">' + esc(r.en) + "</span>" : "") + "</td>" +
            '<td class="t-muted">' + esc(r.park) + (r.year ? " · " + r.year : "") + "</td>" +
            '<td class="t-muted">' + esc(r.mfg || "—") + "</td>" +
            '<td><span class="media-marks"><span class="' + (v.pov ? "on" : "") + '">' + esc(T("markPov")) + "</span>" +
            '<span class="' + (v.lights ? "on" : "") + '">' + esc(T("markLights")) + "</span>" +
            '<span class="' + (v.demo || v.explain ? "on" : "") + '">' + esc(T("markDemo")) + "</span></span></td></tr>"
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
    const allLabel = (CORE[state.lang] && CORE[state.lang].groups && CORE[state.lang].groups.all) || "全部";
    $("#group-chips").innerHTML = [{ key: "all", label: allLabel }]
      .concat(GROUPS)
      .map((g) => '<button class="chip" type="button" data-group="' + g.key + '" aria-pressed="' + (state.group === g.key) + '">' + esc(g.label) + '<span class="count">' + (counts[g.key] || 0) + "</span></button>")
      .join("");
  }

  function renderCatSelect() {
    $("#cat-select").innerHTML =
      '<option value="all">' + esc(T("filterAllCats")) + "</option>" +
      MECH.parts.map((p) => '<optgroup label="' + esc(p.label) + '">' + p.cats.map((c) => '<option value="' + c.key + '">' + c.num + " · " + esc(c.title) + "</option>").join("") + "</optgroup>").join("");
    $("#cat-select").value = state.cat;
  }

  function renderRides() {
    renderGroupChips();
    const list = RIDES.filter((r) => matches(r));
    $("#result-count").innerHTML = T("resultCountHtml", { count: list.length, total: RIDES.length });
    $$("#layout-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.layout === state.layout)));
    const box = $("#ride-results");
    if (!list.length) {
      box.className = "ride-grid";
      box.innerHTML =
        '<div class="empty-state"><h3>' + esc(T("emptyRidesTitle")) + "</h3><p>" + esc(T("emptyRidesText")) + '</p><button class="btn" type="button" data-action="reset-filters">' + esc(T("resetFiltersBtn")) + "</button></div>";
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
  function openExternalLabel(id) {
    if (!isBili(id)) return T("openOnYt");
    return state.lang === "zh" ? "在 B 站打开" : T("openOnYt").replace(/YouTube/i, "Bilibili");
  }

  function playerHTML(id, caption) {
    const meta = VIDEOS[id] || {};
    const cap = caption ? '<span class="player-caption">' + esc(caption) + "</span>" : "";
    if (meta.noEmbed) {
      return (
        '<div class="player"><img' + refAttr(id) + ' src="' + big(id) + '" data-fallback="' + thumb(id) + '" alt="">' +
        '<a class="player-start" href="' + ytUrl(id) + '" target="_blank" rel="noopener" aria-label="' + esc(T("watchOnYtAria")) + '"><span class="ring">' + icon("external") + "</span></a>" +
        '<span class="player-caption">' + esc(caption || "") + esc(T("watchOnYtNote")) + "</span></div>"
      );
    }
    return (
      '<div class="player"><img' + refAttr(id) + ' src="' + big(id) + '" data-fallback="' + thumb(id) + '" alt="">' +
      '<button class="player-start" type="button" data-play="' + id + '" aria-label="' + esc(T("playVideoAria")) + '"><span class="ring">' + icon("play") + "</span></button>" + cap + "</div>"
    );
  }

  function emptyPlayer(r) {
    return (
      '<div class="player is-empty"><div>' + glyph(catKeyOf(r.code)) +
      "<p>" + esc(T("emptyPlayerNote")) + "</p><p>" +
      '<a class="text-link" href="' + biliSearch(r.bili || r._zh.zh) + '" target="_blank" rel="noopener">' + esc(T("searchBili")) + "</a> · " +
      '<a class="text-link" href="' + ytSearch(r._zh.en + " ride") + '" target="_blank" rel="noopener">' + esc(T("searchYt")) + "</a></p></div></div>"
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
    const types = videoTypes().filter((t) => r.v && r.v[t[0]]);
    const first = types.length ? types[0][0] : null;
    const on = state.compare.indexOf(r.id) !== -1;
    state.ride = r;

    const tabs = types.length
      ? '<div class="media-tabs">' +
        types.map((t) => '<button class="chip" type="button" data-vtype="' + t[0] + '" aria-selected="' + (t[0] === first) + '">' + esc(t[1]) + "</button>").join("") +
        '<span class="source" id="ride-source">' + sourceLine(r, first) + "</span></div>"
      : "";

    $("#ride-dialog").innerHTML =
      '<button class="dialog-close" type="button" data-close="ride" aria-label="' + esc(T("closeAria")) + '">' + icon("close") + "</button>" +
      '<div id="ride-player">' + (first ? playerHTML(r.v[first], captionFor(r, first)) : emptyPlayer(r)) + "</div>" + tabs +
      '<div class="dialog-body"><div>' +
      (e ? '<a class="dialog-kicker" href="#/mechanisms/' + r.code + '"><span class="code">' + r.code + "</span><span>" + esc(e.node.title) + "</span>" + icon("arrowRight") + "</a>" : "") +
      '<h2 class="dialog-title" id="ride-dialog-title">' + esc(r.zh) + "</h2>" +
      (r.en ? '<p class="dialog-en">' + esc(r.en) + "</p>" : "") +
      '<p class="dialog-summary">' + esc(r.text) + "</p>" +
      '<div class="dialog-actions">' +
      (first
        ? '<a class="btn" id="ride-yt" href="' + ytUrl(r.v[first]) + '" target="_blank" rel="noopener"><span>' + esc(openExternalLabel(r.v[first])) + "</span>" + icon("external") + "</a>"
        : "") +
      '<a class="btn" href="' + biliSearch(r.bili || r._zh.zh) + '" target="_blank" rel="noopener">' + esc(T("searchBili")) + icon("external") + "</a>" +
      '<button class="btn" type="button" data-compare="' + r.id + '" aria-pressed="' + on + '">' + esc(on ? T("comparedBtn") : T("addCompareBtn")) + "</button>" +
      "</div></div>" +
      '<dl class="spec"><dt>' + esc(T("specPark")) + "</dt><dd>" + esc(r.park) + "</dd>" +
      (r.year ? "<dt>" + esc(T("specYear")) + "</dt><dd>" + r.year + "</dd>" : "") +
      (e
        ? "<dt>" + esc(T("specCat")) + "</dt><dd>" + e.cat.num + " · " + esc(e.cat.title) + "</dd>" +
          "<dt>" + esc(T("specSupport")) + "</dt><dd>" + esc(e.node.support) + "</dd>" +
          "<dt>" + esc(T("specDof")) + "</dt><dd>" + esc(e.node.dof) + "</dd>"
        : "") +
      "<dt>" + esc(T("thMfg")) + "</dt><dd>" + esc(r.mfg || "—") + "</dd></dl></div>";

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
    const id = r.v[type];
    const meta = VIDEOS[id] || {};
    const plat = isBili(id) ? "Bilibili" : "YouTube";
    return meta.c ? plat + " · " + esc(meta.c) : plat;
  }

  function switchRideVideo(type) {
    const r = state.ride;
    if (!r || !r.v || !r.v[type]) return;
    $$("#ride-dialog [data-vtype]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.vtype === type)));
    $("#ride-player").innerHTML = playerHTML(r.v[type], captionFor(r, type));
    $("#ride-source").innerHTML = sourceLine(r, type);
    const yt = $("#ride-yt");
    if (yt) {
      yt.href = ytUrl(r.v[type]);
      const sp = yt.querySelector("span");
      if (sp) sp.textContent = openExternalLabel(r.v[type]);
    }
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
      '<button class="dialog-close" type="button" data-close="video" aria-label="' + esc(T("closeAria")) + '">' + icon("close") + "</button>" +
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
      if (b.classList.contains("compare-toggle")) b.innerHTML = icon(on ? "check" : "plus") + "<span>" + esc(on ? T("comparedBtn") : T("compareBtn")) + "</span>";
      else b.textContent = on ? T("comparedBtn") : T("addCompareBtn");
    });
  }

  function renderTray() {
    const n = state.compare.length;
    $("#compare-tray").classList.toggle("is-visible", n > 0);
    $("#tray-items").innerHTML = state.compare
      .map((id) => {
        const r = RIDES.find((x) => x.id === id);
        return '<span class="tray-item">' + esc(r.zh) + '<button type="button" data-uncompare="' + id + '" aria-label="' + esc(T("trayRemoveAria")) + '">' + icon("close") + "</button></span>";
      })
      .join("");
    const go = $("#tray-go");
    go.disabled = n < 2;
    go.textContent = n < 2 ? T("trayPickMore") : T("trayCompareN", { n: n });
  }

  function openCompare() {
    const rs = state.compare.map((id) => RIDES.find((r) => r.id === id)).filter(Boolean);
    if (rs.length < 2) return;
    const leaf = (r) => LEAF[r.code] || { node: {}, cat: {} };
    const rows = [
      [T("specPark"), (r) => esc(r.park)],
      [T("specYear"), (r) => r.year || "—"],
      [T("specMech"), (r) => '<a class="code-link" href="#/mechanisms/' + r.code + '">' + r.code + "</a> " + esc(leaf(r).node.title || "")],
      [T("specSupport"), (r) => esc(leaf(r).node.support || "—")],
      [T("specDof"), (r) => esc(leaf(r).node.dof || "—")],
      [T("thMfg"), (r) => esc(r.mfg || "—")],
      [T("specSummary"), (r) => esc(r.text)]
    ];
    $("#compare-dialog").innerHTML =
      '<div class="dialog-head"><h2>' + esc(T("compareDialogTitle")) + '</h2><button class="dialog-close" type="button" data-close="compare" aria-label="' + esc(T("closeAria")) + '">' + icon("close") + "</button></div>" +
      '<div class="compare-body"><div class="table-wrap"><table class="data-table"><thead><tr><th></th>' +
      rs.map((r) => "<th>" + (firstVideo(r) ? '<img src="' + thumb(firstVideo(r)) + '" alt="">' : "") + esc(r.zh) + "</th>").join("") +
      "</tr></thead><tbody>" +
      rows.map((row) => "<tr><td>" + esc(row[0]) + "</td>" + rs.map((r) => "<td>" + row[1](r) + "</td>").join("") + "</tr>").join("") +
      "</tbody></table></div></div>";
    openBackdrop("compare-backdrop");
  }

  /* ---------------------------------------------------------- mechanisms */
  function renderMechNav() {
    const part = MECH.parts.find((p) => p.id === state.part) || MECH.parts[0];
    $("#part-switch").innerHTML = MECH.parts
      .map((p) => '<button type="button" data-part="' + p.id + '" aria-pressed="' + (p.id === part.id) + '">' + esc(p.label) + "</button>")
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

  let mechRaf = 0;
  let mechFrame = 0;
  let mechStart = 0;
  let mechElapsed = 0;

  function renderMechControls(code) {
    const m = LAB.mechs[code] || LAB.mechs["1.1.1.1"];
    const controls = m.controls || [];
    const box = $("#mech-inline-controls");
    if (!box) return;
    box.innerHTML =
      controls
        .map((c) =>
          '<div class="range-field"><label for="mctl-' + c.k + '"><span>' + esc(c.label) + '</span><output id="mout-' + c.k + '">' + fmt(state.mechParams[c.k], c.unit) + "</output></label>" +
          '<input id="mctl-' + c.k + '" type="range" min="' + c.min + '" max="' + c.max + '" step="1" value="' + state.mechParams[c.k] + '" data-mctl="' + c.k + '"></div>')
        .join("") +
      '<div class="lab-buttons"><button class="btn btn-sm" type="button" data-action="mech-play" id="mech-play"></button>' +
      '<button class="btn btn-sm" type="button" data-action="mech-reset">' + icon("refresh") + esc(T("labReset")) + "</button></div>";
    updateMechPlayButton();
  }

  function updateMechPlayButton() {
    const b = $("#mech-play");
    if (b) b.innerHTML = state.mechPlaying ? icon("pause") + esc(T("labPause")) : icon("play") + esc(T("labAutoPlay"));
  }

  function drawMechInline() {
    const canvas = $("#mech-inline-canvas");
    if (canvas) canvas.innerHTML = LAB.renderMech(state.mech, state.mechParams);
  }

  function mechTick(now) {
    mechRaf = requestAnimationFrame(mechTick);
    if ((mechFrame++ & 1) === 1) return;
    mechElapsed = now - mechStart;
    const m = LAB.mechs[state.mech] || LAB.mechs["1.1.1.1"];
    const vals = m.auto(mechElapsed / 1000);
    m.controls.forEach((c) => {
      const v = clamp(vals[c.k], c.min, c.max);
      state.mechParams[c.k] = v;
      const inp = document.getElementById("mctl-" + c.k);
      const out = document.getElementById("mout-" + c.k);
      if (inp) inp.value = v;
      if (out) out.textContent = fmt(v, c.unit);
    });
    drawMechInline();
  }

  function startMechInline() {
    if (state.mechPlaying) return;
    state.mechPlaying = true;
    mechStart = performance.now() - mechElapsed;
    mechRaf = requestAnimationFrame(mechTick);
    updateMechPlayButton();
  }

  function stopMechInline() {
    if (!state.mechPlaying) return;
    state.mechPlaying = false;
    cancelAnimationFrame(mechRaf);
    updateMechPlayButton();
  }

  function renderMechArticle(e) {
    stopMechInline();
    mechElapsed = 0;
    const n = e.node;
    state.mech = n.code;
    state.mechParams = {};
    const mDef = LAB.mechs[n.code] || LAB.mechs["1.1.1.1"];
    mDef.controls.forEach((c) => (state.mechParams[c.k] = c.v));

    const crumbs = [e.part.title, e.cat.num + " · " + e.cat.title].concat(e.path.map((b) => b.code + " " + b.title));
    const related = ridesFor(n.code);
    let video = null;
    if (n.demo) video = { id: n.demo, caption: n.demoNote };
    else {
      const r = related.find((x) => x.v && x.v.pov);
      if (r) video = { id: r.v.pov, caption: T("mechRelatedVideoPrefix") + r.zh };
    }
    const prev = LEAVES[e.index - 1];
    const next = LEAVES[e.index + 1];

    const dists = NOTES.filter((d) => (d.subtitle && d.subtitle.indexOf(n.code) !== -1) || (d.rows && d.rows.some((r) => r.some((c) => c && c.indexOf(n.code) !== -1))));

    $("#mech-article").innerHTML =
      '<nav class="crumbs" aria-label="' + esc(T("crumbsAria")) + '">' + crumbs.map((c) => "<span>" + esc(c) + "</span>").join("") + "</nav>" +
      '<p class="article-code">' + n.code + "</p>" +
      '<h2 class="article-title">' + esc(n.title) + "</h2>" +
      (n.en ? '<p class="article-en">' + esc(n.en) + "</p>" : "") +
      '<p class="article-lede">' + esc(n.text) + "</p>" +
      '<dl class="spec-grid"><div><dt>' + esc(T("specSupport")) + "</dt><dd>" + esc(n.support) + "</dd></div>" +
      "<div><dt>" + esc(T("specDof")) + "</dt><dd>" + esc(n.dof) + "</dd></div>" +
      "<div><dt>" + esc(T("specMfg")) + "</dt><dd>" + esc(n.mfg) + "</dd></div></dl>" +
      '<section class="article-section mech-lab-box">' +
        '<div class="mech-lab-head">' +
          '<h3 class="article-h">' + esc(T("mechBlueprintTitle", "可交互工程原理图")) + '</h3>' +
          '<div style="display:flex;gap:12px;align-items:center;">' +
            '<span class="mech-lab-badge">' + icon("gear") + esc(T("mechLabInteractiveBadge", "60fps 可交互模拟")) + '</span>' +
            '<a class="text-link" href="#/lab/' + n.code + '">' + esc(T("mechOpenInLab", "在原理实验室打开")) + icon("arrowRight") + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="lab-sheet mech-inline-sheet">' +
          '<div class="lab-canvas" id="mech-inline-canvas">' + LAB.renderMech(n.code, state.mechParams) + '</div>' +
          '<div class="title-block"><span><small>' + esc(T("labTbNo")) + '</small>MECH–' + n.code + '</span><span><small>' + esc(T("labTbScale")) + '</small>' + esc(T("labTbScaleVal")) + '</span><span><small>DOF</small>' + esc(n.dof) + '</span></div>' +
        '</div>' +
        '<div class="lab-controls mech-inline-controls" id="mech-inline-controls"></div>' +
        (dists.length
          ? '<div class="mech-dist-links"><span class="dist-label">' + esc(T("mechRelatedDistinctions", "关联工程辨析：")) + '</span>' +
            dists.map((d) => '<a class="text-link" href="#/notes/' + (NOTES.indexOf(d) + 1) + '">' + esc(shortTitle(d.title)) + ' →</a>').join("") +
            '</div>'
          : '') +
      '</section>' +
      (video
        ? '<figure class="article-video">' + playerHTML(video.id, "") +
          "<figcaption><span>" + esc(video.caption || "") + "</span><span>" + (VIDEOS[video.id] && VIDEOS[video.id].c ? (isBili(video.id) ? "Bilibili · " : "YouTube · ") + esc(VIDEOS[video.id].c) : "") + "</span></figcaption></figure>"
        : "") +
      '<section class="article-section"><h3 class="article-h">' + esc(T("mechParkSectionTitle")) + '</h3><dl class="park-rows">' +
      n.parks.map((p) => '<div class="park-row"><dt>' + esc(p[0]) + "</dt><dd>" + esc(p[1]) + "</dd></div>").join("") +
      "</dl></section>" +
      (related.length
        ? '<section class="article-section"><h3 class="article-h">' + esc(T("mechRelatedTitle")) + "<small>" + esc(T("mechRelatedCount", { count: related.length })) + "</small></h3>" +
          '<div class="mini-grid">' + related.map((r) => rideCard(r, true)).join("") + "</div></section>"
        : "") +
      '<nav class="pager" aria-label="' + esc(T("pagerAria")) + '">' +
      (prev ? '<a href="#/mechanisms/' + prev.node.code + '"><small>' + esc(T("pagerPrev")) + '</small><span class="code">' + prev.node.code + "</span>" + esc(prev.node.short) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="#/mechanisms/' + next.node.code + '"><small>' + esc(T("pagerNext")) + '</small><span class="code">' + next.node.code + "</span>" + esc(next.node.short) + "</a>" : "") +
      "</nav>";

    renderMechControls(n.code);
  }

  /* ----------------------------------------------------------------- lab */
  let raf = 0;
  let frame = 0;
  let labStart = 0;
  let labElapsed = 0;

  const fmt = (v, unit) => Math.round(v) + unit;

  function renderLabList() {
    const btns = $$("#lab-mode-switch button");
    btns.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.labMode === state.labView)));

    if (state.labView === "comparisons") {
      $("#lab-list").innerHTML = LAB.modes
        .map((m, i) =>
          '<button class="lab-item" type="button" role="tab" data-lab="' + i + '" aria-selected="' + (i === state.lab) + '">' +
          '<span class="num">' + pad(i + 1) + '</span><span class="t">' + esc(m.t) + '</span><span class="s">' + esc(m.s) + "</span></button>")
        .join("");
    } else {
      $("#lab-list").innerHTML = LEAVES
        .map((e) =>
          '<button class="lab-item" type="button" role="tab" data-lab-mech="' + e.node.code + '" aria-selected="' + (e.node.code === state.labMech) + '">' +
          '<span class="num">' + e.node.code + '</span><span class="t">' + esc(e.node.short) + '</span><span class="s">' + esc(e.cat.title) + "</span></button>")
        .join("");
    }
  }

  function selectLab(i) {
    stopLab();
    state.labView = "comparisons";
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
      "<span><small>" + esc(T("labTbNo")) + "</small>DRA–" + pad(i + 1) + "</span>" +
      "<span><small>" + esc(T("labTbScale")) + "</small>" + esc(T("labTbScaleVal")) + "</span>" +
      "<span><small>" + esc(T("labTbVs")) + "</small>" + esc(m.s) + "</span>";
  }

  function selectLabMech(code) {
    stopLab();
    state.labView = "atlas";
    if (!LAB.mechs[code]) code = "1.1.1.1";
    state.labMech = code;
    const m = LAB.mechs[code];
    state.labParams = {};
    m.controls.forEach((c) => (state.labParams[c.k] = c.v));
    renderLabList();
    renderLabControls();
    drawLab();
    renderLabNotes();
    const leaf = LEAF[code];
    $("#lab-tb").innerHTML =
      "<span><small>" + esc(T("labTbNo")) + "</small>MECH–" + code + "</span>" +
      "<span><small>" + esc(T("labTbScale")) + "</small>" + esc(T("labTbScaleVal")) + "</span>" +
      "<span><small>DOF</small>" + esc(leaf ? leaf.node.dof : "多自由度") + "</span>";
  }

  function drawLab() {
    if (state.labView === "comparisons") {
      $("#lab-canvas").innerHTML = LAB.render(state.lab, state.labParams);
    } else {
      $("#lab-canvas").innerHTML = LAB.renderMech(state.labMech, state.labParams);
    }
  }

  function renderLabControls() {
    const m = state.labView === "comparisons" ? LAB.modes[state.lab] : LAB.mechs[state.labMech];
    $("#lab-controls").innerHTML =
      m.controls
        .map((c) =>
          '<div class="range-field"><label for="ctl-' + c.k + '"><span>' + esc(c.label) + '</span><output id="out-' + c.k + '">' + fmt(state.labParams[c.k], c.unit) + "</output></label>" +
          '<input id="ctl-' + c.k + '" type="range" min="' + c.min + '" max="' + c.max + '" step="1" value="' + state.labParams[c.k] + '" data-ctl="' + c.k + '"></div>')
        .join("") +
      '<div class="lab-buttons"><button class="btn btn-sm" type="button" data-action="lab-play" id="lab-play"></button>' +
      '<button class="btn btn-sm" type="button" data-action="lab-reset">' + icon("refresh") + esc(T("labReset")) + "</button></div>";
    updatePlayButton();
  }

  function renderLabNotes() {
    if (state.labView === "comparisons") {
      const m = LAB.modes[state.lab];
      $("#lab-notes").innerHTML =
        '<div><p class="eyebrow">' + pad(state.lab + 1) + " · " + esc(m.s) + "</p><h2>" + esc(m.title) + "</h2><p>" + esc(m.body) + "</p>" +
        '<div class="links">' +
        m.links.map((c) => '<a class="text-link" href="#/mechanisms/' + c + '">' + c + " " + esc(LEAF[c] ? LEAF[c].node.short : "") + "</a>").join("") +
        '<a class="text-link" href="#/notes/' + (m.note + 1) + '">' + esc(T("labReadNote")) + icon("arrowRight") + "</a></div></div>" +
        '<div><p class="eyebrow" style="margin-bottom:10px">' + esc(T("labRelatedVideos")) + '</p><div class="video-list">' +
        m.videos
          .map((v) =>
            '<button class="video-row" type="button" data-video="' + v.id + '" data-title="' + esc(v.label) + '">' +
            '<img src="' + thumb(v.id) + '" alt="" loading="lazy"><span><span class="vt">' + esc(v.label) + '</span><span class="vs">' + esc(VIDEOS[v.id] ? VIDEOS[v.id].c : "") + "</span></span></button>")
          .join("") +
        "</div></div>";
    } else {
      const leaf = LEAF[state.labMech];
      const n = leaf ? leaf.node : { code: state.labMech, title: "", text: "", support: "", dof: "", mfg: "" };
      const dists = NOTES.filter((d) => (d.subtitle && d.subtitle.indexOf(n.code) !== -1) || (d.rows && d.rows.some((r) => r.some((c) => c && c.indexOf(n.code) !== -1))));
      const related = ridesFor(n.code);
      $("#lab-notes").innerHTML =
        '<div><p class="eyebrow">' + n.code + ' · ' + esc(leaf ? leaf.cat.title : "") + '</p><h2>' + esc(n.title) + '</h2><p>' + esc(n.text) + '</p>' +
        '<div class="links">' +
        '<a class="text-link" href="#/mechanisms/' + n.code + '">' + esc(T("heroBtnMech")) + ' (' + n.code + ') ' + icon("arrowRight") + '</a>' +
        dists.map((d) => '<a class="text-link" href="#/notes/' + (NOTES.indexOf(d) + 1) + '">' + esc(shortTitle(d.title)) + icon("arrowRight") + '</a>').join("") +
        '</div></div>' +
        '<div><p class="eyebrow" style="margin-bottom:10px">' + esc(T("mechRelatedTitle")) + ' (' + related.length + ')</p><div class="video-list">' +
        (related.length
          ? related.slice(0, 4).filter((r) => r.v && firstVideo(r))
            .map((r) => {
              const vid = firstVideo(r);
              return '<button class="video-row" type="button" data-video="' + vid + '" data-title="' + esc(r.zh) + '">' +
                '<img src="' + thumb(vid) + '" alt="" loading="lazy"><span><span class="vt">' + esc(r.zh) + '</span><span class="vs">' + esc(r.park) + '</span></span></button>';
            })
            .join("")
          : '<p style="font-size:13px;color:var(--text-3);">' + esc(T("emptyParksText")) + '</p>') +
        '</div></div>';
    }
  }

  function updatePlayButton() {
    const b = $("#lab-play");
    if (b) b.innerHTML = state.playing ? icon("pause") + esc(T("labPause")) : icon("play") + esc(T("labAutoPlay"));
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if ((frame++ & 1) === 1) return;
    labElapsed = now - labStart;
    const m = state.labView === "comparisons" ? LAB.modes[state.lab] : LAB.mechs[state.labMech];
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

  const PARK_ALIASES = { dubai: "uae", genting: "asia-other", eurocoaster: "europe", other: "seaworld" };
  function selectPark(key) {
    const resolved = PARK_ALIASES[key] || key;
    state.park = PARKS[resolved] ? resolved : "disney";
    const tab = PARK_TABS.find((t) => t.key === state.park) || PARK_TABS[0];
    $("#park-tabs").innerHTML = PARK_TABS.map((t) => '<a class="chip" role="tab" href="#/parks/' + t.key + '" aria-selected="' + (t.key === state.park) + '">' + esc(t.label) + "</a>").join("");
    $("#park-title").textContent = tab.title;
    $("#park-note").textContent = tab.note;
    renderParkTable();
  }

  function renderParkTable() {
    const data = PARKS[state.park];
    if (!data) return;
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
      : '<div class="empty-state" style="border:0"><h3>' + esc(T("emptyParksTitle")) + "</h3><p>" + esc(T("emptyParksText")) + "</p></div>";
  }

  /* --------------------------------------------------------------- notes */
  const cleanTitle = (t) => String(t).replace(/^(辨析[一二三四五六七八九十百\d]+|Distinction\s*\d+|Distinción\s*\d+|Distinction\s*[IVX\d]+|Различие\s*\d+|التمييز\s*\S+|구분\s*\d+|検証\s*\d+|Unterscheidung\s*\d+)\s*[：:—–-]\s*/i, "").replace("终极", "");
  const shortTitle = (t) => cleanTitle(t).split("——")[0].split(" — ")[0].split("（")[0].split(" (")[0];
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
        '<div class="note-schematic-wrap"><div class="lab-sheet note-lab-sheet">' +
        '<div class="lab-canvas">' + LAB.render(d.labTab, {}) + '</div>' +
        '<div class="title-block"><span><small>' + esc(T("labTbNo")) + '</small>DRA–' + pad(d.labTab + 1) + '</span><span><small>' + esc(T("labTbScale")) + '</small>' + esc(T("labTbScaleVal")) + '</span><span><small>' + esc(T("labTbVs")) + '</small>' + esc(LAB.modes[d.labTab] ? LAB.modes[d.labTab].s : "") + '</span>' +
        '<a href="#/lab/' + (d.labTab + 1) + '" style="margin-left:auto;padding:8px 14px;color:var(--accent);font-weight:500;">' + esc(T("notesSeeLab")) + " " + icon("arrowRight") + "</a>" +
        '</div></div></div>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr>' + d.headers.map((h) => "<th>" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" +
        d.rows.map((row) => "<tr>" + row.map((c) => "<td>" + c + "</td>").join("") + "</tr>").join("") +
        "</tbody></table></div>" +
        '<div class="note-foot"><a class="text-link" href="#/lab/' + (d.labTab + 1) + '">' + esc(T("notesSeeLab")) + icon("arrowRight") + "</a>" +
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
      '<section class="gloss-col"><h2>' + esc(title) + "<small>" + items.length + "</small></h2>" +
      items.map((t, i) => '<div class="gloss-item"><span class="num">' + pad(i + 1) + "</span><h3>" + esc(t.name) + "</h3><p>" + esc(t.desc) + '</p><p class="ex">' + esc(t.ex) + "</p></div>").join("") +
      "</section>";
    $("#glossary").innerHTML = col(T("glossaryVisualTitle"), TECH.visual || []) + col(T("glossaryInteractionTitle"), TECH.interaction || []);
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
        label: T("paletteGroupSuggested"),
        items: SUGGESTED.map((id) => RIDES.find((r) => r.id === id)).filter(Boolean).map((r) => ({ code: r.code, label: r.zh, sub: r.park, go: () => openRide(r.id) }))
      });
      groups.push({
        label: T("paletteGroupPages"),
        items: [
          { code: "", label: T("paletteMechTitle"), sub: T("paletteMechSub"), go: () => (location.hash = "#/mechanisms") },
          { code: "", label: T("paletteLabTitle"), sub: T("paletteLabSub"), go: () => (location.hash = "#/lab") },
          { code: "", label: T("paletteParksTitle"), sub: T("paletteParksSub"), go: () => (location.hash = "#/parks") }
        ]
      });
    } else {
      const rides = RIDES.filter((r) => hit([r.zh, r.en, r._zh.zh, r._zh.en, r.park, r._zh.park, r.code, r.mfg || "", GROUP_LABEL[r.g]].join(" "))).slice(0, 7);
      const mechs = LEAVES.filter((e) => hit([e.node.code, e.node.title, e.node.short, e.node.en, e.node._zh.title, e.cat.title].join(" "))).slice(0, 6);
      const parks = PARK_TABS.filter((t) => hit(t.label + " " + t.title + " " + t.note));
      if (rides.length) groups.push({ label: T("navRides"), items: rides.map((r) => ({ code: r.code, label: r.zh, sub: r.park, go: () => openRide(r.id) })) });
      if (mechs.length) groups.push({ label: T("navMechanisms"), items: mechs.map((e) => ({ code: e.node.code, label: e.node.title, sub: e.cat.title, go: () => (location.hash = "#/mechanisms/" + e.node.code) })) });
      if (parks.length) groups.push({ label: T("navParks"), items: parks.map((t) => ({ code: "", label: t.title, sub: t.note, go: () => (location.hash = "#/parks/" + t.key) })) });
    }

    paletteItems = [];
    paletteIndex = 0;
    const box = $("#palette-results");
    if (!groups.length) {
      box.innerHTML = '<div class="palette-empty">' + esc(T("paletteEmpty", { q: raw.trim() })) + "</div>";
      return;
    }
    box.innerHTML = groups
      .map((g) =>
        '<div class="palette-group">' + esc(g.label) + "</div>" +
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
        if (arg) {
          if (LAB.mechs[arg] || LEAF[arg]) selectLabMech(arg);
          else selectLab(Number(arg) - 1);
        } else {
          if (state.labView === "atlas") selectLabMech(state.labMech);
          else selectLab(state.lab);
        }
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

      const langOpt = t.closest("[data-lang]");
      if (langOpt) {
        setLang(langOpt.dataset.lang);
        return;
      }
      if (t.closest("#lang-toggle")) {
        toggleLangMenu();
        return;
      }
      if (!t.closest("#lang-picker")) {
        toggleLangMenu(false);
      }

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
        else if (a === "mech-play") (state.mechPlaying ? stopMechInline : startMechInline)();
        else if (a === "mech-reset") { stopMechInline(); mechElapsed = 0; selectMech(state.mech); }
        else if (a === "lab-play") (state.playing ? stopLab : startLab)();
        else if (a === "lab-reset") { stopLab(); labElapsed = 0; if (state.labView === "comparisons") selectLab(state.lab); else selectLabMech(state.labMech); }
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
      const labMode = t.closest("[data-lab-mode]");
      if (labMode) {
        const mode = labMode.dataset.labMode;
        if (mode === "comparisons") selectLab(state.lab);
        else selectLabMech(state.labMech);
        return;
      }
      const labMech = t.closest("[data-lab-mech]");
      if (labMech) {
        location.hash = "#/lab/" + labMech.dataset.labMech;
        return;
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
      if (e.key === "Escape") {
        if ($("#lang-menu") && !$("#lang-menu").hidden) {
          toggleLangMenu(false);
          return;
        }
        return closeTop();
      }
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
      const m = state.labView === "comparisons" ? LAB.modes[state.lab] : LAB.mechs[state.labMech];
      const c = m.controls.find((x) => x.k === k);
      state.labParams[k] = Number(e.target.value);
      const out = document.getElementById("out-" + k);
      if (out && c) out.textContent = fmt(state.labParams[k], c.unit);
      drawLab();
    });

    $("#mech-article").addEventListener("input", (e) => {
      const k = e.target.dataset.mctl;
      if (!k) return;
      stopMechInline();
      const m = LAB.mechs[state.mech] || LAB.mechs["1.1.1.1"];
      const c = m.controls.find((x) => x.k === k);
      state.mechParams[k] = Number(e.target.value);
      const out = document.getElementById("mout-" + k);
      if (out && c) out.textContent = fmt(state.mechParams[k], c.unit);
      drawMechInline();
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
    applyCoreData(state.lang);
    applyStaticI18n();
    renderHero();
    renderCatSelect();
    renderRides();
    renderNotes();
    renderGlossary();
    renderTray();
    bind();
    onRoute();
    if (state.lang !== "zh") {
      ensureLocaleLoaded(state.lang, () => {
        applyDatasetLocale(state.lang);
        rerenderAll();
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
