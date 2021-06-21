import firebase from "firebase";

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const passwordResetRequest = (email) =>
  firebase.auth().sendPasswordResetEmail(email);