import React, { useState, createContext, useEffect } from "react";
import { firebase } from "../../utils/firebase";

import { loginRequest, passwordResetRequest } from "./authentication.services";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      try {
        await firebase.auth().onAuthStateChanged((usr) => {
          if (usr) {
            setUser(usr);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = async (email, password) => {
    setIsLoading(true);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onPasswordReset = (email) => {
    setIsLoading(true);

    passwordResetRequest(email)
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onFacebookOrGoogleSignIn = async (credential) => {
    setIsLoading(true);

    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = async () => {
    setIsLoading(true);
    setUser(null);
    await firebase.auth().signOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        onFacebookOrGoogleSignIn,
        onPasswordReset,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
