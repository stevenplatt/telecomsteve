import { test, expect } from "@playwright/test";

test("home text animation starts on its own (no interaction) and settles on a phrase", async ({
	page,
}) => {
	await page.goto("/");
	const scramble = page.locator(".text-scramble");
	await expect(scramble).toBeVisible();

	const first = await scramble.textContent();
	await page.waitForTimeout(1500);
	const later = await scramble.textContent();

	expect(later, "scramble text should change without any interaction").not.toBe(first);
	await expect(scramble).toContainText(/[A-Za-z]{4,}/);
});

test("home never overflows horizontally during the scramble", async ({ page }) => {
	await page.goto("/");
	await page.locator(".text-scramble").waitFor({ state: "visible" });
	// Sample repeatedly to catch intermittent overflow while spaces are scrambled.
	let maxOverflow = 0;
	for (let i = 0; i < 25; i++) {
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
		);
		maxOverflow = Math.max(maxOverflow, overflow);
		await page.waitForTimeout(120);
	}
	expect(maxOverflow, "horizontal overflow (px) at any sampled frame").toBeLessThanOrEqual(0);
});

test("home text is vertically centered in the viewport", async ({ page }) => {
	await page.goto("/");
	const scramble = page.locator(".text-scramble");
	await expect(scramble).toBeVisible();
	const box = await scramble.boundingBox();
	const vh = page.viewportSize()!.height;
	expect(box).toBeTruthy();
	if (box) {
		const center = box.y + box.height / 2;
		// within the middle third of the viewport
		expect(center).toBeGreaterThan(vh * 0.33);
		expect(center).toBeLessThan(vh * 0.67);
	}
});
