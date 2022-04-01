import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Pressable } from "react-native";

import { CardTopBar } from "./card-top-bar.components";
import { CardBottomBar } from "./card-bottom-bar.components";

import { useUser } from "../../../services/hooks/useUser";

import { VideoDisplay, PlayIcon } from "./styles/card.styles";

export const Card = forwardRef(({ isViewWord, word, navigation }, parentRef) => {
  const { data: user, isLoading } = useUser(word.creator);

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
    if (videoRef.current === null) {
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
        console.log("check");
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
        {!isLoading && (
          <CardTopBar isViewWord={isViewWord} user={user} word={word} />
        )}

        <VideoDisplay
          ref={videoRef}
          source={{ uri: word.videoURL }}
          usePoster={true}
          posterSource={{ uri: word.videoThumbnail }}
          posterStyle={{ resizeMode: "cover", height: "100%" }}
          shouldplay={false}
          isLooping={true}
        />

        {videoStatus && <PlayIcon />}

        {!isLoading && (
          <CardBottomBar isViewWord={isViewWord} word={word} user={user} navigation={navigation} />
        )}
      </Pressable>
    </>
  );
});
