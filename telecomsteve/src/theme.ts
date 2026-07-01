import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const themeConfig = defineConfig({
	// Match the Flask site's typography (Roboto Mono). !important is required to
	// win over Chakra's component recipes, mirroring the original site's CSS.
	globalCss: {
		"body, p, li": { fontWeight: "300 !important" },
		"h3, h4": { fontWeight: "500 !important" },
		"h1, h2": { fontWeight: "400 !important" },
	},
	theme: {
		tokens: {
			fonts: {
				heading: { value: "'Roboto Mono', monospace" },
				body: { value: "'Roboto Mono', monospace" },
			},
		},
	},
});

export const system = createSystem(defaultConfig, themeConfig);
