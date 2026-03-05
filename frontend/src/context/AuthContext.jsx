/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// const API_URL = `${import.meta.env.VITE_API_URL}/auth`;
const API_URL = "/api/v1/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/login`, inputs, {
        withCredentials: true,
      });

      const user = res?.data?.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(res?.data?.message || "Login successful");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      setUser(null);
      localStorage.removeItem("user");
      toast.success(res?.data?.message || "Logout successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      const message = err.response?.data?.message || "Logout failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return ctx;
};
