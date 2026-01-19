import {
	Box,
	Link,
	Stack,
	Text,
	VStack,
	DrawerBackdrop,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerPositioner,
	DrawerRoot,
	DrawerTrigger,
	DrawerCloseTrigger,
	useDisclosure,
	chakra,
} from "@chakra-ui/react";
import {
	Link as RouterLink,
	Outlet,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import {
	AboutPage,
	NotFoundPage,
	PortfolioPage,
	ResearchPage,
	ResumePage,
} from "./pages";

const navLinks = [
	{ label: "About", to: "/" },
	{ label: "Resume", to: "/resume" },
	{ label: "Research", to: "/research" },
	{ label: "Portfolio", to: "/portfolio" },
];

type NavLinkItemProps = {
	to: string;
	label: string;
	isActive: boolean;
	onClick?: () => void;
	fontSize?: string;
};

const NavAnchor = chakra(RouterLink);

function NavLinkItem({
	to,
	label,
	isActive,
	onClick,
	fontSize = "25px",
}: NavLinkItemProps) {
	return (
		<NavAnchor
			to={to}
			fontSize={fontSize}
			color={isActive ? "blue.500" : "gray.500"}
			_hover={{ color: "gray.300" }}
			onClick={onClick}
		>
			{label}
		</NavAnchor>
	);
}

function SiteLayout() {
	const { open, setOpen } = useDisclosure();
	const location = useLocation();
	const closeDrawer = () => setOpen(false);

	return (
		<DrawerRoot
			open={open}
			placement="start"
			onOpenChange={(details) => setOpen(details.open)}
		>
			<Box
				minH="100vh"
				bg="white"
				color="gray.600"
				fontFamily="Lato, sans-serif"
			>
				<Box
					display={{ base: "block", lg: "none" }}
					position="fixed"
					top="0"
					left="0"
					zIndex="overlay"
					w="100%"
					bg="white"
					boxShadow="sm"
					px={8}
					py={6}
				>
					<DrawerTrigger asChild>
						<Box
							as="button"
							aria-label="Open navigation menu"
							display="inline-flex"
							flexDirection="column"
							gap="6px"
						>
							<Box w="32px" h="4px" bg="gray.500" borderRadius="full" />
							<Box w="32px" h="4px" bg="gray.500" borderRadius="full" />
							<Box w="32px" h="4px" bg="gray.500" borderRadius="full" />
						</Box>
					</DrawerTrigger>
				</Box>

				<Box
					display={{ base: "none", lg: "flex" }}
					position="fixed"
					top="0"
					left="0"
					h="100%"
					w="20%"
					minW="240px"
					boxShadow="lg"
					bg="white"
					border="none"
					zIndex="base"
					alignItems="center"
					justifyContent="center"
				>
					<Stack gap={8} textAlign="center" w="100%" px={8}>
						{navLinks.map((link) => (
							<NavLinkItem
								key={link.label}
								to={link.to}
								label={link.label}
								isActive={location.pathname === link.to}
							/>
						))}
						<Box pt={12} color="gray.500" fontSize="sm">
							<Text>Template:</Text>
							<Link
								href="https://github.com/stevenplatt/ResearchEng-portfolio"
								target="_blank"
								rel="noreferrer noopener"
								color="gray.500"
							>
								ResearchEng Portfolio
							</Link>
						</Box>
					</Stack>
				</Box>

				<Box
					ml={{ base: 0, lg: "20%" }}
					px={{ base: 8, md: 12, lg: "12%" }}
					pt={{ base: "140px", lg: "12%" }}
					pb={{ base: "24%", lg: "12%" }}
					fontSize={{ base: "18px", lg: "22px" }}
					lineHeight={{ base: "30px", lg: "35px" }}
				>
					<Outlet />
				</Box>

				<DrawerBackdrop onClick={closeDrawer} />
				<DrawerPositioner>
					<DrawerContent>
						<DrawerCloseTrigger />
						<DrawerHeader textAlign="center" display="none">
							telecomsteve
						</DrawerHeader>
						<DrawerBody
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<VStack gap={6} align="stretch" w="100%" maxW="320px">
								<VStack gap={6} align="center" w="100%" textAlign="center">
									{navLinks.map((link) => (
										<Box key={link.label} w="100%">
											<NavLinkItem
												to={link.to}
												label={link.label}
												fontSize="20px"
												isActive={location.pathname === link.to}
												onClick={closeDrawer}
											/>
										</Box>
									))}
								</VStack>
								<Box pt={8} color="gray.500" fontSize="sm" textAlign="center">
									<Text>Template:</Text>
									<Link
										href="https://github.com/stevenplatt/ResearchEng-portfolio"
										target="_blank"
										rel="noreferrer noopener"
										color="gray.500"
									>
										ResearchEng Portfolio
									</Link>
								</Box>
							</VStack>
						</DrawerBody>
					</DrawerContent>
				</DrawerPositioner>
			</Box>
		</DrawerRoot>
	);
}

function App() {
	return (
		<Routes>
			<Route element={<SiteLayout />}>
				<Route index element={<AboutPage />} />
				<Route path="resume" element={<ResumePage />} />
				<Route path="research" element={<ResearchPage />} />
				<Route path="portfolio" element={<PortfolioPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
