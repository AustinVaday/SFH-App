import React from "react";

import { Text } from "../../../components/typography/text.components";

import { useNavigation } from "@react-navigation/native";

import {
  PostImage,
  PostCardBackground,
  BottomCardContainer,
} from "../styles/small-post-card.styles";

export const SmallPostCard = ({ post }) => {
  const navigation = useNavigation();

  return (
    <PostCardBackground>
      <PostImage
        onPress={() => navigation.navigate("ViewPost", { post })}
        source={{ uri: post.videoThumbnail }}
      />
      <BottomCardContainer>
        <Text variant="discover_post_title">{post.title}</Text>
      </BottomCardContainer>
    </PostCardBackground>
  );
};
