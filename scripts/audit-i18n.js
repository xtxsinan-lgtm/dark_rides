const fs = require("fs");
const vm = require("vm");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function loadLang(code) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js/i18n/core.js"), "utf8"), ctx);
  if (code !== "zh") {
    vm.runInContext(fs.readFileSync(path.join(ROOT, "js/i18n/locale-" + code + ".js"), "utf8"), ctx);
    return { ...ctx.window.DRA_CORE[code], ...ctx.window.DRA_LOCALES[code] };
  }
  return ctx.window.DRA_CORE.zh;
}

const langs = ["en", "es", "fr", "ja", "ko", "de", "ru", "ar"];
const issues = [];

for (const l of langs) {
  const u = loadLang(l).ui || {};
  for (const k of ["c3Desc", "labPageTitle", "c5Desc", "notesPageTitle", "navRides", "heroBtnBrowse", "plateKicker", "vtypeExplain"]) {
    const v = u[k] || "";
    if (/Seis |Six couples|6쌍|Шесть пар|ست مق/.test(v) && !/12|douze|Zwölf|12쌍|12 пар|12 مق/.test(v)) {
      issues.push(`${l}.ui.${k}: stale 6-group copy`);
    }
    if (/breakdown|Different in Iron|differ in iron|Distintas en su Acero|Acero/i.test(v)) {
      issues.push(`${l}.ui.${k}: breakdown/iron calque`);
    }
  }
  if (l === "ar" && (u.navRides === "المشاريع" || u.plateKicker === "إضاءة هندسية")) {
    issues.push(`ar.ui nav/plate still wrong`);
  }
  if (l === "en" && u.navRides === "Index") issues.push("en.ui.navRides still Index");
}

for (const l of langs) {
  const raw = fs.readFileSync(path.join(ROOT, "js/i18n/locale-" + l + ".js"), "utf8");
  if (/breakdown/i.test(raw)) issues.push(`${l} locale still has breakdown`);
  if (l === "es" && /motores síncronos lineales/.test(raw)) issues.push("es locale LSM wording");
  if (l === "fr" && /projecteurs s/.test(raw)) issues.push("fr locale projecteurs in data");
}

const coreRaw = fs.readFileSync(path.join(ROOT, "js/i18n/core.js"), "utf8");
if (/breakdown/i.test(coreRaw)) issues.push("core still has breakdown");
if (/projecteurs s/.test(coreRaw)) issues.push("core fr hero projecteurs");

const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
if (/6 组/.test(readme) && /X-Ray/.test(readme)) issues.push("README still says 6 Lab groups");

console.log(issues.length ? issues.join("\n") : "OK: no known audit failures");
