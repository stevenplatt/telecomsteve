import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { system } from "../theme";
import App from "../App";

/** Render the whole App at a given route with the real providers/theme. */
export function renderApp(route = "/") {
	return render(
		<ChakraProvider value={system}>
			<MemoryRouter initialEntries={[route]}>
				<App />
			</MemoryRouter>
		</ChakraProvider>,
	);
}

/** Render an arbitrary node with the Chakra + Router providers. */
export function renderWithProviders(ui: ReactNode, route = "/") {
	return render(
		<ChakraProvider value={system}>
			<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
		</ChakraProvider>,
	);
}
