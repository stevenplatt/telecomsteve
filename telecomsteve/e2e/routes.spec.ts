import { test, expect } from "@playwright/test";

type RouteCheck = { path: string; marker?: string; text?: RegExp | string };

const ROUTES: RouteCheck[] = [
	{ path: "/", marker: ".text-scramble" },
	{ path: "/about", text: /you can call me telecomsteve/i },
	{ path: "/resume", text: /Summary/ },
	{ path: "/research", text: /Research Activity/ },
	{ path: "/portfolio", text: /Platform Portfolio/ },
];

for (const route of ROUTES) {
	test(`${route.path} loads cleanly with a visible, padded logo`, async ({ page }) => {
		const errors: string[] = [];
		page.on("console", (m) => {
			if (m.type() === "error") errors.push(m.text());
		});
		page.on("pageerror", (e) => errors.push(String(e)));

		await page.goto(route.path);

		if (route.marker) await expect(page.locator(route.marker)).toBeVisible();
		if (route.text) await expect(page.locator("body")).toContainText(route.text);

		// Logo shows on every page and is not touching the top/right corner.
		const logo = page.getByAltText(/telecomsteve/i);
		await expect(logo).toBeVisible();
		const box = await logo.boundingBox();
		expect(box).toBeTruthy();
		if (box) {
			const vw = page.viewportSize()!.width;
			expect(box.y, "logo top padding").toBeGreaterThanOrEqual(8);
			expect(vw - (box.x + box.width), "logo right padding").toBeGreaterThanOrEqual(8);
		}

		expect(errors, `console errors on ${route.path}:\n${errors.join("\n")}`).toEqual([]);
	});
}

test("unknown routes render the 404 page", async ({ page }) => {
	await page.goto("/definitely-not-a-real-page");
	await expect(page.locator("body")).toContainText("404");
});
