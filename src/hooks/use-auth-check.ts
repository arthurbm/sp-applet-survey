import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionManager } from "@/config/session-manager";

export function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const hasValidSession =
        sessionManager.hasSession() && !sessionManager.isExpired();
      setIsAuthenticated(hasValidSession);

      if (router.pathname === "/") {
        // On the hero page, do nothing
        return;
      }

      if (!hasValidSession && router.pathname.startsWith("/dashboard")) {
        // Redirect to login if not authenticated and trying to access dashboard
        router.push("/login");
      } else if (hasValidSession && router.pathname === "/login") {
        // Redirect to dashboard if authenticated and on login page
        router.push("/dashboard");
      }
    };

    checkAuth();

    // Add event listener for route changes
    router.events.on("routeChangeComplete", checkAuth);

    // Clean up the event listener
    return () => {
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [router]);

  return isAuthenticated;
}
