import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Image } from 'react-native-elements';
import { Card } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";

import { shadowTextStyle } from "../../../infrastructure/theme/colors";
import styled from "styled-components/native";

const CardContainer = styled(Card)`
  width: 100%;
  align-self: center;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

export const SmallPostCard = ({ user, onNavigate }) => {
  return (
    <CardContainer>
      <TouchableWithoutFeedback
        onPress={() => onNavigate("ViewPosting", { user })}
      >
        <Image style={{width: '100%', height: 200}} source={{ uri: user.videoThumbnail }} />
      </TouchableWithoutFeedback>
      <BottomCard >
        <Text variant="trending_post_title" style={shadowTextStyle()}>{user.title}</Text>
      </BottomCard>
    </CardContainer>
  );
};
