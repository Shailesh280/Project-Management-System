import { createContext, useContext, useEffect, useState } from "react";
import { parseJwt } from "./auth.utils";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const parsed = parseJwt(storedToken);

      if (parsed?.sub && parsed?.role && parsed?.id) {
        setToken(storedToken);
        setUser({
          id: parsed.id,
          email: parsed.sub,
          username: parsed.username,
          role: parsed.role,
        });
      } else {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (jwtToken) => {
    const parsed = parseJwt(jwtToken);
    setToken(jwtToken);
    setUser({
      id: parsed.id,
      email: parsed.sub,
      role: parsed.role,
    });
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const isAdmin =
    user?.role === "ADMIN" || user?.role === "ROLE_ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
};
