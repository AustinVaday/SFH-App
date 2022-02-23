import React from "react";
import { Text } from "../../../components/typography/text.components";

import {
  MessageContainer,
  MessageRowSection,
} from "./styles/sender-message.styles";

export const SenderMessage = ({ message }) => {
  return (
    <MessageRowSection>
      <MessageContainer>
        <Text variant="sender_message">{message.text}</Text>
      </MessageContainer>
    </MessageRowSection>
  );
};
