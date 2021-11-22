import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import styled from "styled-components/native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { colors } from "../../../infrastructure/theme/colors";

const ConversationBackground = styled.View`
  flex: 1;
  background-color: ${colors.bg.secondary};
`;

const SendButtonContainer = styled.View`
  margin-right: 10px;
  margin-bottom: 7px;
  margin-left: 10px;
`;

export const ConversationScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isReadySend, setIsReadySend] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onTypingHandler = (text) => {
    if (text === "") {
      setIsReadySend(false);
    } else {
      setIsReadySend(true);
    }
  };

  return (
    <ConversationBackground>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        listViewProps={{
          contentContainerStyle: { flexGrow: 1, justifyContent: "flex-end" },
        }}
        alwaysShowSend={true}
        onInputTextChanged={(text) => onTypingHandler(text)}
        textInputStyle={{
          backgroundColor: colors.bg.cultured,
          paddingTop: 10,
          paddingLeft: 5,
          borderRadius: 5,
        }}
        renderSend={(props) => {
          return (
            <Send {...props} disabled={!isReadySend}>
              <SendButtonContainer>
                <Icon
                  name="send"
                  color={
                    !isReadySend ? colors.brand.muted : colors.brand.primary
                  }
                  size={30}
                />
              </SendButtonContainer>
            </Send>
          );
        }}
      />
    </ConversationBackground>
  );
};
