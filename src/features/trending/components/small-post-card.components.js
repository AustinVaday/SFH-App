import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";
import styled from "styled-components/native";

const CardContainer = styled(Card)`
  width: 95%;
  align-self: center;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

const AvatarIcon = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const SmallPostCard = ({ user, onNavigate }) => {
  return (
    <CardContainer elevation={2}>
      <TouchableWithoutFeedback
        onPress={() => onNavigate("ViewPosting", { user })}
      >
        <Card.Cover source={{ uri: user.url }} />
      </TouchableWithoutFeedback>
      <BottomCard>
        <Text variant="label">{user.videoTitle}</Text>
        <AvatarIcon>
          <Avatar.Image size={34} source={{ uri: user.avatar }} />
        </AvatarIcon>
      </BottomCard>
    </CardContainer>
  );
};
