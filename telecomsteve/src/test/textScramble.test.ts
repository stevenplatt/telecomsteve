import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TextScramble, phrases } from "../pages/textScramble";

/** Queue-based rAF stub so frames advance deterministically without recursion. */
let rafQueue: FrameRequestCallback[] = [];

function pumpFrames(limit = 10_000) {
	let n = 0;
	while (rafQueue.length > 0) {
		if (++n > limit) throw new Error("animation never completed");
		rafQueue.shift()!(0);
	}
}

function stubElement(initialText = ""): HTMLElement {
	return { innerText: initialText, innerHTML: "" } as unknown as HTMLElement;
}

beforeEach(() => {
	rafQueue = [];
	globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
		rafQueue.push(cb);
		return rafQueue.length;
	};
	// Seeded LCG so the scramble's random branches are exercised deterministically.
	let seed = 42;
	vi.spyOn(Math, "random").mockImplementation(() => {
		seed = (seed * 1664525 + 1013904223) % 4294967296;
		return seed / 4294967296;
	});
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe("TextScramble", () => {
	it("resolves once every character reaches its target text", async () => {
		const el = stubElement();
		const fx = new TextScramble(el);

		const done = fx.setText("hello world");
		pumpFrames();
		await done;

		expect(el.innerHTML).toBe("hello world");
	});

	it("scrambles between old and new text of different lengths", async () => {
		const el = stubElement("a much longer starting phrase");
		const fx = new TextScramble(el);

		// New text shorter than old (covers the `to` fallback) …
		const shorter = fx.setText("xy");
		pumpFrames();
		await shorter;
		expect(el.innerHTML).toBe("xy");

		// … then longer than old (covers the `from` fallback).
		(el as unknown as { innerText: string }).innerText = "xy";
		const longer = fx.setText("a considerably longer replacement");
		pumpFrames();
		await longer;
		expect(el.innerHTML).toBe("a considerably longer replacement");
	});

	it("renders dud characters mid-animation", () => {
		const el = stubElement();
		const fx = new TextScramble(el);

		fx.setText("scramble me please");
		// Advance only a few frames so the animation is still in flight.
		for (let i = 0; i < 10 && rafQueue.length > 0; i++) {
			rafQueue.shift()!(0);
		}
		expect(el.innerHTML).toContain("class='dud'");
		pumpFrames(); // finish cleanly so no dangling frames leak between tests
	});

	it("invokes the default resolver when updated with an empty queue", () => {
		const el = stubElement();
		const fx = new TextScramble(el);
		// No setText yet: queue is empty, so update() completes immediately and
		// calls the initial no-op resolver.
		expect(() => fx.update()).not.toThrow();
		expect(el.innerHTML).toBe("");
	});

	it("exposes the home page phrase rotation", () => {
		expect(phrases.length).toBeGreaterThan(1);
		for (const phrase of phrases) {
			expect(phrase).toBeTruthy();
		}
	});
});
