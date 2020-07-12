import React from "react";
import { enableScreens } from "react-native-screens";
import AppContainer from "./navigation";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./Config/config";

enableScreens();

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return <AppContainer />;
  }
}

export default App;
