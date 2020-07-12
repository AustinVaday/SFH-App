import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const SignupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Signup Screen</Text>
      <Button
        title="Fill info and log in!"
        onPress={() => {
          props.navigation.navigate({ routeName: "HomeNav" });
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

export default SignupScreen;
