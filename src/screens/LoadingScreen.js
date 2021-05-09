import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import firebase from "firebase";
import LottieView from 'lottie-react-native';

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log("AUTH STATE CHANGED CALLED ");
        if (user) {
          this.props.navigation.navigate({ routeName: "Home" });
        } else {
          this.props.navigation.navigate({ routeName: "FederatedLogin" });
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView style={{ height: 300}} source={require("../assets/loading-logo.json")} autoPlay loop />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
