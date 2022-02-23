const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addFollow = functions.firestore
    .document("/follows/{userId}/userFollowings/{followingId}")
    .onCreate((snap, context) => {
      db.collection("users")
          .doc(context.params.followingId)
          .update({
            followersCount: admin.firestore.FieldValue.increment(1),
          })
          .then(() => {
            db.collection("users")
                .doc(context.params.userId)
                .update({
                  followingCount: admin.firestore.FieldValue.increment(1),
                });
          });
    });

exports.removeFollow = functions.firestore
    .document("/follows/{userId}/userFollowings/{followingId}")
    .onDelete((snap, context) => {
      db.collection("users")
          .doc(context.params.followingId)
          .update({
            followersCount: admin.firestore.FieldValue.increment(-1),
          })
          .then(() => {
            db.collection("users")
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

exports.deleteComment = functions.firestore
    .document("/posts/{postId}/comments/{userId}")
    .onDelete((snap, context) => {
      return db
          .collection("posts")
          .doc(context.params.postId)
          .update({
            commentsCount: admin.firestore.FieldValue.increment(-1),
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
