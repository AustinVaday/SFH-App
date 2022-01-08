import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dimensions } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import { PostTopSection } from "../../app/components/post-top-section.components";
import { PostBottomSection } from "../../app/components/post-bottom-section.components";
import { colors } from "../../../infrastructure/theme/colors";

import { PostVideo } from "../styles/home-post-card.styles";

const { height } = Dimensions.get("window");

export const HomePostCard = forwardRef(({ post, user }, parentRef) => {
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

  const play = async () => {
    if (videoRef.current == null) {
      return;
    }

    // if video is already playing return
    const status = await videoRef.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await videoRef.current.playAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const stop = async () => {
    if (videoRef.current == null) {
      return;
    }

    // if video is already stopped return
    const status = await videoRef.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await videoRef.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (videoRef.current == null) {
      return;
    }

    // if video is already stopped return
    try {
      await videoRef.current.unloadAsync();
    } catch (e) {
      console.log(e);
    }
  };

  // const onPlayPausePress = () => {
  //   if (!paused) {
  //     videoRef.current.pauseAsync();
  //     setPaused(!paused);
  //   } else {
  //     videoRef.current.playAsync();
  //     setPaused(!paused);
  //   }
  // };

  return (
    <>
      <PostTopSection isViewPost={false} user={user} post={post} />

      <PostVideo
        ref={videoRef}
        source={{ uri: post.videoURL }}
        shouldplay={false}
        isLooping={true}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      />

      <PostBottomSection post={post} user={user} />

      {loading && (
        <ContentLoader
          viewBox="-10 0 380 630"
          style={{
            position: "absolute",
            zIndex: 999,
            backgroundColor: colors.bg.secondary,
          }}
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
});
