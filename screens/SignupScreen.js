import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const SignupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Signup Screen</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <Button
        title="Submit"
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
  inputContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    margin: 5,
  },
  input: {
    width: 225,
    height: 45,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 45,
    backgroundColor: "#ECECEC",
  },
});

export default SignupScreen;
