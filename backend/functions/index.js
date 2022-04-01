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
    .document("/words/{wordId}/comments/{userId}")
    .onCreate((snap, context) => {
      return db
          .collection("words")
          .doc(context.params.wordId)
          .update({
            commentsCount: admin.firestore.FieldValue.increment(1),
          });
    });

exports.deleteComment = functions.firestore
    .document("/words/{wordId}/comments/{userId}")
    .onDelete((snap, context) => {
      return db
          .collection("words")
          .doc(context.params.wordId)
          .update({
            commentsCount: admin.firestore.FieldValue.increment(-1),
          });
    });

exports.addWordVote = functions.firestore
    .document("/word/{wordId}/votes/{uid}")
    .onCreate((snap, context) => {
      const userVote = snap.data();

      if (userVote.upvoted) {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(1),
            });
      } else {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-1),
            });
      }
    });

exports.updateWordVote = functions.firestore
    .document("/words/{wordId}/votes/{uid}")
    .onUpdate((snap, context) => {
      const newUserVote = snap.after.data();

      if (newUserVote.upvoted) {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(2),
            });
      } else {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-2),
            });
      }
    });

exports.deleteWordVote = functions.firestore
    .document("/words/{wordId}/votes/{uid}")
    .onDelete((snap, context) => {
      const userVote = snap.data();

      if (userVote.upvoted) {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-1),
            });
      } else {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(1),
            });
      }
    });

exports.addWordCount = functions.firestore
    .document("/words/{wordId}")
    .onCreate((snap, context) => {
      const wordData = snap.data();

      return db
          .collection("users")
          .doc(wordData.creator)
          .update({
            wordsCount: admin.firestore.FieldValue.increment(1),
          });
    });

exports.deleteWordCount = functions.firestore
    .document("/words/{wordId}")
    .onDelete((snap, context) => {
      const wordData = snap.data();

      return db
          .collection("users")
          .doc(wordData.creator)
          .update({
            wordsCount: admin.firestore.FieldValue.increment(-1),
          });
    });

exports.addCommentVote = functions.firestore
    .document("/words/{wordId}/comments/{commentId}/votes/{uid}")
    .onCreate((snap, context) => {
      const userVote = snap.data();

      if (userVote.upvoted) {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .collection("comments")
            .doc(context.params.commentId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(1),
            });
      } else {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .collection("comments")
            .doc(context.params.commentId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-1),
            });
      }
    });

exports.updateCommentVote = functions.firestore
    .document("/words/{wordId}/comments/{commentId}/votes/{uid}")
    .onUpdate((snap, context) => {
      const newUserVote = snap.after.data();

      if (newUserVote.upvoted) {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .collection("comments")
            .doc(context.params.commentId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(2),
            });
      } else {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .collection("comments")
            .doc(context.params.commentId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-2),
            });
      }
    });

exports.deleteCommentVote = functions.firestore
    .document("/words/{wordId}/comments/{commentId}/votes/{uid}")
    .onDelete((snap, context) => {
      const userVote = snap.data();

      if (userVote.upvoted) {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .collection("comments")
            .doc(context.params.commentId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(-1),
            });
      } else {
        return db
            .collection("words")
            .doc(context.params.wordId)
            .collection("comments")
            .doc(context.params.commentId)
            .update({
              votesCount: admin.firestore.FieldValue.increment(1),
            });
      }
    });
