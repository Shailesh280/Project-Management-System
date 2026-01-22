import { createContext, useContext, useEffect, useState } from "react";
import { parseJwt } from "./auth.utils";
import api from "../services/apiClient";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.get("/users/me");
      setUser((prev) => ({
        ...prev,
        ...res.data, // includes displayPicture, bio, etc.
      }));
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const parsed = parseJwt(storedToken);

      if (parsed?.sub && parsed?.role && parsed?.id) {
        setToken(storedToken);
        setUser({
          id: Number(parsed.id),
          email: parsed.sub,
          username: parsed.username,
          role: parsed.role,
          displayPicture: null, 
        });

        refreshUser();
      } else {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = async (jwtToken) => {
    const parsed = parseJwt(jwtToken);

    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);

    setUser({
      id: Number(parsed.id),
      email: parsed.sub,
      username: parsed.username,
      role: parsed.role,
      displayPicture: null,
    });

    await refreshUser(); 
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
        refreshUser,        
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
