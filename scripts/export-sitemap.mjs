import { mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { copyFileSync, readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
process.chdir(root);

const build = spawnSync("npm", ["run", "build"], { stdio: "inherit", shell: true });
if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const src = `${root}/out/sitemap.xml`;
const xml = readFileSync(src, "utf8");

mkdirSync(`${root}/export`, { recursive: true });

const targets = [
  `${root}/export/sitemap.xml`,
  `${root}/public/sitemap.xml`,
  `${root}/sitemap.xml`,
];

for (const dest of targets) {
  writeFileSync(dest, xml);
}

console.log(`Exported sitemap (${xml.length} bytes) → export/sitemap.xml`);
