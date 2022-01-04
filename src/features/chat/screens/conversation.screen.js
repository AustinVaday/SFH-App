import React, { useState, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SenderMessage } from "../components/sender-message.components";
import { ReceiverMessage } from "../components/receiver-message.components";

import { firebase } from "../../../utils/firebase";
import { fetchUserChats } from "../../../services/redux/actions/post.actions";
import { useSelector, useDispatch } from "react-redux";
import { sendNotification } from "../../../services/user";

import {
  ConversationBackground,
  MessageInputSection,
  MessageInput,
  SendButton,
  ViewKeyboardAvoiding,
} from "../styles/conversation.styles";

export const ConversationScreen = ({ route }) => {
  const { user } = route.params;
  const { currentUser } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.posts);

  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [input, setInput] = useState("");
  const [initialFetch, setInitialFetch] = useState(false);
  const notificationListener = useRef();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (initialFetch) {
    //   return;
    // }

    const chat = chats.find((el) => el.users.includes(user.id));
    setChat(chat);

    if (chat !== undefined) {
      firebase
        .firestore()
        .collection("chats")
        .doc(chat.id)
        .collection("messages")
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          setMessages(messages);
        });

      firebase
        .firestore()
        .collection("chats")
        .doc(chat.id)
        .update({
          [currentUser.id]: true,
        });

      // setInitialFetch(true);
    } else {
      createChat();
    }
  }, [user, chats]);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        Toast.hide();
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  const createChat = () => {
    firebase
      .firestore()
      .collection("chats")
      .add({
        users: [currentUser.id, user.id],
        lastMessage: "Send the first message",
        lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch(fetchUserChats());
      });
  };

  const sendMessage = () => {
    const textToSend = input;

    if (input.length === 0) {
      return;
    }

    setInput("");

    firebase
      .firestore()
      .collection("chats")
      .doc(chat.id)
      .collection("messages")
      .add({
        creator: currentUser.id,
        text: textToSend,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      });

    firebase
      .firestore()
      .collection("chats")
      .doc(chat.id)
      .update({
        lastMessage: textToSend,
        lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        [currentUser.id]: true,
        [user.id]: false,
      });

      sendNotification(user, "New Message", textToSend, {
        type: "chat",
        user: currentUser,
        message: textToSend,
      });
  };

  return (
    <ConversationBackground style={{ paddingBottom: insets.bottom }}>
      <ViewKeyboardAvoiding keyboardVerticalOffset={65 + insets.bottom}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item: message }) =>
            message.creator === currentUser.id ? (
              <SenderMessage key={message.id} message={message} />
            ) : (
              <ReceiverMessage
                key={message.id}
                message={message}
                otherUser={user}
              />
            )
          }
          inverted={-1}
        />

        <MessageInputSection>
          <MessageInput
            placeholder="Send a message..."
            onChangeText={setInput}
            value={input}
            onSubmitEditing={sendMessage}
          />
          <SendButton
            input={input}
            disabled={input === "" ? true : false}
            onPress={sendMessage}
          />
        </MessageInputSection>
      </ViewKeyboardAvoiding>
    </ConversationBackground>
  );
};
