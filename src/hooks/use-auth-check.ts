import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionManager } from "@/config/session-manager";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get("accessToken");
      let hasValidSession =
        sessionManager.hasSession() && !sessionManager.isExpired();

      console.log("hasValidSession", hasValidSession);
      console.log("accessToken", accessToken);

      // Handle edge case: accessToken exists but not in session manager
      if (accessToken && !hasValidSession) {
        try {
          const decodedToken = jwtDecode<{ exp: number }>(accessToken);
          const expirationTime = decodedToken.exp;

          // Update session manager with the token from the cookie
          sessionManager.startSession(true, expirationTime); // Assuming we don't want to keep connected by default
          hasValidSession = true;
        } catch (error) {
          console.error("Error decoding access token:", error);
          // If there's an error decoding the token, we'll consider it invalid
          Cookies.remove("accessToken");
        }
      }

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
