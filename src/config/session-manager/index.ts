const key = "session";

export const sessionManager = (() => {
  let value: number | null = null;

  const _getLocalSession = (): number | null => {
    const sessionData = sessionStorage.getItem(key);
    const localData = localStorage.getItem(key);
    const sessionString = sessionData || localData;

    if (sessionString) {
      return parseInt(sessionString);
    }

    return null;
  };

  const _getSession = () => {
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

  const startSession = (keepConnected = false, exp: number) => {
    _clear();
    value = exp;
    if (keepConnected) {
      localStorage.setItem(key, exp.toString());
    }
    sessionStorage.setItem(key, exp.toString());
  };

  const endSession = () => {
    _clear();
  };

  const hasSession = () => {
    const session = _getSession();

    return !!session;
  };

  const isExpired = () => {
    const exp = _getSession();
    if (!exp) {
      return true;
    }

    const { isValid } = validateExpiration(exp);

    return !isValid;
  };

  const validateExpiration = (exp: number) => {
    const isValid = new Date() < _getExpirationDate(exp);
    return { isValid };
  };

  const updateSession = (exp: number) => {
    const keepConnected = !!localStorage.getItem(key);
    startSession(keepConnected, exp);
  };

  return {
    startSession,
    endSession,
    hasSession,
    isExpired,
    updateSession,
    validateExpiration,
  };
})();
