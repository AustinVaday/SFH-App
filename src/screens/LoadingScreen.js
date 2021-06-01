import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import firebase from "firebase";
import LottieView from "lottie-react-native";

export const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log("AUTH STATE CHANGED CALLED ");
        if (user) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("FederatedLogin");
        }
      }.bind(this)
    );
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={{ height: 300 }}
        source={require("../assets/loading-logo.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
