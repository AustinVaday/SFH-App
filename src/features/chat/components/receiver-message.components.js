import React from "react";
import { Text } from "../../../components/typography/text.components";

import {
  MessageContainer,
  MessageRowSection,
  UserAvatar,
} from "./styles/receiver-message.styles";

export const ReceiverMessage = ({ message, otherUser, navigation }) => {
  return (
    <MessageRowSection>
      <MessageContainer>
        <UserAvatar
          source={{ uri: otherUser.profilePhoto }}
          onPress={() =>
            navigation.navigate("GuestProfile", {
              uid: otherUser.id,
              isGuest: true,
              isOtherUser: true,
            })
          }
        />
        <Text>{message.text}</Text>
      </MessageContainer>
    </MessageRowSection>
  );
};
