import Head from "next/head";
import { Montserrat } from "next/font/google";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { FullPageLayout } from "@/templates/full-page-layout";
import { useRouter } from "next/router";
import Image from "next/image";
import banner from "@/assets/images/banner.jpg";
import { useAuthCheck } from "@/hooks/use-auth-check";

const fonts = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthCheck();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <Head>
        <title>Strateegia survey</title>
        <meta
          name="description"
          content="Faça pesquisas usando o poder de Strateegia"
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
            <Image src={banner} alt="Survey" width={500} height={500} />
            <Button
              onClick={handleClick}
              colorScheme="pink"
              size="md"
              w="full"
              mt={8}
              mb={4}
              isLoading={isLoading}
            >
              Vamos lá!
            </Button>
          </Box>
        </FullPageLayout>
      </main>
    </>
  );
}
