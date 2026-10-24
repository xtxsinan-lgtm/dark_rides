#!/usr/bin/env node
/**
 * Apply i18n audit fixes to core.js and locale-*.js
 */
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function loadCore() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js/i18n/core.js"), "utf8"), ctx);
  return { langs: ctx.window.DRA_LANGS, core: ctx.window.DRA_CORE };
}

function loadLocale(code) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js/i18n/locale-" + code + ".js"), "utf8"), ctx);
  return ctx.window.DRA_LOCALES[code];
}

function writeCore(langs, core) {
  const out =
    "/* Dark Ride Atlas — Core i18n dictionary (9 languages) */\n" +
    "window.DRA_LANGS = " +
    JSON.stringify(langs) +
    ";\n" +
    "window.DRA_CORE = " +
    JSON.stringify(core) +
    ";\n";
  fs.writeFileSync(path.join(ROOT, "js/i18n/core.js"), out);
}

function writeLocale(code, data) {
  const out =
    "window.DRA_LOCALES = window.DRA_LOCALES || {};\n" +
    'window.DRA_LOCALES["' +
    code +
    '"] = ' +
    JSON.stringify(data) +
    ";\n";
  fs.writeFileSync(path.join(ROOT, "js/i18n/locale-" + code + ".js"), out);
}

function deepReplace(obj, replacers) {
  if (typeof obj === "string") {
    let s = obj;
    for (const [from, to] of replacers) {
      if (s.includes(from)) s = s.split(from).join(to);
    }
    return s;
  }
  if (Array.isArray(obj)) return obj.map((x) => deepReplace(x, replacers));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = deepReplace(v, replacers);
    return out;
  }
  return obj;
}

const { langs, core } = loadCore();

const lab12 = {
  en: {
    c3Desc: "12 side-by-side comparisons & all 55 mechanism blueprints",
    labPageTitle: "12 Side-by-Side Comparisons & All 55 Mechanism Blueprints",
  },
  es: {
    c3Desc:
      "12 comparaciones lado a lado y los 55 esquemas interactivos de mecanismos",
    labPageTitle: "12 comparaciones lado a lado y los 55 mecanismos en diagramas",
  },
  fr: {
    c3Desc:
      "12 comparaisons côte à côte et les 55 schémas interactifs de mécanismes",
    labPageTitle: "12 comparaisons côte à côte et atlas des 55 mécanismes",
  },
  ja: {
    c3Desc: "12組の構造比較と全55種機構インタラクティブ図面",
    labPageTitle: "12組の比較実験と全55種機構インタラクティブ図面",
  },
  ko: {
    c3Desc: "12쌍의 혼동하기 쉬운 구조 비교와 55종 메커니즘 전체 도해",
    labPageTitle: "12쌍의 구조 비교와 55종 메커니즘 전체 도해",
  },
  de: {
    c3Desc: "12 Vergleichspaare und alle 55 Mechanismen als interaktive Schemata",
    labPageTitle: "12 Vergleichspaare und alle 55 Mechanismen im Überblick",
  },
  ru: {
    c3Desc: "12 пар сравнений и все 55 механизмов на интерактивных схемах",
    labPageTitle: "12 пар сравнений и полный атлас 55 механизмов",
  },
  ar: {
    c3Desc: "12 مقارنة متجاورة ومخططات تفاعلية لجميع آليات الـ55",
    labPageTitle: "12 مقارنة متجاورة وأطلس الـ55 آلية",
  },
};

