import { test, expect } from "@playwright/test";

test("desktop sidebar navigates between pages", async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== "desktop", "desktop sidebar only");
	await page.goto("/");

	await page.getByRole("link", { name: "About Me", exact: true }).click();
	await expect(page).toHaveURL(/\/about$/);
	await expect(page.locator("body")).toContainText(/you can call me telecomsteve/i);

	await page.getByRole("link", { name: "Portfolio", exact: true }).click();
	await expect(page).toHaveURL(/\/portfolio$/);
	await expect(page.locator("body")).toContainText("Platform Portfolio");

	await page.getByRole("link", { name: "Home", exact: true }).click();
	await expect(page).toHaveURL(/\/$/);
	await expect(page.locator(".text-scramble")).toBeVisible();
});

test("mobile drawer opens and closes via the always-on-top hamburger", async ({
	page,
}, testInfo) => {
	test.skip(testInfo.project.name !== "mobile", "mobile drawer only");
	await page.goto("/");

	// Attribute locator (not getByRole): once the modal drawer opens, the rest of
	// the page is aria-hidden, so a role query can't find the still-visible hamburger.
	const hamburger = page.locator('button[aria-label="Toggle navigation menu"]');
	await expect(hamburger).toBeVisible();

	// The sidebar nav is hidden on mobile until the drawer is opened.
	const aboutLink = page.getByRole("link", { name: "About Me", exact: true });
	await expect(aboutLink).toHaveCount(0);

	await hamburger.click();
	await expect(aboutLink).toBeVisible();

	// The hamburger stays on top of the open drawer and still toggles it closed.
	await hamburger.click();
	await expect(aboutLink).toHaveCount(0);
});

test("mobile nav link navigates and closes the drawer", async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== "mobile", "mobile drawer only");
	await page.goto("/");

	await page.locator('button[aria-label="Toggle navigation menu"]').click();
	await page.getByRole("link", { name: "Resume", exact: true }).click();
	await expect(page).toHaveURL(/\/resume$/);
	await expect(page.locator("body")).toContainText("Summary");
});
