import React from "react";
// import AppContainer from "./src/navigation";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
// import AppLoading from "expo-app-loading";
// import * as Font from "expo-font";
// import { Asset } from "expo-asset";
import { Navigation } from "./src/infrastructure/navigation";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";

export default function App() {
  //Custom fonts
  // state = {
  //   isReady: false,
  // };

  // async _cacheResourcesAsync() {
  //   return new Promise(async (resolve) => {
  //     try {
  //       await Font.loadAsync({
  //         "open-sans": require("./src/assets/fonts/OpenSans-Regular.ttf"),
  //         "open-sans-bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
  //         alfaSlabOne: require("./src/assets/fonts/AlfaSlabOne-Regular.ttf"),
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     resolve();
  //     const images = [require("./src/assets/splash.png")];

  //     const cacheImages = images.map((image) => {
  //       return Asset.fromModule(image).downloadAsync();
  //     });
  //   });
  // }

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
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
        <Navigation />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );

  // if (!this.state.isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={this._cacheResourcesAsync}
  //       onFinish={() => this.setState({ isReady: true })}
  //       onError={console.warn}
  //     />
  //   );
  // }
  // return <Navigation />;
}
