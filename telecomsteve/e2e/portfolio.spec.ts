import { test, expect } from "@playwright/test";

test("portfolio uses a 65/35 text/image split on desktop", async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== "desktop", "desktop layout only");
	await page.goto("/portfolio");

	const text = page.getByTestId("portfolio-text").first();
	const media = page.getByTestId("portfolio-media").first();
	const tb = await text.boundingBox();
	const mb = await media.boundingBox();
	expect(tb && mb).toBeTruthy();
	if (tb && mb) {
		const pct = Math.round((tb.width / (tb.width + mb.width)) * 100);
		expect(pct, "text column ~65%").toBeGreaterThanOrEqual(62);
		expect(pct, "text column ~65%").toBeLessThanOrEqual(68);
		// side by side on the same row
		expect(Math.abs(tb.y - mb.y), "columns share a row").toBeLessThan(tb.height);
	}
});

test("portfolio stacks vertically on mobile", async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== "mobile", "mobile layout only");
	await page.goto("/portfolio");

	const text = page.getByTestId("portfolio-text").first();
	const media = page.getByTestId("portfolio-media").first();
	const tb = await text.boundingBox();
	const mb = await media.boundingBox();
	if (tb && mb) {
		expect(mb.y, "image stacks below text").toBeGreaterThan(tb.y);
	}
});
