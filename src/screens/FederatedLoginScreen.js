import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";
import FacebookAuth from "../authentications/FacebookAuth";
import GoogleAuth from "../authentications/GoogleAuth";
//import * as Facebook from "expo-facebook";

//const facebookAppId = Expo.Constants.manifest.extra.fbAppId;

//let provider = new firebase.auth.FacebookAuthProvider();

export const FederatedLoginScreen = ({ navigation }) => {
  //Issue: Currently not working in verison SDK 38. Might use this if the issue is resolved
  //https://github.com/expo/expo/issues/8951
  /*async loginWithFacebook() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      }
    });

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        facebookAppId,
        {
          permissions: ["public_profile", "email"],
        }
      );

      console.log(type);

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        await firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error);
          });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }*/

  return (
    <View style={styles.screen}>
      <Text style={styles.mainTitle}>Signs For Humanity</Text>
      <Text style={styles.messageStyle}>Deaf. Hearing. Together.</Text>
      <View style={styles.fedButtons}>
        <FacebookAuth />
        <GoogleAuth />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsStyle}>
          <Button
            title="Login"
            titleStyle={{
              fontSize: 15,
              color: "black",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            type="clear"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
        <View style={styles.buttonsStyle}>
          <Button
            title="Sign up with email"
            titleStyle={{
              fontSize: 15,
              color: "black",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            type="clear"
            onPress={() => {
              navigation.navigate("Signup");
            }}
          />
        </View>
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
  mainTitle: {
    fontSize: 50,
    paddingBottom: 30,
    color: Colors.primaryColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  messageStyle: {
    paddingBottom: 60,
    fontSize: 25,
    color: "#b3b3b3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsStyle: {
    paddingHorizontal: 8,
  },
  fedButtons: {
    width: "80%",
    margin: 5,
  },
});

export default FederatedLoginScreen;
