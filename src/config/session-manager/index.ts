const key = "session";

export const sessionManager = (() => {
  let value: { exp: number; token: string } | null = null;

  const _getLocalSession = (): { exp: number; token: string } | null => {
    const sessionData = sessionStorage.getItem(key);
    const localData = localStorage.getItem(key);
    const sessionString = sessionData || localData;

    if (sessionString) {
      return JSON.parse(sessionString);
    }

    return null;
  };

  const getSession = () => {
    if (value) {
      return value;
    }

    return _getLocalSession();
  };

  const _getExpirationDate = (exp: number) => new Date(exp * 1000);

  const _clear = () => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
    value = null;
  };

  const startSession = (keepConnected = false, exp: number, token: string) => {
    _clear();
    value = { exp, token };
    if (keepConnected) {
      localStorage.setItem(key, JSON.stringify({ exp, token }));
    }
    sessionStorage.setItem(key, JSON.stringify({ exp, token }));
  };

  const endSession = () => {
    _clear();
  };

  const hasSession = () => {
    const session = getSession();
    return !!session;
  };

  const isExpired = () => {
    const session = getSession();
    if (!session) {
      return true;
    }

    const { isValid } = validateExpiration(session.exp);
    return !isValid;
  };

  const validateExpiration = (exp: number) => {
    const isValid = new Date() < _getExpirationDate(exp);
    return { isValid };
  };

  const updateSession = (exp: number, token: string) => {
    const keepConnected = !!localStorage.getItem(key);
    startSession(keepConnected, exp, token);
  };

  return {
    startSession,
    endSession,
    hasSession,
    isExpired,
    updateSession,
    validateExpiration,
    getSession,
  };
})();
