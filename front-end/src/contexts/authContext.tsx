import { auth } from "@/firebase/firebaseConfig";
import type { User } from "firebase/auth";
import { Loader } from "lucide-react";
import React, { createContext, useEffect, useState } from "react";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Update axios default headers with the user's ID token
  // const updateApiToken = async (user: User | null) => {
  //   if (user) {
  //     const token = await user.getIdToken();
  //     axiosInstance.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${token}`;
  //   } else {
  //     delete axiosInstance.defaults.headers.common["Authorization"];
  //   }
  // };

  // const login = async (token: string) => {
  //   await saveToken(token);
  //   setToken(token);
  //   setIsAuthenticated(true);
  // };

  // const setUser = async (userData: any) => {
  //   setCurrentUser(userData);
  //   setRoles(userData.roles);
  //   await saveUserData(userData);
  // };

  // const logout = async () => {
  //   setToken(null);
  //   setCurrentUser(null);
  //   setRoles([]);
  //   setIsAuthenticated(false);

  //   await removeToken();
  //   await saveUserData(null);
  // };

  // const checkAuthentication = async () => {
  //   const storedToken = await getToken();
  //   const storedUserData = (await getUserData()) as any;

  //   if (storedToken && storedUserData) {
  //     setToken(storedToken);
  //     setCurrentUser(storedUserData);
  //     setRoles(storedUserData.roles);
  //     setIsAuthenticated(true);
  //   }
  // };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }

  }, []);

  const getToken = async () => {
    if (user) return await user.getIdToken();
    return null;
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  return (
    <AuthContext.Provider value={{ user, loading, getToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

