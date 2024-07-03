import { useContext } from "react";
import { RegContext } from "./RegContext";

// Custom hook to use the registration context
export const useReg = () => {
  // Getting the context value from RegContext
  const context = useContext(RegContext);

  // If the context is undefined, it means the hook is used outside of RegProvider
  if (context === undefined) {
    throw new Error("useReg must be used within a RegProvider");
  }

  // Returning the context value
  return context;
};
