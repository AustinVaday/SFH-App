import React from "react";
import styled from "styled-components/native";
import { Avatar, List, TouchableRipple } from "react-native-paper";

import { Text } from "../../../components/typography/text.components";

const ListItem = styled(List.Item)`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[4]};
`;

export const MessageCard = ({ user, onNavigate }) => {
  return (
    <ListItem
      onPress={() => onNavigate("Conversation", { user: user.name })}
      title={<Text variant="message_name">{user.name}</Text>}
      left={() => (
        <TouchableRipple onPress={() => onNavigate("ViewProfile")}>
          <Avatar.Image size={60} source={{ uri: user.avatar }} />
        </TouchableRipple>
      )}
      right={() => (
        <Text style={{ alignSelf: "center" }} variant="date">
          {user.timestamp}
        </Text>
      )}
    />
  );
};
