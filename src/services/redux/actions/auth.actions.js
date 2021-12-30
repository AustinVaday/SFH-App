import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";
require("firebase/firebase-auth");
require("firebase/firestore");

import { USER_STATE_CHANGE, LOADING } from "../constants";
import { getPostsByUser, getPostsForDiscover, fetchUserFollowing, fetchUserChats, getUserNotifications } from "./post.actions";

export const userAuthStateListener = () => (dispatch) => {
  dispatch({ type: LOADING, loading: true });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData(user.uid));
      dispatch(getPostsByUser(user.uid));
      dispatch(getUserNotifications(user.uid));
      dispatch(getPostsForDiscover());
      dispatch(fetchUserFollowing());
      dispatch(fetchUserChats());
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });

  dispatch({ type: LOADING, loading: false });
};

export const getCurrentUserData = (uid) => (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((user) => {
      if (user.exists) {
        dispatch({
          type: USER_STATE_CHANGE,
          currentUser: user.data(),
          loaded: true,
        });

        dispatch(setNotificationService(user.data().id, user.data().notificationToken));
      }
    });
};

export const setNotificationService = (uid, userToken) => async (dispatch) => {
  console.log("checking token")
  let token;

  if (Constants.isDevice) {
    const existingStatus = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus.status !== "granted") {
      const status = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus.status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
  } else {
    alert("Must use physical device for Push Notifications");
  }
  
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (token.data !== userToken) {
    console.log("getting token")
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        notificationToken: token.data,
      });
  }
};

export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOADING, loading: true });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: LOADING, loading: false });
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        topOffset: 45,
      });
      dispatch({ type: LOADING, loading: false });
    });
};

export const register =
  (email, password, displayName, username) => (dispatch) => {
    dispatch({ type: LOADING, loading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            profilePhoto: null,
            username,
            email,
            displayName,
            followingCount: 0,
            followersCount: 0,
            bio: "",
            identify: "none",
            id: firebase.auth().currentUser.uid,
          });
        dispatch({ type: LOADING, loading: false });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
          topOffset: 45,
        });
        dispatch({ type: LOADING, loading: false });
      });
  };

export const passwordReset = (email) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: LOADING, loading: true });

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve();
        dispatch({ type: LOADING, loading: false });
      })
      .catch(() => {
        reject();
        dispatch({ type: LOADING, loading: false });
      });
  });

export const onGoogleSignIn = (credential) => (dispatch) => {
  dispatch({ type: LOADING, googleLoading: true });

  const randomNumber = Math.floor(Math.random() * 500) + 1;

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((user) => {
      if (user.additionalUserInfo.isNewUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({
            profilePhoto: user.user.photoURL,
            username: `username${randomNumber}`,
            email: user.user.email,
            displayName: user.user.displayName,
            followingCount: 0,
            followersCount: 0,
            bio: "",
            identify: "none",
          });
      }
      dispatch({ type: LOADING, googleLoading: false });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: LOADING, googleLoading: false });
    });
};

export const onFacebookSignIn = (credential) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: LOADING, facebookLoading: true });

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((u) => {
        resolve();
        dispatch({ type: LOADING, facebookLoading: false });
      })
      .catch((e) => {
        reject();
        dispatch({ type: LOADING, facebookLoading: false });
      });
  });
