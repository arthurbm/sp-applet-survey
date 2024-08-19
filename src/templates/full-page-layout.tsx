import React, { ReactNode } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

import StrateegiaLogo from "@/assets/images/strateegia-logo.svg";

type Props = {
  children: ReactNode;
  logoAsLink?: boolean;
};

export const FullPageLayout = ({ children }: Props): JSX.Element => {
  const bgDesktop = useBreakpointValue({
    base: "gray.100",
    lg: `url(/strateegia.svg), url(/hex.svg)`, // Still referencing directly from the public directory for background images
  });

  return (
    <Box
      p={[1, 6]}
      bg={bgDesktop}
      minHeight="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      overflowY="auto"
      backgroundPosition={bgDesktop && "bottom right, top left"}
      backgroundRepeat="no-repeat"
    >
      <Box
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        as="header"
        pb={[3, 7]}
      >
        <Box _focus={{ outline: "none" }}>
          <Image
            src={StrateegiaLogo}
            alt="Strateegia"
            width={200}
            // height={200}
            priority
          />
        </Box>
      </Box>

      <Container
        p={4}
        w={["none", "lg"]}
        bg={["none", "white"]}
        borderRadius={["none", 10]}
        boxShadow={["none", "0px 0px 20px 2px #E5E5E5"]}
        maxW="container.md"
      >
        {children}

        <Flex
          as="footer"
          justify="end"
          align="center"
          px={[6, 7]}
          maxW={{ base: "100%" }}
        >
          <Text fontSize="xs" color="gray.300">
            © 2024 - tds.company todos os direitos reservados
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default FullPageLayout;
