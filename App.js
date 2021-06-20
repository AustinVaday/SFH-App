import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import firebase from "firebase/app";
// import AppLoading from "expo-app-loading";
// import * as Font from "expo-font";
// import { Asset } from "expo-asset";
import { Navigation } from "./src/infrastructure/navigation";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
  MEASUREMENTID,
} from "@env";
import {
  AuthenticationContextProvider
} from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
