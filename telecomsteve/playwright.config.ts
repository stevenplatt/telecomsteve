import { defineConfig, devices } from "@playwright/test";

// End-to-end tests run against the Vite dev server and cover both a desktop and
// a mobile viewport so responsive layouts are verified on every change.
export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: "list",
	timeout: 30_000,
	expect: { timeout: 10_000 },
	use: {
		baseURL: "http://localhost:5173",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "desktop",
			use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
		},
		{
			name: "mobile",
			use: { ...devices["Pixel 5"] },
		},
	],
	webServer: {
		command: "npm run dev",
		url: "http://localhost:5173",
		reuseExistingServer: true,
		timeout: 60_000,
	},
});
