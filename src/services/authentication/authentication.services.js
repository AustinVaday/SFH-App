import firebase from "firebase";

export const loginRequest = async (email, password) =>
  await firebase.auth().signInWithEmailAndPassword(email, password);

export const passwordResetRequest = async (email) =>
  await firebase.auth().sendPasswordResetEmail(email);