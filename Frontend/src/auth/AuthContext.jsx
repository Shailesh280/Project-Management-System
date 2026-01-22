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
          id: Number(parsed.id),   // ✅ force number
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
      id: Number(parsed.id),      // ✅ force number
      email: parsed.sub,
      username: parsed.username,
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

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
