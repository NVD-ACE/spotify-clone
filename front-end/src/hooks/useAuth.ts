import type { AuthContextType } from "@/contexts/authContext";
import { createContext, useContext } from "react";

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
