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

exports.addComment = functions.firestore
    .document("/posts/{postId}/comments/{userId}")
    .onCreate((snap, context) => {
      return db
          .collection("posts")
          .doc(context.params.postId)
          .update({
            commentsCount: admin.firestore.FieldValue.increment(1),
          });
    });

exports.addVote = functions.firestore
    .document("/posts/{postId}/votes/{uid}")
    .onCreate((snap, context) => {
      const userVote = snap.data();

      if (userVote.upvoted) {
        return db
            .collection("posts")
            .doc(context.params.postId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(1),
            });
      } else {
        return db
            .collection("posts")
            .doc(context.params.postId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-1),
            });
      }
    });

exports.updateVote = functions.firestore
    .document("/posts/{postId}/votes/{uid}")
    .onUpdate((snap, context) => {
      const newUserVote = snap.after.data();

      if (newUserVote.upvoted) {
        return db
            .collection("posts")
            .doc(context.params.postId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(2),
            });
      } else {
        return db
            .collection("posts")
            .doc(context.params.postId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-2),
            });
      }
    });

exports.deleteVote = functions.firestore
    .document("/posts/{postId}/votes/{uid}")
    .onDelete((snap, context) => {
      const userVote = snap.data();

      if (userVote.upvoted) {
        return db
            .collection("posts")
            .doc(context.params.postId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-1),
            });
      } else {
        return db
            .collection("posts")
            .doc(context.params.postId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(1),
            });
      }
    });
