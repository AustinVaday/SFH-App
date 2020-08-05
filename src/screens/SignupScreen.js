import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase/app";
import "firebase/auth";

export default class SignupScreen extends Component {
  constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			isLoading: false,
		};
  }
  
  onSignUp = async () => {
  if (this.state.email && this.state.password) {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
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
        <View style={styles.textsStyle}>
          <Text style={styles.text1}>Create Account</Text>
          <Text style={styles.text2}>Sign up to get started!</Text>
        </View>
        <View>
          <TextInput
            style={{
              justifyContent: "center",
              width: 340,
              height: 60,
              fontSize: 18,
              margin: 5,
            }}
            mode="outlined"
            label="Full Name"
            theme={{
              roundness: 15,
              colors: {
                primary: Colors.primaryColor,
                nderlineColor: "blue",
                placeholder: "#cecbce",
                background: Colors.secondaryColor,
              },
            }}
          />
        </View>
        <View>
          <TextInput
            style={{
              justifyContent: "center",
              width: 340,
              height: 60,
              fontSize: 18,
              margin: 5,
            }}
            mode="outlined"
            label="Email"
            keyboardType='email-address'
						onChangeText={(email) => this.setState({ email })}
            theme={{
              roundness: 15,
              colors: {
                primary: Colors.primaryColor,
                nderlineColor: "blue",
                placeholder: "#cecbce",
                background: Colors.secondaryColor,
              },
            }}
          />
        </View>
        <View>
          <TextInput
            style={{
              justifyContent: "center",
              width: 340,
              height: 60,
              fontSize: 18,
              margin: 5,
            }}
            mode="outlined"
            label="Password"
            secureTextEntry
						onChangeText={(password) => this.setState({ password })}
            theme={{
              roundness: 15,
              colors: {
                primary: Colors.primaryColor,
                nderlineColor: "blue",
                placeholder: "#cecbce",
                background: Colors.secondaryColor,
              },
            }}
          />
        </View>
        <TouchableOpacity onPress={this.onSignUp}>
          <LinearGradient
            colors={[Colors.primaryColor, "#6dd5ed"]}
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 15,
              height: 60,
              width: 340,
              marginTop: 90,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text
              style={{
                backgroundColor: "transparent",
                fontSize: 20,
                color: "#fff",
                fontFamily: "open-sans-bold",
              }}
            >
              Login
        </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.textSignInContainer}>
          <Text style={styles.text3}>I'm already a member,</Text>
          <Button
            title="Sign in"
            titleStyle={{
              fontSize: 15,
              bottom: 11,
              fontFamily: "open-sans",
            }}
            type="clear"
            onPress={() => {
              props.navigation.navigate({ routeName: "Login" });
            }}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
  },
  textsStyle: {
    paddingRight: 60,
    paddingBottom: 100,
  },
  text1: {
    right: 3,
    fontSize: 35,
    fontFamily: "open-sans-bold",
  },
  text2: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
    color: "#bdc3d4",
  },
  textSignInContainer: {
    flexDirection: "row",
    paddingTop: 120,
    top: 60,
  },
  text3: {
    fontFamily: "open-sans",
  },
});
