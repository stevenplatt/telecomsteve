import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Freeze animation frames so the home text-scramble effect renders once and does
// not schedule real timers during unit tests.
globalThis.requestAnimationFrame = () => 0;
globalThis.cancelAnimationFrame = () => {};

// Unmount React trees between tests so the DOM (and portals) don't leak.
afterEach(() => {
	cleanup();
});
