import PropTypes from "prop-types";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const TOKEN = import.meta.env.VITE_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);
  const verifyToken = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Token verification failed");
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, [verifyToken]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }
      const { token, user } = await response.json();
      localStorage.setItem(TOKEN, token);
      console.log(user)
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setUser(null);
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Unexpected error");

      return { success: true };
    } catch (err) {
      console.error("Register failed", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    register,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
