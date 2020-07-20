import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onSignIn = () => {};

  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          alert("User already exists. Try again.");
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };

  render() {
    return (
      <View style={styles.screen}>
        <Text>Logo (Sign for Humanity)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            style={styles.input}
          />
        </View>
        <Button title="Submit" onPress={this.onSignUp} />
        <Button
          title="Sign up"
          onPress={() => {
            props.navigation.navigate({ routeName: "Signup" });
          }}
        />
        <Button
          title="Skip Login"
          onPress={() => {
            this.props.navigation.navigate({ routeName: "App" });
          }}
        />
      </View>
    );
  }
}

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
