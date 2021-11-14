import React, { useState, useRef } from "react";
import { Dimensions } from "react-native";
import { Video } from "expo-av";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useIsFocused } from "@react-navigation/native";

import { PostTopSection } from "../../app/components/post-top-section.components";
import { PostBottomSection } from "../../app/components/post-bottom-section.components";
import InViewport from "../../../components/utilities/inviewport.components";

const { height } = Dimensions.get("window");

export const HomePostCard = ({ post, user, onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);

  const videoRef = useRef();

  const isFocused = useIsFocused();

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.stopAsync();
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  };

  const handlePlaying = (isVisible) => {
    isVisible && isFocused ? playVideo() : stopVideo();
  };

  const onPlayPausePress = () => {
    if (!paused) {
      videoRef.current.pauseAsync();
      setPaused(!paused);
    } else {
      videoRef.current.playAsync();
      setPaused(!paused);
    }
  };

  return (
    <>
      <PostTopSection
        isViewPost={false}
        user={user}
        post={post}
      />

      <InViewport onChange={handlePlaying}>
        <Video
          ref={videoRef}
          style={{ height: height / 1.24 }}
          source={{ uri: post.videoURL }}
          resizeMode="cover"
          shouldplay={isFocused}
          isLooping={true}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
        />
      </InViewport>

      <PostBottomSection post={post} />

      {loading && (
        <ContentLoader
          viewBox="-10 0 380 630"
          style={{ position: "absolute", zIndex: 999, backgroundColor: "white" }}
        >
          <Circle cx="25" cy="30" r="20" />
          <Rect x="60" y="17" rx="4" ry="4" width="300" height="10" />
          <Rect x="60" y="40" rx="3" ry="3" width="300" height="10" />
          <Rect x="0" y="70" rx="3" ry="3" width="363" height={height / 1.8} />
          <Rect x="0" y="560" rx="3" ry="3" width="360" height="10" />
          <Rect x="0" y="585" rx="3" ry="3" width="360" height="30" />
        </ContentLoader>
      )}
    </>
  );
};
