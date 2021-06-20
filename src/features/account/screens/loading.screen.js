import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export const LoadingScreen = () => {

  return (
    <View style={styles.container}>
      <LottieView
        style={{ height: 300 }}
        source={require("../../../assets/loading-logo.json")}
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
