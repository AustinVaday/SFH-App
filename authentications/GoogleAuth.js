import React, { Component } from "react";
import { Button, Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { googleConfig } from "../Config/config";

const androidClientId = googleConfig.aClientId;
const IOSClientId = googleConfig.iClientId;

export default class GoogleAuth extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in ");
              /*if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }*/
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              console.log(errorCode);
              var errorMessage = error.message;
              console.log(errorMessage);

              // The email of the user's account used.
              var email = error.email;
              console.log(email);

              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              console.log(credential);
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  //Google auth login
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        //behavior: "web",
        iosClientId: IOSClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        console.log("LoginScreen.js.js 30 | ", result.user.givenName);
        //this.props.navigation.navigate("Profile", {
        //  username: result.user.givenName
        //});
        console.log("success Google login");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 40 | Error with Google login", e);
      return { error: true };
    }
  };

  render() {
    return (
      <Button
        title="Continue with Google"
        onPress={this.signInWithGoogle}
        titleStyle={{
          padding: 10,
          fontSize: 20,
          fontFamily: "open-sans",
        }}
        buttonStyle={{
          margin: 10,
          height: 60,
          backgroundColor: "#DB4437",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.17,
          shadowRadius: 5.49,

          elevation: 12,
        }}
        icon={
          <Icon name="logo-google" type="ionicon" size={40} color="white" />
        }
      />
    );
  }
}
