import React from "react";

import { Text } from "../../../components/typography/text.components";

import { useNavigation } from "@react-navigation/native";

import {
  Post,
  PostImage,
  BottomCardContainer,
} from "./styles/small-post.styles";

export const SmallPost = ({ post }) => {
  const navigation = useNavigation();

  return (
    <Post>
      <PostImage
        onPress={() => navigation.navigate("ViewPost", { post })}
        source={{ uri: post.videoThumbnail }}
      />
      <BottomCardContainer>
        <Text variant="discover_post_title">{post.title}</Text>
      </BottomCardContainer>
    </Post>
  );
};
