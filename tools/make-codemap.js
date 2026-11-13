// Regenerates CODEMAP.md from the section comments in game.js and multiplayer.js.
// Run:  node tools/make-codemap.js
const fs = require("fs");
const out = [];
out.push("# Code map (auto-generated, do not edit by hand)");
out.push("");
out.push("Regenerate after big edits: `node tools/make-codemap.js`.");
out.push("Line numbers drift as code changes, so search by the title text (Ctrl+F / grep) to jump.");
out.push("");
for (const file of ["game.js", "multiplayer.js"]) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  out.push(`## ${file} (${lines.length} lines)`);
  out.push("");
  lines.forEach((l, i) => {
    let m;
    if ((m = l.match(/^\/\/ (={3,}.*?={0,}|-{10,})\s*(.*)$/)) && m[2].replace(/[=-]/g, "").trim()) {
      out.push(`- **L${i + 1}** ${m[2].replace(/[=-]+\s*$/, "").trim()}`);
    } else if ((m = l.match(/^\/\/ ={3,}\s*(.+?)\s*={0,}$/)) && m[1].replace(/[=-]/g, "").trim()) {
      out.push(`- **L${i + 1}** ${m[1]}`);
    } else if ((m = l.match(/^\/\/ -{3,} (.+)$/))) {
      out.push(`  - L${i + 1} ${m[1]}`);
    } else if (file === "multiplayer.js" && (m = l.match(/^(?:async )?function (\w+)/))) {
      out.push(`- **L${i + 1}** function ${m[1]}()`);
    }
  });
  out.push("");
}
fs.writeFileSync("CODEMAP.md", out.join("\n") + "\n");
console.log("CODEMAP.md written");
