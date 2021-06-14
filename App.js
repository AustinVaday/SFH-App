import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
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
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

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
