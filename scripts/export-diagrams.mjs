import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceDir = path.join(root, "diagrams");
const outputDir = path.join(root, "public/images/diagrams");

async function exportDiagrams(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await exportDiagrams(source);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".drawio.svg")) continue;

    const text = await readFile(source, "utf8");
    // Remove editing data only from the root tag; preserve rendering markup.
    const svgRoot = /<svg\b(?:[^>"']|"[^"]*"|'[^']*')*>/.exec(text);
    if (!svgRoot) throw new Error(`Missing SVG root: ${source}`);
    const metadata = /\s+content\s*=\s*(?:"[^"]*"|'[^']*')/;
    if (!metadata.test(svgRoot[0])) {
      throw new Error(`Missing draw.io editing metadata: ${source}`);
    }
    const cleaned =
      text.slice(0, svgRoot.index) +
      svgRoot[0].replace(metadata, "") +
      text.slice(svgRoot.index + svgRoot[0].length);
    const relative = path.relative(sourceDir, source);
    const target = path.join(outputDir, relative);
    await mkdir(path.dirname(target), { recursive: true });
    const previous = await readFile(target, "utf8").catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    });
    if (previous !== cleaned) await writeFile(target, cleaned, "utf8");
    console.log(`Exported: ${path.relative(root, target)}`);
  }
}

await exportDiagrams(sourceDir);
