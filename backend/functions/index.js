const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.newUser = functions.auth.user().onCreate((user) => {
  return db
      .collection("users")
      .doc(user.uid)
      .set({
        displayName: user.displayName,
        email: user.email,
      });
});
