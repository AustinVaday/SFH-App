import React from "react";
import { enableScreens } from "react-native-screens";
import AppContainer from "./navigation";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./Config/config";
import { AppLoading } from "expo";
import * as Font from 'expo-font';



//firebase.initializeApp(firebaseConfig);


enableScreens();

export default class App extends React.Component {
  //Custom fonts


  //Setup Firebase
  //constructor() {
  //  super();
  //  this.initializeFirebase();
  //}

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
      await Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        "alfaSlabOne": require("./assets/fonts/AlfaSlabOne-Regular.ttf"),
      });
      this.setState({ fontLoaded: true});
    }

  //initializeFirebase = () => {
  //  firebase.initializeApp(firebaseConfig);
  //};

  render() {
    const {fontLoaded} = this.state;

    if (fontLoaded) {
      return <AppContainer />;
    }
      return <AppLoading />;
  }
}

//export default App;
