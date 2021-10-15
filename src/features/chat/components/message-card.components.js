import React, { useRef } from "react";
import { Platform, Alert, TouchableWithoutFeedback } from "react-native";
import { Avatar, List } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const ListItem = styled(List.Item).attrs({
  underlayColor: colors.bg.secondary,
})`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[4]};
  background-color: ${colors.bg.primary};
`;

export const MessageCard = ({ user, onNavigate, onDeleteRow, rowMap }) => {
  const refRBSheet = useRef();

  const alertDeleteConversation = () => {
    refRBSheet.current.close();
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

  return (
    <>
      <ListItem
        onPress={() => onNavigate("Conversation", { user: user.name })}
        onLongPress={
          Platform.OS === "android" ? () => refRBSheet.current.open() : null
        }
        title={<Text variant="message_name">{user.name}</Text>}
        left={() => (
          <TouchableWithoutFeedback onPress={() => onNavigate("ViewProfile")}>
            <Avatar.Image size={60} source={{ uri: user.avatar }} />
          </TouchableWithoutFeedback>
        )}
        right={() => (
          <Text style={{ alignSelf: "center" }} variant="date">
            {user.timestamp}
          </Text>
        )}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        minClosingHeight={130}
        height={130}
        customStyles={{
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
          draggableIcon: { margin: 0, backgroundColor: colors.bg.primary },
        }}
      >
        <List.Item
          onPress={alertDeleteConversation}
          titleStyle={{ textAlign: "center" }}
          title={<Text style={{ color: colors.text.error }}>Delete</Text>}
        />
        <List.Item
          onPress={() => refRBSheet.current.close()}
          titleStyle={{ textAlign: "center" }}
          title={<Text>Cancel</Text>}
        />
      </RBSheet>
    </>
  );
};