const uiPatches = {
  en: {
    brandSub: "An Illustrated Guide to Dark Rides",
    navRides: "Attractions",
    heroBtnBrowse: "Browse attractions",
    notesPageTitle: "Alike in the Dark, Different Under the Hood",
    c5Desc:
      "12 pairs of ride systems that look alike in the dark—and how they differ mechanically",
    vtypeExplain: "How it works",
    themeLightLabel: "Lights On",
    themeDarkLabel: "Lights Off",
    themeLightTitle: "Lights on (light theme)",
    themeDarkTitle: "Lights off (dark theme)",
    themeToLightAria: "Switch to light theme",
    themeToDarkAria: "Switch to dark theme",
    ...lab12.en,
  },
  es: {
    navRides: "Atracciones",
    heroBtnBrowse: "Explorar atracciones",
    notesPageTitle: "Iguales a oscuras, distintas por dentro",
    c5Desc:
      "12 pares de sistemas que parecen idénticos a oscuras pero difieren en su ingeniería",
    themeLightLabel: "Luces encendidas",
    themeDarkLabel: "Luces apagadas",
    themeLightTitle: "Luces encendidas (tema claro)",
    themeDarkTitle: "Luces apagadas (tema oscuro)",
    ...lab12.es,
  },
  fr: {
    brandSub: "Atlas des dark rides",
    navRides: "Attractions",
    c5Desc:
      "12 paires de systèmes semblables dans le noir, d’architecture mécanique différente",
    themeLightLabel: "Lumières allumées",
    themeDarkLabel: "Lumières éteintes",
    themeLightTitle: "Lumières allumées (thème clair)",
    themeDarkTitle: "Lumières éteintes (thème sombre)",
    ...lab12.fr,
  },
  de: {
    c5Desc:
      "12 Vergleichspaare: äußerlich ähnliche Anlagen mit grundverschiedener Mechanik",
    heroLede:
      "Sobald die Werkbeleuchtung erlischt, verschwinden Schienen, Schwenkarme und Hydraulikzylinder in der Schwärze. Dieser Atlas ordnet Themenfahrten und mechanische Theater weltweit danach, wovon Fahrzeuge getragen und wohin sie geführt werden — mit POV-Aufnahmen, Werklicht-Material und Hersteller-Tests.",
    themeDarkTitle: "Showlicht (dunkles Design)",
    themeToDarkAria: "Zum dunklen Design wechseln",
    ...lab12.de,
  },
  ru: {
    c5Desc: "12 пар систем, которые кажутся одинаковыми, но устроены по-разному",
    themeDarkLabel: "Тёмная тема",
    themeLightLabel: "Светлая тема",
    crumbsAria: "Хлебные крошки",
    ...lab12.ru,
  },
  ar: {
    c5Desc: "12 زوجاً من الأنظمة: متشابهة في الظلام لكنها مختلفة هندسياً",
    brandSub: "أطلس الركوب المظلم",
    navRides: "الجاذبات",
    heroBtnBrowse: "تصفّح الجاذبات",
    compareDialogTitle: "مقارنة الجاذبات",
    plateKicker: "هل تعلم؟",
    themeLightLabel: "الإضاءة مفعّلة",
    themeDarkLabel: "الإضاءة مطفأة",
    themeLightTitle: "إضاءة مفعّلة (الوضع الفاتح)",
    themeDarkTitle: "إضاءة مطفأة (الوضع الداكن)",
    ...lab12.ar,
  },
  ja: {
    navGlossary: "視覚効果とインタラクション",
    footerCopyright: "© 2026 Dark Ride Atlas · 初版",
    ...lab12.ja,
  },
  ko: {
    c5Desc: "어둠 속에서는 같아 보이지만 구조가 다른 12쌍의 설비 대조",
    ...lab12.ko,
  },
};

for (const [code, patches] of Object.entries(uiPatches)) {
  if (!core[code]) continue;
  Object.assign(core[code].ui, patches);
}

if (core.fr?.ui?.heroLede) {
  core.fr.ui.heroLede = core.fr.ui.heroLede
    .replace("Dès que les projecteurs s’éteignent", "Dès que les lumières de travail s’éteignent")
    .replace("les parcours scéniques", "les dark rides")
    .replace(
      "vues de maintenance lumières allumées",
      "vues coulisses éclairées"
    );
}

