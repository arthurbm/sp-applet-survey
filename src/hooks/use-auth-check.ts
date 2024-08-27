import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionManager } from "@/config/session-manager";

export function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();

        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          sessionManager.startSession(true, Date.now() + 14400000); // 4 hours from now
        } else {
          setIsAuthenticated(false);
          sessionManager.endSession();
        }

        if (!data.isAuthenticated && router.pathname.startsWith("/dashboard")) {
          router.push("/login");
        } else if (data.isAuthenticated && router.pathname === "/login") {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [router]);

  return { isAuthenticated, isLoading };
}
