import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";

import { loginRequest, passwordResetRequest } from "./authentication.services";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = AsyncStorage.getItem("accountCredentials")
      .then((result) => {
        if (result !== null) {
          setUser(JSON.parse(result));
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        setError(err.toString());
      });
    const unlisten = firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    getUser();
    unlisten();
  }, []);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        // setUser(u);
        AsyncStorage.setItem("accountCredentials", JSON.stringify(u))
          .then(() => {
            setUser(u);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err.toString());
          });
        // setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password) => {
    setIsLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        // setUser(u);
        AsyncStorage.setItem("accountCredentials", JSON.stringify(u))
          .then(() => {
            setUser(u);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err.toString());
          });
        // setIsLoading(false);
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

  const onFacebookOrGoogleSignIn = (credential) => {
    setIsLoading(true);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((u) => {
        // setUser(u);
        AsyncStorage.setItem("accountCredentials", JSON.stringify(u))
          .then(() => {
            setUser(u);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err.toString());
          });
        // setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    AsyncStorage.removeItem("accountCredentials")
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        setError(err.toString());
      });
    firebase.auth().signOut();
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
