import React from "react";

import { Text } from "../../../components/typography/text.components";

import { useNavigation } from "@react-navigation/native";

import {
  CardContainer,
  Thumbnail,
  BottomBarContainer,
} from "./styles/card.styles";

export const Card = ({ word }) => {
  const navigation = useNavigation();

  return (
    <CardContainer>
      <Thumbnail
        onPress={() => navigation.navigate("ViewWord", { word })}
        source={{ uri: word.videoThumbnail }}
      />
      <BottomBarContainer>
        <Text variant="discover_word_title">{word.title}</Text>
      </BottomBarContainer>
    </CardContainer>
  );
};
