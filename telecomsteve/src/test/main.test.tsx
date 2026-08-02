import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";

describe("main entrypoint", () => {
	it("bootstraps the app into #root", async () => {
		const root = document.createElement("div");
		root.id = "root";
		document.body.appendChild(root);

		await import("../main");

		await waitFor(() => expect(root.innerHTML).not.toBe(""));
		root.remove();
	});
});
