import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionManager } from "@/config/session-manager";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function getAccessToken() {
  // Try to get the token using js-cookie
  let accessToken = Cookies.get("accessToken");

  // If js-cookie fails, try to parse the cookie string manually
  if (!accessToken) {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );
    if (tokenCookie) {
      accessToken = tokenCookie.split("=")[1];
    }
  }

  return accessToken;
}

export function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = getAccessToken();
      let hasValidSession =
        sessionManager.hasSession() && !sessionManager.isExpired();

      console.log("Access Token:", accessToken); // For debugging

      // Handle edge case: accessToken exists but not in session manager
      if (accessToken && !hasValidSession) {
        try {
          const decodedToken = jwtDecode<{ exp: number }>(accessToken);
          const expirationTime = decodedToken.exp;

          console.log("Decoded Token:", decodedToken); // For debugging

          // Update session manager with the token from the cookie
          sessionManager.startSession(false, expirationTime); // Assuming we don't want to keep connected by default
          hasValidSession = true;
        } catch (error) {
          console.error("Error decoding access token:", error);
          // If there's an error decoding the token, we'll consider it invalid
          // Note: We can't remove HttpOnly cookies via JavaScript
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
