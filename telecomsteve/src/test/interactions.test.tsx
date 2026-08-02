import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "./render";

function toggleButton() {
	return screen.getByRole("button", { name: /toggle navigation menu/i });
}

afterEach(() => {
	vi.restoreAllMocks();
	vi.useRealTimers();
});

describe("mobile drawer", () => {
	// The global setup freezes requestAnimationFrame; the drawer's presence
	// animation needs a live one to mount its content.
	beforeEach(() => {
		globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
			setTimeout(() => cb(0), 0) as unknown as number;
		globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
	});

	async function openDrawer() {
		fireEvent.click(toggleButton());
		expect(toggleButton()).toHaveAttribute("aria-expanded", "true");
		await waitFor(() => {
			expect(document.querySelector('[data-part="content"]')).toBeTruthy();
		});
	}

	it("opens from the hamburger and closes when a nav link is clicked", async () => {
		renderApp("/");

		expect(toggleButton()).toHaveAttribute("aria-expanded", "false");
		await openDrawer();

		const body = document.querySelector('[data-part="content"]') as HTMLElement;
		fireEvent.click(within(body).getByText("About Me"));
		await waitFor(() => {
			expect(toggleButton()).toHaveAttribute("aria-expanded", "false");
		});
	});

	it("closes when the backdrop is clicked", async () => {
		renderApp("/");
		await openDrawer();

		const backdrop = document.querySelector('[data-part="backdrop"]');
		expect(backdrop, "drawer backdrop").toBeTruthy();
		fireEvent.click(backdrop as HTMLElement);
		await waitFor(() => {
			expect(toggleButton()).toHaveAttribute("aria-expanded", "false");
		});
	});

	it("closes via the drawer's own open-change handling (Escape)", async () => {
		renderApp("/");
		await openDrawer();

		fireEvent.keyDown(document.activeElement ?? document.body, {
			key: "Escape",
		});
		await waitFor(() => {
			expect(toggleButton()).toHaveAttribute("aria-expanded", "false");
		});
	});
});

describe("home page text scramble", () => {
	function stubRafQueue() {
		const queue: FrameRequestCallback[] = [];
		globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
			queue.push(cb);
			return queue.length;
		};
		return {
			pump() {
				let n = 0;
				while (queue.length > 0) {
					if (++n > 10_000) throw new Error("animation never completed");
					queue.shift()!(0);
				}
			},
			queue,
		};
	}

	it("animates a phrase, then schedules and plays the next one", async () => {
		vi.useFakeTimers();
		const raf = stubRafQueue();

		const { container, unmount } = renderApp("/");
		const el = container.querySelector(".text-scramble") as HTMLElement;
		expect(el).toBeTruthy();

		raf.pump();
		await Promise.resolve(); // flush the setText promise -> schedules the timer
		expect(el.innerHTML).toBe("CI pipelines that pass, the first time");

		vi.advanceTimersByTime(3500); // fire the scheduled next()
		raf.pump();
		await Promise.resolve();
		expect(el.innerHTML).toBe("Automate model training with Kubeflow");

		// A second visibilitychange while already running must not restart the loop.
		document.dispatchEvent(new Event("visibilitychange"));
		expect(raf.queue.length).toBe(0);

		unmount();
	});

	it("does not schedule the next phrase after unmount", async () => {
		vi.useFakeTimers();
		const raf = stubRafQueue();

		const { unmount } = renderApp("/");
		raf.pump();
		// Unmount before the resolved promise's callback runs: the cancelled
		// guard must prevent a new timer from being scheduled.
		unmount();
		await Promise.resolve();
		expect(vi.getTimerCount()).toBe(0);
	});

	it("waits for the tab to become visible before starting", () => {
		const raf = stubRafQueue();
		const visibility = vi
			.spyOn(document, "visibilityState", "get")
			.mockReturnValue("hidden");

		const { unmount } = renderApp("/");
		expect(raf.queue.length).toBe(0); // nothing started while hidden

		visibility.mockReturnValue("visible");
		document.dispatchEvent(new Event("visibilitychange"));
		expect(raf.queue.length).toBeGreaterThan(0); // started on visibility

		unmount();
	});
});
