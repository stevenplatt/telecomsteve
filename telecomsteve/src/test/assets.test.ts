import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

function walk(dir: string): string[] {
	const out: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walk(full));
		else out.push(full);
	}
	return out;
}

describe("asset references are valid", () => {
	it("every /img/... reference in src/ resolves to a file in public/", () => {
		const files = walk(SRC)
			.filter((f) => /\.(ts|tsx|css)$/.test(f))
			.filter((f) => !f.includes(`${join("src", "test")}`)); // don't scan the tests themselves
		const refs = new Set<string>();
		for (const file of files) {
			const text = readFileSync(file, "utf8");
			for (const m of text.matchAll(/\/img\/[\w-]+\.(?:webp|png|svg|jpe?g|gif)/gi)) {
				refs.add(m[0]);
			}
		}
		expect(refs.size, "found at least one image reference").toBeGreaterThan(0);
		const missing = [...refs].filter((ref) => !existsSync(join(PUBLIC, ref)));
		expect(missing, `missing assets referenced in src: ${missing.join(", ")}`).toEqual([]);
	});

	it("every local asset referenced in index.html exists", () => {
		const html = readFileSync(join(ROOT, "index.html"), "utf8");
		const missing: string[] = [];
		for (const m of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
			const ref = m[1];
			if (/\.(webp|png|svg|ico|jpg|jpeg|gif)$/i.test(ref) && !existsSync(join(PUBLIC, ref))) {
				missing.push(ref);
			}
		}
		expect(missing, `missing assets referenced in index.html: ${missing.join(", ")}`).toEqual([]);
	});
});
