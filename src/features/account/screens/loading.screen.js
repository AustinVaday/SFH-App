import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoadingScreen = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Authentications");
    }
  }, []);

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
