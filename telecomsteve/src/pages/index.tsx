import {
  Box,
  Heading,
  HStack,
  Image,
  Link,
  ListItem,
  ListRoot,
  Stack,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const InternalLink = chakra(RouterLink)

export function AboutPage() {
  return (
    <VStack gap={12} textAlign="center">
      <Image
        src="/img/telecomsteve.webp"
        alt="Steven Platt"
        boxSize="250px"
        objectFit="cover"
        borderRadius="full"
      />
      <VStack gap={8}>
        <Heading as="h1" size="lg" color="#f1c40f" fontWeight="bold">
          Steven Platt, PhD
        </Heading>
        <Stack gap={4}>
          <Text>Hi, I'm Steven, but you can call me telecomsteve.</Text>
          <Text>
            I am an infrastructure engineer, researcher, and creator of Stack Dyno and the Yoptio
            AI RSS Reader.
          </Text>
        </Stack>
        <HStack gap={10} justify="center" pt={8}>
          <Link
            href="https://www.linkedin.com/in/telecomsteve"
            target="_blank"
            rel="noreferrer noopener"
            color="blue.500"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/stevenplatt"
            target="_blank"
            rel="noreferrer noopener"
            color="blue.500"
          >
            GitHub
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}

export function ResumePage() {
  return (
    <Stack gap={12}>
      <Box>
        <Heading as="h2" size="md">
          Steven Platt, PhD
        </Heading>
        <Text>Platform &amp; Infrastructure Engineer, San Francisco, CA</Text>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="green">
          Summary
        </Heading>
        <Text>
          Engineering Leader and PhD Researcher specializing in Blockchain Systems Design and
          cloud automation. Proven track record of delivering secure, cost-efficient infrastructure
          for complex distributed systems, including Layer-1 blockchains and AI-powered platforms.
          Expert in aligning technical architecture with business goals, driving significant cost
          reductions (up to 72%), and leading high-performance teams to solve critical scalability
          and security challenges in decentralized environments.
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="green">
          Areas of Expertise
        </Heading>
        <ListRoot listStyleType="disc" gap={6} pl={10}>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Blockchain Systems Design:
            </Text>{' '}
            Deep expertise in engineering and securing decentralized protocols, including
            identifying zero-day vulnerabilities in consensus algorithms at o1Labs and conducting
            PhD-level research on decentralized network infrastructure.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Google Cloud &amp; AI Solutions:
            </Text>{' '}
            Expertise in leveraging Google Cloud Platform and AI technologies (Google Vertex,
            Gemini AI) to build and scale intelligent applications from the ground up.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Infrastructure Automation &amp; Cost Reduction:
            </Text>{' '}
            Proven success in reducing cloud and telecom expenditures by over 50% through
            strategic re-architecting, automation (Terraform, Kubernetes), and migration to
            cloud-native services.
          </ListItem>
        </ListRoot>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="green">
          Experience
        </Heading>
        <Stack gap={10} pt={4}>
          <Box>
            <Heading as="h4" size="sm">
              Stack Dyno
            </Heading>
            <Text fontStyle="italic">Founder, Feb 2024 - current</Text>
            <ListRoot listStyleType="disc" gap={4} pl={10} pt={4}>
              <ListItem>
                Built a Google Cloud-focused FinOps product as a monorepo with three React +
                TypeScript apps (marketing site, customer dashboard, reseller console), including
                interactive spend/optimization visualizations and infrastructure topologies via
                D3.js.
              </ListItem>
              <ListItem>
                Developed a FastAPI backend that securely ingests customer service-account
                credentials and performs read-only queries against BigQuery Billing Export to power
                live spending views.
              </ListItem>
              <ListItem>
                Engineered a FinOps answer engine using custom Model Context Protocol (MCP) and RAG
                workflows to autonomously resolve billing queries.
              </ListItem>
              <ListItem>
                Productionized the Stack Dyno platform to support SaaS whitelabeling using GitHub
                Actions, Google Kubernetes Engine, and Caddy to automate ingress, routing, and SSL
                certificate creation with customer-managed domains.
              </ListItem>
            </ListRoot>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              o1Labs
            </Heading>
            <Text fontStyle="italic">Lead Platform Engineer, Nov 2021 - Feb 2024</Text>
            <ListRoot listStyleType="disc" gap={4} pl={10} pt={4}>
              <ListItem>
                Led a team of 5 platform and QA engineers responsible for the core infrastructure
                of the Mina blockchain protocol.
              </ListItem>
              <ListItem>
                Engineered a 52% reduction in Google Cloud costs by leading initiatives to
                re-architect Kubernetes clusters, migrate stateless services to Google Cloud Run,
                and decommission legacy infrastructure.
              </ListItem>
              <ListItem>
                Automated the deployment and scaling of network infrastructure using Terraform,
                Helm, and ArgoCD, significantly improving the reliability and speed of service
                rollouts.
              </ListItem>
              <ListItem>
                Discovered and helped remediate two zero-day vulnerabilities in the Mina
                blockchain's consensus algorithm during internal validation testing.
              </ListItem>
            </ListRoot>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              Universitat Pompeu Fabra
            </Heading>
            <Text fontStyle="italic">Doctoral Candidate (Graduated), Aug 2017 - Sept 2021</Text>
            <ListRoot listStyleType="disc" gap={4} pl={10} pt={4}>
              <ListItem>
                Successfully defended my research thesis which proposes the use of blockchain
                technologies to decentralize the physical layer of 5G cellular networks.
              </ListItem>
              <ListItem>
                Published blockchain and machine learning research in prestigious publications
                such as MDPI Journal Sensors and IEEE GlobeCom.
              </ListItem>
              <ListItem>
                Developed and taught Ethereum smart contract curriculum for a new &quot;Blockchain
                Technologies&quot; course.
              </ListItem>
            </ListRoot>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              Twitter Inc
            </Heading>
            <Text fontStyle="italic">Systems Engineer II, Jan 2014 - Aug 2017</Text>
            <ListRoot listStyleType="disc" gap={4} pl={10} pt={4}>
              <ListItem>
                Architected and executed the migration of legacy ISDN circuits to a modern
                VoIP-over-IP system, reducing telecom carrier costs by 72%.
              </ListItem>
              <ListItem>
                Accelerated new site infrastructure delivery by 83% (from 12 weeks to 2) by leading
                the migration of on-premise VoIP appliances to a virtualized VMware ESXi
                environment.
              </ListItem>
              <ListItem>
                Completed large-scale infrastructure deployments for DNS, storage, and VoIP across
                datacenters on 5 continents.
              </ListItem>
            </ListRoot>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              Salesforce.com
            </Heading>
            <Text fontStyle="italic">Network Engineer, Jul 2012 - Jan 2014</Text>
            <ListRoot listStyleType="disc" gap={4} pl={10} pt={4}>
              <ListItem>
                Managed the deployment and global support of multi-vendor network infrastructure
                (Cisco, Juniper, F5) for enterprise operations globally.
              </ListItem>
            </ListRoot>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              Caterpillar Inc
            </Heading>
            <Text fontStyle="italic">IT Analyst II, Jul 2012 - Jan 2014</Text>
            <ListRoot listStyleType="disc" gap={4} pl={10} pt={4}>
              <ListItem>
                Architected and deployed distributed network solutions, ranging from
                satellite-connected industrial IoT systems to enterprise Cisco VoIP networks across
                facilities in North America, Europe, and Asia.
              </ListItem>
            </ListRoot>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="green">
          Technical Skills
        </Heading>
        <ListRoot listStyleType="disc" gap={6} pl={10}>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Artificial Intelligence:
            </Text>{' '}
            Generative AI (LLMs), Retrieval-Augmented Generation (RAG), Model Context Protocol
            (MCP), Google Vertex AI, Gemini, AI Agents.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Blockchain &amp; Distributed Systems:
            </Text>{' '}
            Consensus Algorithms (PoS/PoW), P2P Networking, Zero-Knowledge Proofs (zk-SNARKs),
            Distributed Ledger Technology (DLT), Smart Contract Security, Cryptographic Primitives.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Cloud Native &amp; Infrastructure:
            </Text>{' '}
            Kubernetes (GKE/EKS), Terraform, Helm, Docker, Google Cloud Platform (GCP), AWS, GitOps
            (ArgoCD), CI/CD (GitHub Actions, Jenkins).
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Languages:
            </Text>{' '}
            Rust, Go (Golang), Python, TypeScript/JavaScript, Solidity.
          </ListItem>
        </ListRoot>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="green">
          Education
        </Heading>
        <ListRoot listStyleType="disc" gap={4} pl={10}>
          <ListItem>Universitat Pompeu Fabra: PhD, Blockchain Technologies</ListItem>
          <ListItem>Universitat Politecnica de Catalunya: MSc, Wireless Communications</ListItem>
          <ListItem>Illinois State University: MBA, Masters of Business Administration</ListItem>
          <ListItem>
            Southern Illinois University, Carbondale: BSc, Electronic Systems Technologies
          </ListItem>
        </ListRoot>
      </Box>
    </Stack>
  )
}

export function ResearchPage() {
  return (
    <Stack gap={12}>
      <Box>
        <Heading as="h2" size="md">
          Research Activity
        </Heading>
        <Text>My research focuses are blockchain protocols and decentralized coordination (Web3).</Text>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="#E74C3C">
          Standards Development
        </Heading>
        <Stack gap={4} pt={4}>
          <Text>
            IEEE P2677.11&trade; - Standard for Blockchain-based Omnidirectional Pandemic/epidemic
            Surveillance: Access to Telecommunications Data, Project Lead, 2020-2022.
          </Text>
          <Text>
            IEEE P2872&trade; - Standard for Interoperable and Secure Wireless Local Area Network
            (WLAN) Infrastructure and Architecture, Voting Member, 2020-2022.
          </Text>
        </Stack>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="#E74C3C">
          Publications
        </Heading>
        <Stack gap={10} pt={4}>
          <Box>
            <Heading as="h4" size="sm">
              &quot;Using Transition Learning to Enhance Mobile-Controlled Handover In Decentralized
              Future Networks&quot;
            </Heading>
            <Text fontStyle="italic">
              S Platt, B Demirel, M Oliver. IEEE 4th 5G World Forum (5GWF), 424-429, 2021.
            </Text>
            <Text>
              Traditionally, resource management and capacity allocation has been controlled
              network-side in cellular deployment. As autonomicity has been added to network
              design, machine learning technologies have largely followed this paradigm, benefiting
              from the higher compute capacity and informational context available at the network
              core. However, when these network services are disaggregated or decentralized, models
              that rely on assumed levels of network or information availability may no longer
              function reliably. This paper presents an inverted view of the resource management
              paradigm; one in which the client device executes a learning algorithm and manages
              its own mobility under a scenario where the networks and their corresponding data
              underneath are not being centrally managed.
            </Text>
            <Link
              href="https://ieeexplore.ieee.org/abstract/document/9605015"
              target="_blank" rel="noreferrer noopener"
              color="blue.500"
            >
              Download
            </Link>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              &quot;CoNTe: A Core Network Temporal Blockchain for 5G&quot;
            </Heading>
            <Text fontStyle="italic">
              S Platt, L Sanabria-Russo, M Oliver. Sensors 2020, 20, 5281.
            </Text>
            <Text>
              Virtual Network Functions allow the effective separation between hardware and
              network functionality, a strong paradigm shift from previously tightly integrated
              monolithic, vendor, and technology dependent deployments. In this virtualized
              paradigm, all aspects of network operations can be made to deploy on demand,
              dynamically scale, as well as be shared and interworked in ways that mirror behaviors
              of general cloud computing. To date, although seeing rising demand, distributed
              ledger technology remains largely incompatible in such elastic deployments, by its
              nature as functioning as an immutable record store. This work focuses on the
              structural incompatibility of current blockchain designs and proposes a novel,
              temporal blockchain design built atop federated byzantine agreement, which has the
              ability to dynamically scale and be packaged as a Virtual Network Function (VNF) for
              the 5G Core.
            </Text>
            <Link
              href="https://www.mdpi.com/1424-8220/20/18/5281/htm"
              target="_blank" rel="noreferrer noopener"
              color="blue.500"
            >
              Download
            </Link>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              &quot;Towards Blockchain for Decentralized Self-Organizing Wireless Networks&quot;
            </Heading>
            <Text fontStyle="italic">
              S Platt, M Oliver. IEEE Globecom Workshops (GC Wkshps), 1-5, 2019.
            </Text>
            <Text>
              Distributed consensus mechanisms have been widely researched and made popular with a
              number of blockchain-based token applications, such as Bitcoin, and Ethereum.
              Although these general-purpose platforms have matured for scale and security, they
              are designed for human incentive and continue to require currency reward and
              contract functions that are not requisite in machine communications. Redes Chain is a
              custom designed blockchain, built to support fully decentralized self-organization
              in wireless networks - without a cryptocurrency or contract dependency.
            </Text>
            <Link href="https://arxiv.org/pdf/2004.12438.pdf" target="_blank" rel="noreferrer noopener" color="blue.500">
              Download
            </Link>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              &quot;A Distributed Ledger-Enabled Interworking Model for the Wireless Air Interface&quot;
            </Heading>
            <Text fontStyle="italic">
              S Platt, M Oliver. IEEE 5th World Forum on Internet of Things (WF-IoT), 402-407, 2019.
            </Text>
            <Text>
              While direct allocation of spectrum and evolved medium access protocols provide a
              base for ubiquitous wireless connectivity, the existing TCP/IP and OSI models were
              designed for wired networks and do not address open interconnection of air
              interfaces. Without an interconnection model for the air interface, existing network
              designs continue to tie wireless medium access to that of the backhaul provider for
              ownership of access and identity trust, resulting in limitations on functionality and
              coverage. In this paper, we propose a novel solution to access ownership and
              identity trust by extending the TCP network standard, under a new model we propose,
              named TCP-Air which integrates distributed ledger technologies directly at the air
              interface. Further, we present two use cases of the TCP-Air model, demonstrating
              applications not feasible under existing permissioned-access network designs.
            </Text>
            <Link href="https://arxiv.org/pdf/2004.12435.pdf" target="_blank" rel="noreferrer noopener" color="blue.500">
              Download
            </Link>
          </Box>

          <Box>
            <Heading as="h4" size="sm">
              &quot;Application Layer Modeling in Vehicle Networks&quot;
            </Heading>
            <Text fontStyle="italic">
              S Platt. M.Sc. Thesis, Barcelona School of Telecommunications and Engineering,
              Polytechnic University of Catalonia, Barcelona, Spain, 2018.
            </Text>
            <Text>
              In recent years, network function virtualization and a software defined focus has
              allowed networks to become flexible and extensible in ways not possible previously.
              Although network modeling tools such as NS-2, NS-3, and OMNet++ have been extended with
              modules and code to support the absolute latest wireless protocols and medium access
              standards - there has been a growing gap in simulation of the layers above medium
              access which recent 5G use cases are designed to support. In this thesis, I measure
              the qualitative performance of application layer modeling in vehicle networks, taking
              the cooperative maneuver use case presented under &quot;Project 5GCar&quot; to design and
              simulate an autonomous merge algorithm using the VSimRTI network simulation stack.
            </Text>
            <Link href="https://arxiv.org/pdf/2101.10816.pdf" target="_blank" rel="noreferrer noopener" color="blue.500">
              Download
            </Link>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Heading as="h3" size="sm" color="#E74C3C">
          Invited Talks
        </Heading>
        <Stack gap={4} pt={4}>
          <Text>
            &quot;Blockchain for Decentralized 5G Public Utility Overlay Networks&quot;,{' '}
            <Text as="span" fontStyle="italic">
              3rd Workshop on 5G Technologies for First Responder and Tactical Networks
            </Text>
            , New York, US, December 2020.
          </Text>
          <Text>
            &quot;Towards Blockchain for Decentralized Self-Organizing Wireless Networks&quot;,{' '}
            <Text as="span" fontStyle="italic">
              IEEE Globecom, Workshop on Blockchain in Telecommunications
            </Text>
            , Hawaii, US, December 2019.
          </Text>
          <Text>
            &quot;A Distributed Ledger-Enabled Interworking Model for the Wireless Air Interface&quot;,{' '}
            <Text as="span" fontStyle="italic">
              IEEE 5th World Forum on the Internet of Things
            </Text>
            , Limerick, Ireland, April 2019.
          </Text>
          <Text>
            &quot;Enterprise SIP Trunking, Lessons Learned&quot;,{' '}
            <Text as="span" fontStyle="italic">
              Enterprise Connect Conference
            </Text>
            , Orlando, US, March 2017.
          </Text>
          <Text>
            &quot;Enterprise SIP Trunking&quot;,{' '}
            <Text as="span" fontStyle="italic">
              Twilio Signal Conference
            </Text>
            , San Francisco, US, May 2016.
          </Text>
        </Stack>
      </Box>
    </Stack>
  )
}

type PortfolioItemProps = {
  title: string
  description: string[]
  linkHref: string
  linkLabel: string
  imageSrc: string
  imageAlt: string
}

function PortfolioItem({
  title,
  description,
  linkHref,
  linkLabel,
  imageSrc,
  imageAlt,
}: PortfolioItemProps) {
  return (
    <Box bg="white">
      <Stack direction={{ base: 'column', lg: 'row' }} gap={12} align="center">
        <Box flex="1">
          <Heading as="h3" size="sm" color="#F1C40F">
            {title}
          </Heading>
          <Stack gap={6} pt={4}>
            {description.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
            <Link href={linkHref} target="_blank" rel="noreferrer noopener" color="blue.500">
              {linkLabel}
            </Link>
          </Stack>
        </Box>
        <Box flex="1" display="flex" justifyContent="center">
          <Box
            w="300px"
            h="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              maxW="100%"
              maxH="100%"
              objectFit="contain"
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export function PortfolioPage() {
  return (
    <Stack gap={12}>
      <Box>
        <Heading as="h2" size="md">
          Platform Portfolio
        </Heading>
        <Text>A selection of my infrastructure and full-stack projects.</Text>
      </Box>

      <Stack gap={14}>
        <PortfolioItem
          title="Stack Dyno"
          description={[
            'I built Stack Dyno as a Google Cloud-focused FinOps platform with spend and infrastructure views backed by a secure FastAPI service that reads BigQuery Billing Export data. I am most proud of its included "Cloud Map" feature, which is unique among FinOps tools, allowing users to see a 3D map of their deployments, combined with costs.',
            'To make the product feel like a live partner, I added an MCP + RAG AI agent for billing questions and allowed whitelabeling using Kubernetes and Caddy to automate ingress, routing, and SSL for customer-owned domains.',
          ]}
          linkHref="https://stackdyno.com"
          linkLabel="Visit Webpage"
          imageSrc="/img/stackdyno.png"
          imageAlt="Stack Dyno Logo"
        />

        <PortfolioItem
          title="Yoptio AI RSS Reader"
          description={[
            'Yoptio is an RSS reader with additional AI features baked-in. Beyond basic feed parsing, Yoptio uses AI to support article narration, article summaries, as well as a personalized daily podcast built from users\' personal Yoptio activity and feeds.',
            "I build Yoptio from the ground up; UI, back-end, as well as testing and deployment-chain automations. Yoptio runs within Google Cloud and uses Google Vertex and Gemini AI to power it's AI features.",
          ]}
          linkHref="https://yoptio.com"
          linkLabel="Try Yoptio"
          imageSrc="/img/gemini.webp"
          imageAlt="Google Gemini Logo"
        />

        <PortfolioItem
          title="SIP Trunking at Twitter"
          description={[
            'During periods of early growth, Twitter deployed a number of isolated and non-standard phone systems that had become expensive and difficult to support. To manage the complexity, Twitter hired me to unify its networks and migrate them to cloud deployment.',
            "The result was fully virtualized VoIP infrastructure, combined with a Twilio Cloud SIP trunking. This new design reduced Twitter's carrier costs 72%.",
          ]}
          linkHref="https://www.youtube.com/watch?v=lFzqYgF2MPQ"
          linkLabel="Watch Conference Talk"
          imageSrc="/img/twitter_logo.webp"
          imageAlt="Twitter"
        />

        <PortfolioItem
          title="5G Mobility Simulator"
          description={[
            'A simulator to recreate the mobility and tower association of a device in a 5G network. The system uses random walk behavior and monte carlo sampling to show connection behavior across 10,000 simulations.',
          ]}
          linkHref="https://github.com/stevenplatt/5G-mobility-simulator"
          linkLabel="Gitub Source"
          imageSrc="/img/python_logo.webp"
          imageAlt="Python Programming"
        />
      </Stack>
    </Stack>
  )
}

export function NotFoundPage() {
  return (
    <VStack gap={10} textAlign="center">
      <Heading as="h1" size="lg">
        404 - Page Not Found
      </Heading>
      <Text>Oops! Looks like you've wandered into uncharted territory.</Text>
      <Text>The page you're looking for doesn't exist or has been moved.</Text>
      <HStack gap={10} justify="center" pt={8}>
        <InternalLink to="/" color="blue.500">
          Back to Home
        </InternalLink>
        <Link href="https://github.com/stevenplatt" target="_blank" rel="noreferrer noopener" color="blue.500">
          GitHub
        </Link>
        <Link href="https://www.linkedin.com/in/telecomsteve" target="_blank" rel="noreferrer noopener" color="blue.500">
          LinkedIn
        </Link>
      </HStack>
    </VStack>
  )
}
