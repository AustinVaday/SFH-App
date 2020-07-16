import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Button, Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import * as Facebook from "expo-facebook";

//const facebookAppId = "3660283703988232";
//const androidClientId = {
// ANDROID_CLIENT_ID,
//};
const IOSClientId =
  "255319757799-4i4ju8pq20t1t3c8h4ohqn6froe9u41j.apps.googleusercontent.com";

class FederatedLoginScreen extends Component {
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
        //androidClientId: YOUR_CLIENT_ID_HERE,
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

  async loginWithFacebook() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "3660283703988232",
        {
          permissions: ["public_profile"],
        }
      );

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        //const response = await fetch(
        //  `https://graph.facebook.com/me?access_token=${token}`
        //);
        //alert("Logged in!", `Hi ${(await response.json()).name}!`);
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        console.log(credential);
        await firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error);
          });
        /*await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        alert("Logged in!", `Hi ${(await response.json()).name}!`);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential);*/
        //.catch((error) => {
        //  console.log(error);
        //});
      } //else {
      // type === 'cancel'
      //}
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.mainTitle}>Signs For Humanity</Text>
        <Text style={styles.messageStyle}>Deaf. Hearing. Together.</Text>
        <View style={styles.fedButtons}>
          <Button
            title="Continue with Facebook"
            onPress={this.loginWithFacebook}
            titleStyle={{
              padding: 10,
              fontSize: 20,
              fontFamily: "open-sans",
            }}
            buttonStyle={{
              margin: 10,
              height: 60,
              backgroundColor: "#4267B2",
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
              <Icon
                name="logo-facebook"
                type="ionicon"
                size={40}
                color="white"
              />
            }
          />
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
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsStyle}>
            <Button
              title="Login"
              titleStyle={{
                fontSize: 15,
                color: "black",
                fontFamily: "open-sans",
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
                this.props.navigation.navigate({ routeName: "Login" });
              }}
            />
          </View>
          <View style={styles.buttonsStyle}>
            <Button
              title="Sign up with email"
              titleStyle={{
                fontSize: 15,
                color: "black",
                fontFamily: "open-sans",
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
                this.props.navigation.navigate({ routeName: "Signup" });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
    fontFamily: "alfaSlabOne",
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
    fontFamily: "open-sans-bold",
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
