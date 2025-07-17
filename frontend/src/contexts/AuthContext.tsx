// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    userType: "owner" | "renter"
  ) => Promise<boolean>;
  signup: (
    userData: Omit<User, "id"> & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("assetra_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: "owner" | "renter"
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      const result = await response.json();
      console.log("Login API response:", result);

      if (!response.ok || !result.user) {
        console.error("Login failed:", result.message || "No user in response");
        return false;
      }

      setUser(result.user);
      localStorage.setItem("assetra_user", JSON.stringify(result.user));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    userData: Omit<User, "id"> & { password: string }
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log("Signup API response:", result);

      if (!response.ok || !result.user) {
        console.error("Signup failed:", result.message || "No user in response");
        return false;
      }

      setUser(result.user);
      localStorage.setItem("assetra_user", JSON.stringify(result.user));
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("assetra_user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("assetra_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
