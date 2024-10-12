import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { UserRole } from "../types";
import { ResponseWrapper } from "../client/types";
import { User } from "../models/User";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    userRole: UserRole | null;
  };
  onRegister?: (
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
const USER_KEY = "my-user";
const API_UL = "http://172.20.10.9:8080/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    userRole: UserRole | null;
  }>({
    token: null,
    authenticated: null,
    userRole: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItem(TOKEN_KEY);
      const userID = await SecureStore.getItem(USER_KEY);

      if (token && userID) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res: ResponseWrapper<User> = await axios.get(
          `${API_UL}/${userID}`
        );
        if (res.data) {
          setAuthState({ token, authenticated: true, userRole: res.data.role });
        }
      }
    };
    loadToken();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      return await axios.post(`${API_UL}/register`, {
        username,
        email,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_UL}/login`, { email, password });

      const token = result.data.token;
      const role = result.data.role;

      console.log("token: ", token, " role: ", role);

      setAuthState({ token, authenticated: true, userRole: role });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, role);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);

    axios.defaults.headers.common["Authorization"] = ``;

    setAuthState({
      token: null,
      authenticated: false,
      userRole: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
