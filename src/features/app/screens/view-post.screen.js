import React, { useRef } from "react";
import { View } from 'react-native';

import { PostBottomSection } from "../../app/components/post-bottom-section.components";
import { PostTopSection } from "../../app/components/post-top-section.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

import { useUser } from "../../../services/hooks/useUser";

import { PostContainer, PostVideo } from "./styles/view-post.styles";

export const ViewPostScreen = ({ route }) => {
  const videoRef = useRef();

  const { post } = route.params;

  const { isLoading, data } = useUser(post.creator);

  if (isLoading) {
    return <View />;
 }

  return (
    <SafeArea>
      <PostContainer>
        <PostTopSection isViewPost={true} user={data} post={post} />
        <PostVideo
          ref={videoRef}
          source={{ uri: post.videoURL }}
          isLooping={true}
          shouldPlay={true}
          usePoster={true}
          posterSource={{ uri: post.videoThumbnail }}
        />
        <PostBottomSection post={post} user={data} />
      </PostContainer>
    </SafeArea>
  );
};
