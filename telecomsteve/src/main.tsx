import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
	ChakraProvider,
	createSystem,
	defaultConfig,
	defineConfig,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const themeConfig = defineConfig({
	// Match the Flask site's typography weights (Roboto Mono 600 body, 700 h1/h2).
	// !important is required to win over Chakra's component recipes, mirroring the
	// original site's CSS.
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

const system = createSystem(defaultConfig, themeConfig);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChakraProvider value={system}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</StrictMode>,
);
