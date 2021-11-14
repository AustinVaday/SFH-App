import React, { useState, useEffect, useRef } from "react";
import { Video } from "expo-av";
import { firebase } from "../../../utils/firebase";

import { PostBottomSection } from "../../app/components/post-bottom-section.components";
import { PostTopSection } from "../../app/components/post-top-section.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

import { useUser } from "../../../services/hooks/useUser";

import { PostContainer } from "../styles";

export const ViewPostScreen = ({ route }) => {
  // const [user, setUser] = useState([]);

  const videoRef = useRef();

  const { post } = route.params;

  const user = useUser(post.creator).data;

  // useEffect(() => {
  //   if (userPost.status === "success") {
  //     console.log("success")
  //     setUser(userPost.data)
  //   }
  // }, [userPost])
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(post.creator)
  //     .get()
  //     .then((u) => {
  //       setUser(u.data());
  //     });
  // }, []);

  console.log("call component")
  return (
    <SafeArea>
      <PostContainer>
        <PostTopSection isViewPost={true} user={user} post={post} />
        <Video
          ref={videoRef}
          style={{ flex: 1 }}
          source={{ uri: post.videoURL }}
          resizeMode={Video.RESIZE_MODE_COVER}
          isLooping={true}
          shouldPlay={true}
          usePoster={true}
          posterSource={{ uri: post.videoThumbnail }}
          posterStyle={{ resizeMode: 'cover', height: "100%"}}
        />
        <PostBottomSection post={post} />
      </PostContainer>
    </SafeArea>
  );
};
