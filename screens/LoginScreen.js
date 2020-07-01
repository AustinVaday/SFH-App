import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Login Screen</Text>
      <Button
        title="Sign up"
        onPress={() => {
          props.navigation.navigate({ routeName: "Signup" });
        }}
      />
      <Button
        title="Log in"
        onPress={() => {
          props.navigation.navigate({ routeName: "App" });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
