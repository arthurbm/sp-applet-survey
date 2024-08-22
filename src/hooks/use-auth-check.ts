import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionManager } from "@/config/session-manager";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function debugCookies() {
  console.group("Cookie Debugging");

  // Log all cookies
  console.log("All cookies:", document.cookie);

  // Try to get the access token using js-cookie
  const jsCookieToken = Cookies.get("accessToken");
  console.log("js-cookie accessToken:", jsCookieToken);

  // Manually parse cookies
  const allCookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  console.log("Manually parsed cookies:", allCookies);

  // Check for accessToken specifically
  console.log("Manually found accessToken:", allCookies["accessToken"]);

  // Check localStorage and sessionStorage
  console.log("localStorage accessToken:", localStorage.getItem("accessToken"));
  console.log(
    "sessionStorage accessToken:",
    sessionStorage.getItem("accessToken")
  );

  // Log session manager state
  console.log("Session manager has session:", sessionManager.hasSession());
  console.log("Session manager is expired:", sessionManager.isExpired());

  console.groupEnd();
}

function getAccessToken(): string | undefined {
  // Try to get the token using js-cookie
  let accessToken: string | undefined = Cookies.get("accessToken");

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

  // If still no access token, check localStorage and sessionStorage
  if (!accessToken) {
    accessToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken") ||
      undefined; // Assign undefined if still no access token
  }

  return accessToken;
}

export function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      debugCookies(); // Call our debug function

      const accessToken = getAccessToken();
      let hasValidSession =
        sessionManager.hasSession() && !sessionManager.isExpired();

      console.log("Final Access Token:", accessToken);

      if (accessToken && !hasValidSession) {
        try {
          const decodedToken = jwtDecode<{ exp: number }>(accessToken);
          const expirationTime = decodedToken.exp;

          console.log("Decoded Token:", decodedToken);

          sessionManager.startSession(false, expirationTime);
          hasValidSession = true;
        } catch (error) {
          console.error("Error decoding access token:", error);
        }
      }

      setIsAuthenticated(hasValidSession);

      if (router.pathname === "/") {
        return;
      }

      if (!hasValidSession && router.pathname.startsWith("/dashboard")) {
        router.push("/login");
      } else if (hasValidSession && router.pathname === "/login") {
        router.push("/dashboard");
      }
    };

    checkAuth();

    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [router]);

  return isAuthenticated;
}
