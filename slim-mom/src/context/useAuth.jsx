import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Custom hook to use the authentication context
export const useAuth = () => {
  // Getting the context value from AuthContext
  const context = useContext(AuthContext);

  // If the context is undefined, it means the hook is used outside of AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Returning the context value
  return context;
};
