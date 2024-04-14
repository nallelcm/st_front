import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { loginUser, getUserData, UserJWT } from "../API";
interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  userData: UserJWT | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserJWT>();
  useEffect(() => {
    const receivedToken = localStorage.getItem("token");
    const receivedRefreshToken = localStorage.getItem("refreshToken");
    if (receivedToken) {
      setToken(receivedToken);
    }
    if (receivedRefreshToken) {
      setRefreshToken(receivedRefreshToken);
    }
    const userInfo = getUserData();
    if (userInfo) {
      setUserData(userInfo);
    }
  }, []);
  const login = async (username: string, password: string): Promise<void> => {
    const response = await loginUser(username, password);
    try {
      if (response.success) {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        if (token && refreshToken) {
          setToken(token);
          setRefreshToken(refreshToken);
          const userInfo = getUserData();
          if (userInfo) {
            setUserData(userInfo);
          }
        } else {
          throw new Error("Token not found in local storage");
        }
      } else {
        throw new Error(response.error || "An error occurred during login.");
      }
    } catch (error) {
      throw error; // Rethrow the error to be caught by the caller if necessary
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, refreshToken, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
