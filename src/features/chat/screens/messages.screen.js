import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { MessageCard } from "../components/message-card.components";
import { colors } from "../../../infrastructure/theme/colors";

import dataMessages from "../../../utils/mock/dataMessages";

const MessagesBackground = styled.View`
  flex: 1;
  background-color: ${colors.bg.primary};
`;

export const MessagesScreen = ({ navigation }) => {
  return (
    <MessagesBackground>
      <FlatList
        data={dataMessages}
        renderItem={({ item }) => {
          return <MessageCard user={item} onNavigate={navigation.navigate} />;
        }}
        keyExtractor={(index) => index.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </MessagesBackground>
  );
};
