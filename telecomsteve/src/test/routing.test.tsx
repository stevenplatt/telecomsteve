import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderApp } from "./render";

describe("routing", () => {
	it("renders the home text-scramble at /", () => {
		const { container } = renderApp("/");
		expect(container.querySelector(".text-scramble")).toBeTruthy();
	});

	it("renders the About Me page at /about", () => {
		renderApp("/about");
		expect(screen.getByRole("heading", { name: /Steven Platt, PhD/i })).toBeInTheDocument();
		expect(screen.getByText(/you can call me telecomsteve/i)).toBeInTheDocument();
	});

	it("renders the Resume page at /resume", () => {
		renderApp("/resume");
		expect(screen.getByRole("heading", { name: /^Summary$/i })).toBeInTheDocument();
	});

	it("renders the Research page at /research", () => {
		renderApp("/research");
		expect(screen.getByRole("heading", { name: /Research Activity/i })).toBeInTheDocument();
	});

	it("renders the Portfolio page at /portfolio with 65/35 columns", () => {
		renderApp("/portfolio");
		expect(screen.getByRole("heading", { name: /Platform Portfolio/i })).toBeInTheDocument();
		expect(document.querySelectorAll('[data-testid="portfolio-text"]').length).toBeGreaterThan(0);
		expect(document.querySelectorAll('[data-testid="portfolio-media"]').length).toBeGreaterThan(0);
	});

	it("renders a 404 page for unknown routes", () => {
		renderApp("/no-such-page");
		expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
	});

	it("shows the persistent logo header on every route", () => {
		for (const route of ["/", "/about", "/resume", "/research", "/portfolio", "/nope"]) {
			const { unmount } = renderApp(route);
			const logo = screen.getByAltText(/telecomsteve/i);
			expect(logo, `logo on ${route}`).toBeInTheDocument();
			expect(logo.getAttribute("src")).toBe("/img/telecomsteve_logo.png");
			unmount();
		}
	});
});
