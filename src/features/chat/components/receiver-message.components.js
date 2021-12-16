import React from "react";
import { Text } from "../../../components/typography/text.components";

import {
  MessageContainer,
  MessageRowSection,
  UserAvatar,
} from "../styles/receiver-message.styles";

export const ReceiverMessage = ({ message, otherUser }) => {
  return (
    <MessageRowSection>
      <MessageContainer>
        <UserAvatar source={{ uri: otherUser.profilePhoto }} />
        <Text>{message.text}</Text>
      </MessageContainer>
    </MessageRowSection>
  );
};
