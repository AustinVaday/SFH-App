import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const LoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Logo (Sign for Humanity)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
        />
      </View>
      <Button
        title="Submit"
        onPress={() => {
          props.navigation.navigate({ routeName: "App" });
        }}
      />
      <Button
        title="Sign up"
        onPress={() => {
          props.navigation.navigate({ routeName: "Signup" });
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
    backgroundColor: "#F8F8F8",
    padding: 20,
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

export default LoginScreen;
