import React, { createContext, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  login as apiLogin,
  logout as apiLogout,
} from "../../Services/AuthService/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const loginMutation = useMutation(apiLogin, {
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries("user");
    },
  });

  const logoutMutation = useMutation(apiLogout, {
    onSuccess: () => {
      setUser(null);
      queryClient.invalidateQueries("user");
    },
  });

  const login = async (userData) => {
    try {
      await loginMutation.mutateAsync(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
