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
} from '@chakra-ui/react'
import { Link as RouterLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AboutPage, NotFoundPage, PortfolioPage, ResearchPage, ResumePage } from './pages'

const navLinks = [
  { label: 'About', to: '/' },
  { label: 'Resume', to: '/resume' },
  { label: 'Research', to: '/research' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
]

type NavLinkItemProps = {
  to: string
  label: string
  isActive: boolean
  onClick?: () => void
  fontSize?: string
}

const NavAnchor = chakra(RouterLink)

function NavLinkItem({ to, label, isActive, onClick, fontSize = '25px' }: NavLinkItemProps) {
  return (
    <NavAnchor
      to={to}
      fontSize={fontSize}
      color={isActive ? 'blue.500' : 'gray.500'}
      _hover={{ color: 'gray.300' }}
      onClick={onClick}
    >
      {label}
    </NavAnchor>
  )
}

function SiteLayout() {
  const { open, setOpen } = useDisclosure()
  const location = useLocation()
  const closeDrawer = () => setOpen(false)

  return (
    <DrawerRoot open={open} placement="start" onOpenChange={(details) => setOpen(details.open)}>
      <Box minH="100vh" bg="white" color="gray.600" fontFamily="Lato, sans-serif">
        <Box
          display={{ base: 'block', lg: 'none' }}
          position="fixed"
          top="0"
          left="0"
          zIndex="overlay"
          w="100%"
          bg="white"
          boxShadow="sm"
          px={6}
          py={4}
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
          display={{ base: 'none', lg: 'flex' }}
          position="fixed"
          top="0"
          left="0"
          h="100%"
          w="20%"
          minW="240px"
          boxShadow="md"
          bg="white"
          zIndex="base"
          alignItems="center"
          justifyContent="center"
        >
          <Stack gap={6} textAlign="center" w="100%" px={6}>
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.label}
                to={link.to}
                label={link.label}
                isActive={location.pathname === link.to}
              />
            ))}
            <Box pt={10} color="gray.500" fontSize="sm">
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
          ml={{ base: 0, lg: '20%' }}
          px={{ base: 6, md: 10, lg: '10%' }}
          pt={{ base: '120px', lg: '10%' }}
          pb={{ base: '20%', lg: '10%' }}
          fontSize={{ base: '18px', lg: '22px' }}
          lineHeight={{ base: '30px', lg: '35px' }}
        >
          <Outlet />
        </Box>

        <DrawerBackdrop onClick={closeDrawer} />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerCloseTrigger />
            <DrawerHeader>telecomsteve</DrawerHeader>
            <DrawerBody>
              <VStack gap={4} align="stretch">
                {navLinks.map((link) => (
                  <NavLinkItem
                    key={link.label}
                    to={link.to}
                    label={link.label}
                    fontSize="20px"
                    isActive={location.pathname === link.to}
                    onClick={closeDrawer}
                  />
                ))}
                <Box pt={6} color="gray.500" fontSize="sm">
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
  )
}

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<AboutPage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="blog" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