const coreReplacers = [
  ["lights-on breakdown", "lights-on walkthrough"],
  ["Lights-on breakdown", "Lights-on walkthrough"],
];
core.en = deepReplace(core.en, coreReplacers);

writeCore(langs, core);

// locale-en.js: breakdown → explainer phrasing
const enReplacers = [
  ["Mechanical breakdown", "Mechanism walkthrough"],
  ["Lights-on breakdown", "Lights-on walkthrough"],
  ["lights-on breakdown", "lights-on walkthrough"],
  ["Third-party mechanical breakdown (English)", "Third-party technical explainer (English)"],
  ["Third-party mechanical breakdown", "Third-party technical explainer"],
  ["Third-party engineering breakdown", "Third-party engineering explainer"],
  ["engineering breakdown", "engineering explainer"],
  ["mechanical breakdown", "technical explainer"],
];

let enLoc = loadLocale("en");
enLoc = deepReplace(enLoc, enReplacers);
writeLocale("en", enLoc);

// locale-es.js: LSM wording
let esLoc = loadLocale("es");
esLoc = deepReplace(esLoc, [
  ["motores síncronos lineales", "motores lineales síncronos (LSM)"],
]);
writeLocale("es", esLoc);

// locale-ar.js: لعبة → جاذبة (attraction), hall lighting caption
function fixArabicRideWord(s) {
  if (typeof s !== "string") return s;
  const tokens = [];
  const protect = (re) => {
    s = s.replace(re, (m) => {
      tokens.push(m);
      return `\x01P${tokens.length - 1}\x01`;
    });
  };
  protect(/قصة لعبة/g);
  protect(/حكاية لعبة/g);
  protect(/Toy Story/gi);
  const reps = [
    ["لعبة ركوب مظلم", "جاذبة ركوب مظلمة"],
    ["لعبة ركوب مظلمة", "جاذبة ركوب مظلمة"],
    ["لعبة التصويب", "جاذبة التصويب"],
    ["لعبة بمنصات", "جاذبة بمنصات"],
    ["لعبة قوارب", "جاذبة قوارب"],
    ["لعبة منحدرات", "جاذبة منحدرات"],
    ["لعبة Omnimover", "جاذبة Omnimover"],
    ["لعبة F.L.Y.", "جاذبة F.L.Y."],
    ["لعبة Fire in the Hole", "جاذبة Fire in the Hole"],
    ["(لعبة الفك المفترس", "(جاذبة الفك المفترس"],
    ["شهدت اللعبة", "شهدت الجاذبة"],
    ["وهي اللعبة الوحيدة", "وهي الجاذبة الوحيدة"],
    ["النصف الأول لعبة", "النصف الأول جاذبة"],
    ["كلعبة ركوب", "كجاذبة ركوب"],
    ["أول لعبة", "أول جاذبة"],
    ["من لعبة ", "من جاذبة "],
    ["للعبة ", "للجاذبة "],
    ["في لعبة ", "في جاذبة "],
    ["وفي لعبة ", "وفي جاذبة "],
    ["لعبة «", "جاذبة «"],
    ["لعبة مسارية", "جاذبة مسارية"],
    ["لعبة ركوب", "جاذبة ركوب"],
  ];
  for (const [from, to] of reps) s = s.split(from).join(to);
  s = s.replace(/\x01P(\d+)\x01/g, (_, i) => tokens[Number(i)]);
  return s;
}

function fixArabicTree(obj) {
  if (typeof obj === "string") return fixArabicRideWord(obj);
  if (Array.isArray(obj)) return obj.map(fixArabicTree);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = fixArabicTree(v);
    return out;
  }
  return obj;
}

let arLoc = loadLocale("ar");
arLoc = fixArabicTree(arLoc);
arLoc = deepReplace(arLoc, [["تصوير مع إضاءة الصالة", "تصوير مع إضاءة العمل"]]);
writeLocale("ar", arLoc);

console.log("i18n fixes applied.");
