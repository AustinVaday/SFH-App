import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import { SenderMessage } from "../components/sender-message.components";
import { ReceiverMessage } from "../components/receiver-message.components";

import { firebase } from "../../../utils/firebase";
import { fetchChats } from "../../../services/redux/actions/chats.actions";
import { useSelector, useDispatch } from "react-redux";
import { sendNotification } from "../../../services/firebase/notifications";

import {
  ConversationBackground,
  MessageInputSection,
  MessageInput,
  SendButton,
  ViewKeyboardAvoiding,
  Navbar,
  ReportIcon,
  BlockIcon,
  ConversationSettingsIcon,
} from "./styles/conversation.styles";

export const ConversationScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const { currentUser } = useSelector((state) => state.user);
  const { currentUserChats } = useSelector((state) => state.chats);

  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [input, setInput] = useState("");

  const notificationListener = useRef();
  const conversationSettingsSheetRef = useRef();

  const snapPoints = useMemo(() => ["20%"], []);

  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ConversationSettingsIcon
          onPress={() => conversationSettingsSheetRef.current?.present()}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const chat = currentUserChats.find((el) => el.users.includes(user.id));
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
    } else {
      createChat();
    }
  }, [user, currentUserChats]);

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
        dispatch(fetchChats());
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

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderConversationSettings = useCallback(() => {
    return (
      <>
        <ListItem onPress={() => console.log("Report")}>
          <ReportIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Report</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => console.log("Block")}>
          <BlockIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Block</Text>
          </ListItem.Content>
        </ListItem>
      </>
    );
  }, []);

  return (
    <ConversationBackground style={{ paddingBottom: insets.bottom }}>
      <ViewKeyboardAvoiding keyboardVerticalOffset={85}>
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
                navigation={navigation}
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

      <BottomSheetModal
        ref={conversationSettingsSheetRef}
        key="conversation-settings-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        children={renderConversationSettings}
      />
    </ConversationBackground>
  );
};
