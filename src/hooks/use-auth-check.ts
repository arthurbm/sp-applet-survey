import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionManager } from "@/config/session-manager"; // Ensure this path is correct

export function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        if (process.env.NODE_ENV === "production") {
          // Production environment: use API call
          const response = await fetch("/api/auth/status");
          const data = await response.json();

          if (data.isAuthenticated) {
            setIsAuthenticated(true);
            // Use the custom session manager to start the session
            sessionManager.startSession(
              true,
              Math.floor(Date.now() / 1000) + 14400
            ); // 4 hours from now, in seconds
          } else {
            setIsAuthenticated(false);
            sessionManager.endSession();
          }
        } else {
          // Development environment: use session manager
          const hasSession = sessionManager.hasSession();
          const isExpired = sessionManager.isExpired();

          setIsAuthenticated(hasSession && !isExpired);

          if (!hasSession || isExpired) {
            sessionManager.endSession();
          }
        }

        // Handle redirects
        if (!isAuthenticated && router.pathname.startsWith("/dashboard")) {
          router.push("/login");
        } else if (isAuthenticated && router.pathname === "/login") {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
        sessionManager.endSession();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [router, isAuthenticated]);

  return { isAuthenticated, isLoading };
}
