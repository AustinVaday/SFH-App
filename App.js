import React from "react";
import { enableScreens } from "react-native-screens";
import AppContainer from "./src/navigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { firebaseConfig } from "./Config/FirebaseConfig/config";
import firebase from "firebase";

enableScreens();

export default class App extends React.Component {
  _isMounted = false;

  //Custom fonts
  state = {
    fontLoaded: false,
  };

  constructor() {
    super();
    this.initializeFirebase();
  }

  async componentDidMount() {
    this._isMounted = true;
    await Font.loadAsync({
      "open-sans": require("./src/assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
      alfaSlabOne: require("./src/assets/fonts/AlfaSlabOne-Regular.ttf"),
    });
    if (this._isMounted) {
      this.setState({ fontLoaded: true });
    }
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { fontLoaded } = this.state;

    if (fontLoaded) {
      return <AppContainer />;
    }
    return <AppLoading />;
  }
}
