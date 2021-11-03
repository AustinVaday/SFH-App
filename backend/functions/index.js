const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addFollower = functions.firestore
    .document("/following/{userId}/userFollowing/{FollowingId}")
    .onCreate((snap, context) => {
      return db
          .collection("users")
          .doc(context.params.FollowingId)
          .update({
            followersCount: admin.firestore.FieldValue.increment(1),
          })
          .then(() => {
            return db
                .collection("users")
                .doc(context.params.userId)
                .update({
                  followingCount: admin.firestore.FieldValue.increment(1),
                });
          });
    });

exports.removeFollower = functions.firestore
    .document("/following/{userId}/userFollowing/{FollowingId}")
    .onDelete((snap, context) => {
      return db
          .collection("users")
          .doc(context.params.FollowingId)
          .update({
            followersCount: admin.firestore.FieldValue.increment(-1),
          })
          .then(() => {
            return db
                .collection("users")
                .doc(context.params.userId)
                .update({
                  followingCount: admin.firestore.FieldValue.increment(-1),
                });
          });
    });
