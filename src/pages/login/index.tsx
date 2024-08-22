import Head from "next/head";
import { Montserrat } from "next/font/google";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FullPageLayout } from "@/templates/full-page-layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CustomInput } from "@/components/custom-input";
import { useState } from "react";
import { auth } from "@/services/auth";
import { getMe } from "@/services/user";

const fonts = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await auth({
        email: data.email,
        password: data.password,
        keepConnected: true,
      });

      setIsLoading(false);
      router.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "email ou senha inválidos",
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Applet template</title>
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
            {/* ... other components */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <CustomInput
                  label={"email"}
                  fieldName="email"
                  // variant="outline"
                  labelProps={{
                    mb: 2,
                    fontSize: "md",
                  }}
                  placeholder={"digite seu email"}
                  control={control}
                  error={errors.email}
                />
                <CustomInput
                  label={"senha"}
                  fieldName="password"
                  variant="outline"
                  type="password"
                  placeholder={"digite sua senha"}
                  labelProps={{
                    mb: 2,
                    fontSize: "md",
                  }}
                  control={control}
                />
              </VStack>

              <Button
                //... other props
                colorScheme="pink"
                mt={4}
                mb={3}
                width={"full"}
                type="submit"
                isLoading={isLoading}
              >
                entrar
              </Button>
            </form>
            {/* ... other components */}
          </Box>
        </FullPageLayout>
      </main>
    </>
  );
}
