import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";

const SignupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.textsStyle}>
        <Text style={styles.text1}>Create Account,</Text>
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
      <Button
        title="Login"
        titleStyle={{
          fontSize: 20,
          fontFamily: "open-sans-bold",
        }}
        buttonStyle={{
          marginTop: 90,
          borderRadius: 15,
          height: 60,
          width: 340,
          backgroundColor: Colors.primaryColor,
        }}
      />
      <View style={styles.textSignInContainer}>
        <Text style={styles.text3}>I'm already a member,</Text>
        <Button
          title="Sign in"
          titleStyle={{
            fontSize: 15,
            bottom: 11,
            fontFamily: "open-sans"
          }}
          type="clear"
          onPress={() => {
            props.navigation.navigate({ routeName: "Login" });
          }}
        />
      </View>
    </View>
  );
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
    fontFamily: "open-sans"
  },
});

export default SignupScreen;
