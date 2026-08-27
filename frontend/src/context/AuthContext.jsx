import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  fetchMe,
} from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a JWT is already saved, validate it and load the user.
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((me) => setUser(me))
      .catch(() => {
        localStorage.removeItem("jwt");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login({ identifier, password }) {
    const { jwt, user: loggedInUser } = await loginUser({ identifier, password });
    localStorage.setItem("jwt", jwt);
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function register({ username, email, password }) {
    const { jwt, user: newUser } = await registerUser({ username, email, password });
    localStorage.setItem("jwt", jwt);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    localStorage.removeItem("jwt");
    setUser(null);
  }

  // "Admin" is just a Strapi user whose role is named "Admin" — see
  // backend/README.md for how to create that role and assign it.
  const isAdmin = user?.role?.name === "Admin";

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
