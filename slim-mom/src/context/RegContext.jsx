import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

// Creăm contextul pentru înregistrare
export const RegContext = createContext();

// Reducer pentru gestionarea stării de înregistrare
const regReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER": // Gestionarea acțiunii de înregistrare
      return {
        ...state,
        user: action.payload.user, // Setarea datelor utilizatorului
        token: action.payload.token, // Setarea tokenului
      };
    default:
      return state;
  }
};

// RegProvider component pentru a furniza contextul de înregistrare copiilor săi
export const RegProvider = ({ children }) => {
  const [state, dispatch] = useReducer(regReducer, {
    user: null,
    token: null,
  });

  const { login } = useContext(AuthContext); // Accesarea funcției de login din AuthContext

  // Funcția pentru înregistrare
  const register = async (name, email, password) => {
    try {
      // Trimiterea unei cereri POST la endpoint-ul de înregistrare
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Destructurarea tokenului și utilizatorului din datele de răspuns
      const { token, result: user } = response.data;

      // Logarea tokenului în consola pentru debug
      console.log("Token from response:", token);

      // Stocarea tokenului în localStorage
      localStorage.setItem("token", token);

      // Apelarea funcției de login pentru a seta starea de autentificare
      await login(email, password);

      // Opțional: setarea stării de înregistrare (acest pas ar putea fi redundant)
      dispatch({ type: "REGISTER", payload: { user, token } });
    } catch (error) {
      // Logarea erorilor de înregistrare
      console.error("Register error:", error);
    }
  };

  return (
    // Furnizarea stării de înregistrare și funcțiilor consumatorilor contextului
    <RegContext.Provider value={{ ...state, register }}>
      {children}
    </RegContext.Provider>
  );
};

// Validarea tipurilor de prop pentru componenta RegProvider
RegProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
