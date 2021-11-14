import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from 'react-native-elements';
import { Card } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";

import { useNavigation } from "@react-navigation/native";

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

export const SmallPostCard = ({ post }) => {
  const navigation = useNavigation();

  return (
    <CardContainer>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewPost", { post })}
      >
        <Image style={{width: '100%', height: 200}} source={{ uri: post.videoThumbnail }} />
      </TouchableOpacity>
      <BottomCard >
        <Text variant="trending_post_title" style={shadowTextStyle()}>{post.title}</Text>
      </BottomCard>
    </CardContainer>
  );
};
