import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../components/typography/text.components";

import { HeaderBackButton } from "@react-navigation/stack";

const LeftHeader = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

const NameAndDate = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const ViewPostingLeftHeader = ({ props, user, onNavigate }) => {
  return (
    <LeftHeader>
      <HeaderBackButton {...props} style={{color: "black"}} />
      <TouchableWithoutFeedback
        onPress={() => {
            onNavigate("ViewGuestProfile");
        }}
      >
        <Avatar.Image size={45} source={{ uri: user.avatar }} />
      </TouchableWithoutFeedback>
      <NameAndDate>
        <Text variant="name">{user.name}</Text>
        <Text variant="date">{user.date}</Text>
      </NameAndDate>
    </LeftHeader>
  );
};
