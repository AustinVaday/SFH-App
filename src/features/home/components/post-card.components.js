import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Pressable } from "react-native";

import { PostTopSection } from "../../app/components/post-top-section.components";
import { PostBottomSection } from "../../app/components/post-bottom-section.components";

import { useUser } from "../../../services/hooks/useUser";

import { PostVideo, PlayIcon } from "./styles/post-card.styles";

export const PostCard = forwardRef(({ post }, parentRef) => {
  const { data: user, isLoading } = useUser(post.creator);

  const [videoStatus, setVideoStatus] = useState(false);

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

    setVideoStatus(false);

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

  const onPlayPausePress = async () => {
    const status = await videoRef.current.getStatusAsync();

    try {
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
        setVideoStatus(true);
      } else {
        await videoRef.current.playAsync();
        setVideoStatus(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Pressable onPress={onPlayPausePress} style={{ flex: 1 }}>
        {!isLoading && <PostTopSection isViewPost={false} user={user} post={post} />}

        <PostVideo
          ref={videoRef}
          source={{ uri: post.videoURL }}
          shouldplay={false}
          isLooping={true}
          // onLoadStart={() => setLoading(true)}
          // onLoad={() => setLoading(false)}
        />

        {videoStatus && <PlayIcon />}

        {!isLoading && <PostBottomSection post={post} user={user} />}
      </Pressable>
    </>
  );
});
