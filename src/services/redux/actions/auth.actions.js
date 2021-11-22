import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";
require("firebase/firebase-auth");
require("firebase/firestore");

import { USER_STATE_CHANGE, LOADING } from "../constants";
import { getPostsByUser, getPostsForDiscover, fetchUserFollowing } from "./post.actions";

export const userAuthStateListener = () => (dispatch) => {
  dispatch({ type: LOADING, loading: true });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData(user.uid));
      dispatch(getPostsByUser(user.uid));
      dispatch(getPostsForDiscover());
      dispatch(fetchUserFollowing());
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
    .onSnapshot((res) => {
      if (res.exists) {
        return dispatch({
          type: USER_STATE_CHANGE,
          currentUser: res.data(),
          loaded: true,
        });
      }
    });
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
