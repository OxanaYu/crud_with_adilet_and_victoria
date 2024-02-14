import React, { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import fire from "../../fire";
export const authContext = createContext();
export const useAuth = () => useContext(authContext);
const AuthContext = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");
  const navigate = useNavigate();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };
  // ! Register start
  const handleRegister = () => {
    clearError();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
            break;
          default:
        }
      });
  };
  const values = {
    user,
    email,
    password,
    emailError,
    passwordError,
    hasAccount,
    setHasAccount,
    setUser,
    setEmail,
    setPassword,
    setEmailError,
    setPasswordError,
    handleRegister,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContext;
