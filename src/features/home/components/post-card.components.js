import React, { useState, useRef } from "react";
import { Share, Platform, Pressable, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Avatar, IconButton, Card, List } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text } from "../../../components/typography/text.components";
import { timeDifference } from "../../../components/utilities/time-difference.components";
import { colors, shadowTextStyle } from "../../../infrastructure/theme/colors";
import { Video } from "expo-av";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useIsFocused } from "@react-navigation/native";

import InViewport from "../../../components/utilities/inviewport.components";

const { height } = Dimensions.get("window");

const CardContainer = styled(Card)`
  width: 100%;
  border-radius: 25px;
`;

const TopSection = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  border-radius: 25px;
`;

const NameAndDate = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const VideoSettingsButton = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const VideoSection = styled(Video)`
  width: 100%;
  position: absolute;
  border-radius: 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const BottomCard = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[2]};
  justify-content: flex-end;
`;

const IconsSection = styled.View`
  flex-direction: row;
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const LeftIconsSection = styled.View`
  flex: 1;
  flex-direction: row;
`;

const RightIconsSection = styled.View`
  justify-content: flex-end;
`;

const LikeButton = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 25px;
`;

const CommentButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const TitleAndCaptionSection = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const PostCard = ({ post, user, onNavigate }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef();

  const isFocused = useIsFocused();

  const clickSave = () => {
    if (saved) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  };

  const clickLike = () => {
    if (upvoted) {
      setUpvoted(false);
      setDownvoted(false);
    } else {
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const clickDislike = () => {
    if (downvoted) {
      setDownvoted(false);
      setUpvoted(false);
    } else {
      setUpvoted(false);
      setDownvoted(true);
    }
  };

  const onShare = () => {
    try {
      Share.share({
        url: post.videoURL,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const refRBSheet = useRef();

  const likeButtonStyle = () => {
    if (upvoted) {
      return {
        backgroundColor: colors.brand.primary,
      };
    } else if (downvoted) {
      return {
        backgroundColor: colors.ui.error,
      };
    } else {
      return {
        backgroundColor: "rgba(192, 192, 192, 0.5)",
      };
    }
  };

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
    <CardContainer style={{ height: height / 1.28 }}>

      <InViewport onChange={handlePlaying}>
        <VideoSection
          ref={videoRef}
          style={{ height: height / 1.28 }}
          source={{ uri: post.videoURL }}
          resizeMode="cover"
          isLooping={true}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
        />
      </InViewport>

      <TopSection>
        <Pressable
          onPress={() => {
            onNavigate("ViewGuestProfile");
          }}
        >
          <Avatar.Image size={40} source={{ uri: user.profilePhoto }} />
        </Pressable>
        <NameAndDate>
          <Text variant="name" style={shadowTextStyle()}>
            {user.username}
          </Text>
          <Text variant="date" style={shadowTextStyle()}>
            {post.creation === null
              ? "now"
              : timeDifference(new Date(), post.creation.toDate())}
          </Text>
        </NameAndDate>
        <VideoSettingsButton>
          <IconButton
            icon={Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"}
            onPress={() => refRBSheet.current.open()}
            underlayColor="transparent"
            color={colors.icon.primary}
            size={30}
          />
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={180}
            customStyles={{
              container: {
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              },
            }}
          >
            <List.Item
              onPress={() => {}}
              style={{ padding: 0 }}
              title="Report"
              left={() => <List.Icon icon="flag" />}
            />
            <List.Item
              onPress={() => {}}
              style={{ padding: 0 }}
              title="Unfollow"
              left={() => <List.Icon icon="account-cancel" />}
            />
          </RBSheet>
        </VideoSettingsButton>
      </TopSection>

      <BottomCard>
        <TitleAndCaptionSection>
          <Text variant="title" style={shadowTextStyle()}>
            {post.title}
          </Text>
          {(post.description !== "") && (
            <Text variant="caption" style={shadowTextStyle()}>
              {post.description}
            </Text>
          )}
        </TitleAndCaptionSection>

        <IconsSection>
          <LeftIconsSection>
            <LikeButton style={likeButtonStyle()}>
              <IconButton
                icon={"arrow-up-bold"}
                color={colors.icon.primary}
                underlayColor="transparent"
                style={{ margin: 0 }}
                size={25}
                onPress={clickLike}
              />
              <Text variant="numbers">{post.likesCount}</Text>
              <IconButton
                icon={"arrow-down-bold"}
                color={colors.icon.primary}
                underlayColor="transparent"
                style={{ paddingTop: 2, margin: 0 }}
                size={25}
                onPress={clickDislike}
              />
            </LikeButton>
            <CommentButton>
              <IconButton
                icon="message"
                color={colors.icon.primary}
                underlayColor="transparent"
                style={{ margin: 0 }}
                size={25}
                onPress={() => onNavigate("ViewPosting", { post })}
              />
              <Text variant="numbers">{post.commentsCount}</Text>
            </CommentButton>
            <IconButton
              icon="send"
              color={colors.icon.primary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={25}
              onPress={onShare}
            />
          </LeftIconsSection>

          <RightIconsSection>
            <IconButton
              icon={saved ? "bookmark" : "bookmark-outline"}
              color={saved ? colors.brand.primary : colors.icon.primary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={25}
              onPress={clickSave}
            />
          </RightIconsSection>
        </IconsSection>
      </BottomCard>

      {loading && (
        <ContentLoader
          viewBox="-10 0 380 630"
          style={{ position: "absolute", backgroundColor: "white" }}
        >
          <Circle cx="25" cy="30" r="20" />
          <Rect x="60" y="17" rx="4" ry="4" width="300" height="10" />
          <Rect x="60" y="40" rx="3" ry="3" width="300" height="10" />
          <Rect x="0" y="70" rx="3" ry="3" width="363" height={height / 1.8} />
          <Rect x="0" y="560" rx="3" ry="3" width="360" height="10" />
          <Rect x="0" y="585" rx="3" ry="3" width="360" height="30" />
        </ContentLoader>
      )}
    </CardContainer>
  );
};
