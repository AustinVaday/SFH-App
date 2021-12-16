import React, { useRef, useCallback, useMemo } from "react";
import { Platform, Alert, ActivityIndicator } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Text } from "../../../components/typography/text.components";
import { timeDifference } from "../../../components/utilities/time-difference.components";
import { colors } from "../../../infrastructure/theme/colors";

import { useNavigation } from "@react-navigation/native";

export const ChatRow = ({ user, onDeleteRow, rowMap }) => {
  const androidBottomSheetRef = useRef();

  const navigation = useNavigation();

  const snapPoints = useMemo(() => ["20%"], []);

  const alertDeleteConversation = () => {
    androidBottomSheetRef.current?.close();
    Alert.alert(
      "Permanently delete this conversation?",
      "All the messages will be removed from this conversation.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDeleteRow(rowMap, user.id),
        },
      ]
    );
  };

  const renderPostSettings = useCallback(
    () => (
      <>
        <ListItem onPress={alertDeleteConversation}>
          <ListItem.Content>
            <Text variant="android_bottomsheet_delete">Delete</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => androidBottomSheetRef.current?.close()}>
          <ListItem.Content>
            <Text variant="android_bottomsheet_cancel">Cancel</Text>
          </ListItem.Content>
        </ListItem>
      </>
    ),
    []
  );

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

  return (
    <>
      <ListItem
        onPress={() =>
          navigation.navigate("Conversation", { user: user.otherUser })
        }
        onLongPress={
          Platform.OS === "android"
            ? () => androidBottomSheetRef.current?.present()
            : null
        }
      >
        <Avatar
          rounded
          size="medium"
          onPress={() =>
            navigation.navigate("GuestProfile", {
              uid: user.otherUser.id,
              guestUser: true,
            })
          }
          source={{ uri: user.otherUser?.profilePhoto }}
          renderPlaceholderContent={<ActivityIndicator color={colors.icon.secondary} />}
        />
        <ListItem.Content>
          <Text variant="chats_name">{user.otherUser?.displayName}</Text>
          <Text variant="chats_lastmessage">{user.lastMessage}</Text>
        </ListItem.Content>
        <Text variant="chats_date">
          {timeDifference(new Date(), user.lastMessageTimestamp?.toDate())}
        </Text>
      </ListItem>

      <BottomSheetModal
        ref={androidBottomSheetRef}
        key="android-bottom-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        children={renderPostSettings}
      />
    </>
  );
};
