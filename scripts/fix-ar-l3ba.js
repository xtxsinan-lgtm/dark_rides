const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../js/i18n/locale-ar.js");
let s = fs.readFileSync(file, "utf8");

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
  ["لعبة ", "جاذبة "],
];
for (const [from, to] of reps) s = s.split(from).join(to);
s = s.replace(/\x01P(\d+)\x01/g, (_, i) => tokens[Number(i)]);

s = s.replace("تصوير مع إضاءة الصالة", "تصوير مع إضاءة العمل");

const before = (fs.readFileSync(file, "utf8").match(/لعبة/g) || []).length;
const after = (s.match(/لعبة/g) || []).length;
fs.writeFileSync(file, s);
console.log("Arabic لعبة:", before, "->", after);
