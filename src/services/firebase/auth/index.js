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
          profilePhoto: null,
          username: "",
          email,
          displayName: "",
          followingCount: 0,
          followersCount: 0,
          postsCount: 0,
          savesPrivate: true,
          bio: "",
          identify: "",
          languages: [],
          isNewUser: user.additionalUserInfo.isNewUser,
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
          visibilityTime: 2000,
          topOffset: 45,
        });
      });
  });

export const linkWithEmail = (email, password, navigation, hideLoader) =>
  new Promise((resolve, reject) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then((userCred) => {
        console.log("isnewuser " + userCred.additionalUserInfo.isNewUser);
        console.log("email " + userCred.user.email);
        console.log("emailverified " + userCred.user.emailVerified);

        firebase
          .firestore()
          .collection("users")
          .doc(userCred.user.uid)
          .update({
            email: userCred.user.email,
          })
          .then(() => {
            userCred.user.sendEmailVerification();

            hideLoader();

            navigation.pop(2);
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
          visibilityTime: 2000,
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
          visibilityTime: 2000,
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
    const googlePhoto = googleUser.picture.slice(0, googleUser.picture.lastIndexOf("=")) + "=s200-c";
  
    console.log(googlePhoto)
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((user) => {
        console.log(user.user.email);
        console.log(user.user.emailVerified);
        if (user.additionalUserInfo.isNewUser) {
          firebase.firestore().collection("users").doc(user.user.uid).set({
            profilePhoto: googlePhoto,
            username: "",
            email: null,
            displayName: "",
            followingCount: 0,
            followersCount: 0,
            postsCount: 0,
            savesPrivate: true,
            bio: "",
            identify: "",
            languages: [],
            isNewUser: user.additionalUserInfo.isNewUser,
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
          visibilityTime: 2000,
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
        console.log(user.user.email);
        console.log(user.user.emailVerified);
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
                  username: "",
                  email: null,
                  displayName: "",
                  followingCount: 0,
                  followersCount: 0,
                  postsCount: 0,
                  savesPrivate: true,
                  bio: "",
                  identify: "",
                  languages: [],
                  isNewUser: user.additionalUserInfo.isNewUser,
                })
                .catch((error) => {
                  Toast.show({
                    type: "infoError",
                    props: {
                      message: error.message,
                    },
                    visibilityTime: 2000,
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
          visibilityTime: 2000,
          topOffset: 45,
        });
      });
  });
