import { describe, it, expect } from "vitest";
import { renderApp } from "./render";

const EXPECTED: Array<[string, string]> = [
	["Home", "/"],
	["About Me", "/about"],
	["Resume", "/resume"],
	["Research", "/research"],
	["Portfolio", "/portfolio"],
];

function anchors(container: HTMLElement) {
	return Array.from(container.querySelectorAll("a"));
}

describe("navigation", () => {
	it("renders every nav link with the correct href", () => {
		const { container } = renderApp("/");
		for (const [label, href] of EXPECTED) {
			const matches = anchors(container).filter((a) => a.textContent?.trim() === label);
			expect(matches.length, `link "${label}" present`).toBeGreaterThan(0);
			expect(
				matches.some((a) => a.getAttribute("href") === href),
				`link "${label}" points to ${href}`,
			).toBe(true);
		}
	});

	it("orders the nav as Home, About Me, Resume, Research, Portfolio", () => {
		const { container } = renderApp("/");
		const order: string[] = [];
		for (const a of anchors(container)) {
			const label = a.textContent?.trim() ?? "";
			if (EXPECTED.some(([l]) => l === label) && !order.includes(label)) {
				order.push(label);
			}
		}
		expect(order).toEqual(EXPECTED.map(([l]) => l));
	});

	it("marks the active route link and renders the template footer", () => {
		const { container } = renderApp("/research");
		const footer = anchors(container).find((a) =>
			a.getAttribute("href")?.includes("ResearchEng-portfolio"),
		);
		expect(footer, "template footer link").toBeTruthy();
	});
});
