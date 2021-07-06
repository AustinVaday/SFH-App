import React from "react";
import styled from "styled-components/native";
import { Avatar, Card, TouchableRipple } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";

const CardContainer = styled(Card)`
  width: 95%;
  align-self: center;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  /* position: absolute; */
  /* background-color: rgba(52, 52, 52, 0.3); */
  /* background-color: ${(props) => props.theme.colors.brand.primary} */
`;

const AvatarIcon = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const SmallPostCard = ({ user, onNavigate }) => {
  return (
    <CardContainer elevation={2}>
      <TouchableRipple onPress={() => onNavigate("ViewPosting", { user })}>
        <Card.Cover source={{ uri: user.url }} />
      </TouchableRipple>
      <BottomCard>
        <Text variant="label" color="white">
          {user.videoTitle}
        </Text>
        <AvatarIcon>
          <Avatar.Image size={34} source={{ uri: user.avatar }} />
        </AvatarIcon>
      </BottomCard>
    </CardContainer>
  );
};
