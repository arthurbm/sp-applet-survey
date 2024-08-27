import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { useResponseInterceptor } from "@/config/fetch";
import { AxiosError } from "axios";
import { sessionManager } from "@/config/session-manager";
import { useRouter } from "next/router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/query-client";
import { useAuthCheck } from "@/hooks/use-auth-check";

export default function App({ Component, pageProps }: AppProps) {
  const isAuthenticated = useAuthCheck();
  const router = useRouter();

  useResponseInterceptor({
    onError: (error: AxiosError<any>) => {
      let status = error.response?.status || 0;
      const response = error.response;

      // TODO: Refactor this
      if (response?.data?.path?.includes("auth/refresh")) {
        status = 403;
      }

      if ([403, 500].includes(status)) {
        const data = response?.data;
        const needLogin = data.message.match(
          /Access Denied|Token has expired|refresh_token|Token's Signature/gi
        );
        if (needLogin) {
          sessionManager.endSession();
          router.push("/login");
          return;
        }
        throw error;
      }
      throw error;
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} isAuthenticated={isAuthenticated} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
