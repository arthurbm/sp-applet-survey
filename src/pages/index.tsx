import Head from "next/head";
import { Montserrat } from "next/font/google";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { FullPageLayout } from "@/templates/full-page-layout";
import { useRouter } from "next/router";

const fonts = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Strateegia survey</title>
        <meta
          name="description"
          content="Crie pontos de partida com conteúdos de referência"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={fonts.className}>
        <FullPageLayout>
          <Box className="loginWrap" p={[6, 7]}>
            <Heading as="h1" size="lg" mb={4}>
              Strateegia survey
            </Heading>
            <Text fontSize="sm" color="gray.400" mb={8}>
              Faça pesquisas usando o poder de Strateegia
            </Text>
            <Button
              onClick={() => router.push("/login")}
              colorScheme="pink"
              size="md"
              w="full"
              mb={4}
            >
              Vamos lá!
            </Button>
          </Box>
        </FullPageLayout>
      </main>
    </>
  );
}
