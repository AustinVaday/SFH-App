import Toast from "react-native-toast-message";

import jwt_decode from "jwt-decode";
import axios from "axios";
import { firebase } from "../../../utils/firebase";

export const login = (email, password, setError, setLoading) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setLoading(false))
      .catch(() => {
        setError("Incorrect email or password.");
        setLoading(false);
      });
  });

export const registerWithEmail = (email, password, hideLoader) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.firestore().collection("users").doc(user.user.uid).set({
          // this is temporary for profile photo. This will be removed
          // when found using service to stream videos and pictures
          profilePhoto:
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E",
          username: null,
          email,
          displayName: null,
          followingCount: 0,
          followersCount: 0,
          wordsCount: 0,
          bio: null,
          identify: null,
          languages: [],
          providerId: "password",
          isNewUser: user.additionalUserInfo.isNewUser,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        });

        user.user.sendEmailVerification();

        hideLoader();
      })
      .catch((error) => {
        hideLoader();

        Toast.show({
          type: "infoError",
          props: {
            message: error.message,
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  });

export const changeEmail = (
  newEmail,
  currentPassword,
  navigation,
  setError,
  showLoader,
  hideLoader
) =>
  new Promise((resolve, reject) => {
    firebase;
    let emailMethod =
      firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD;

    firebase
      .auth()
      .fetchSignInMethodsForEmail(newEmail)
      .then((signInMethods) => {
        if (signInMethods.indexOf(emailMethod) !== -1) {
          setError("The email address is already registered.");
        } else {
          showLoader();

          reauthenticateUserWithEmail(currentPassword)
            .then(() => {
              let user = firebase.auth().currentUser;

              user
                .updateEmail(newEmail)
                .then(() => {
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({
                      email: newEmail,
                    })
                    .then(() => {
                      hideLoader();

                      user.sendEmailVerification();

                      navigation.pop(2);

                      Toast.show({
                        type: "infoSuccess",
                        props: {
                          message: "Your new email was successfully updated.",
                        },
                        visibilityTime: 2000,
                        topOffset: 45,
                      });
                    });
                })
                .catch((error) => {
                  hideLoader();

                  Toast.show({
                    type: "infoError",
                    props: {
                      message: error.message,
                    },
                    visibilityTime: 2000,
                    topOffset: 45,
                  });
                });
            })
            .catch(() => {
              hideLoader();

              setError("Incorrect password.");
            });
        }
      })
      .catch((error) => {
        hideLoader();

        Toast.show({
          type: "infoError",
          props: {
            message: error.message,
          },
          visibilityTime: 2000,
          topOffset: 45,
        });
      });
  });

export const changePassword = (newPassword, navigation, hideLoader) =>
  new Promise((resolve, reject) => {
    let user = firebase.auth().currentUser;

    user
      .updatePassword(newPassword)
      .then(() => {
        hideLoader();

        navigation.pop(3);

        Toast.show({
          type: "infoSuccess",
          props: {
            message: "Your new password was successfully updated.",
          },
          visibilityTime: 2000,
          topOffset: 45,
        });
      })
      .catch((error) => {
        hideLoader();

        Toast.show({
          type: "infoError",
          props: {
            message: error.message,
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  });

export const reauthenticateUserWithEmail = (currentPassword) =>
  new Promise((resolve, reject) => {
    let user = firebase.auth().currentUser;

    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateUser = (displayName, username, hideLoader) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        displayName,
        username,
        usernameLowercase: username.toLowerCase(),
        isNewUser: false,
      })
      .catch((error) => {
        Toast.show({
          type: "infoError",
          props: {
            message: error.message,
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
    hideLoader();
  });

export const checkAvailableUsername = (username) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .where("usernameLowercase", "==", username)
      .get()
      .then((snapshot) => {
        resolve(snapshot.empty);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const passwordReset = (email, setError, setLoading, navigation) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);

        navigation.navigate("EmailSent");
      })
      .catch(() => {
        setError("Incorrect email.");
        setLoading(false);
      });
  });

export const onGoogleSignIn = (idToken, hideLoader) =>
  new Promise((resolve, reject) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    const googleUser = jwt_decode(idToken);

    // to change the image sizing for clear picture on profile photo
    const googlePhoto =
      googleUser.picture.slice(0, googleUser.picture.lastIndexOf("=")) +
      "=s200-c";

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((user) => {
        if (user.additionalUserInfo.isNewUser) {
          firebase.firestore().collection("users").doc(user.user.uid).set({
            profilePhoto: googlePhoto,
            username: null,
            email: null,
            displayName: null,
            followingCount: 0,
            followersCount: 0,
            wordsCount: 0,
            bio: null,
            identify: null,
            languages: [],
            providerId: "google",
            isNewUser: user.additionalUserInfo.isNewUser,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
        hideLoader();
      })
      .catch((error) => {
        hideLoader();

        Toast.show({
          type: "infoError",
          props: {
            message: error.message,
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  });

export const onFacebookSignIn = (accessToken, hideLoader) =>
  new Promise((resolve, reject) => {
    const credential =
      firebase.auth.FacebookAuthProvider.credential(accessToken);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((user) => {
        if (user.additionalUserInfo.isNewUser) {
          axios
            .get(
              `https://graph.facebook.com/me?fields=email,picture.type(large)&access_token=${accessToken}`
            )
            .then((response) => {
              firebase
                .firestore()
                .collection("users")
                .doc(user.user.uid)
                .set({
                  profilePhoto: response.data.picture.data.url,
                  username: null,
                  email: null,
                  displayName: null,
                  followingCount: 0,
                  followersCount: 0,
                  wordsCount: 0,
                  bio: null,
                  identify: null,
                  languages: [],
                  providerId: "facebook",
                  isNewUser: user.additionalUserInfo.isNewUser,
                  creation: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .catch((error) => {
                  Toast.show({
                    type: "infoError",
                    props: {
                      message: error.message,
                    },
                    visibilityTime: 3000,
                    topOffset: 45,
                  });
                });
              hideLoader();
            });
        }
      })
      .catch((error) => {
        hideLoader();

        Toast.show({
          type: "infoError",
          props: {
            message: error.message,
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  });
