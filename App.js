import React from "react";
import AppContainer from "./src/navigation";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

export default class App extends React.Component {
  //Custom fonts
  state = {
    isReady: false,
  };

  async _cacheResourcesAsync() {
    return new Promise(async (resolve) => {
      try {
        await Font.loadAsync({
          "open-sans": require("./src/assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
          alfaSlabOne: require("./src/assets/fonts/AlfaSlabOne-Regular.ttf"),
        });
      } catch (error) {
        console.log(error);
      }

      resolve();
      const images = [require("./src/assets/splash.png")];

      const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <AppContainer />;
  }
}
