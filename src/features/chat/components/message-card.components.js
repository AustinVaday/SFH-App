import React, { useRef, useCallback, useMemo } from "react";
import { Platform, Alert } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Text } from "../../../components/typography/text.components";

import { useNavigation } from "@react-navigation/native";

export const MessageCard = ({ user, onDeleteRow, rowMap }) => {
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
        onPress={() => navigation.navigate("Conversation", { user: user.name })}
        onLongPress={
          Platform.OS === "android"
            ? () => androidBottomSheetRef.current?.present()
            : null
        }
      >
        <Avatar
          rounded
          size="medium"
          onPress={() => navigation.navigate("ViewProfile")}
          source={{ uri: user.avatar }}
        />
        <ListItem.Content>
          <Text variant="messages_username">{user.name}</Text>
        </ListItem.Content>
        <Text variant="messages_date">{user.timestamp}</Text>
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
