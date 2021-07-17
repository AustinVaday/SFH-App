import React, { useState } from "react";
import { Share } from "react-native";
import styled from "styled-components/native";
import { IconButton, Card } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { colors } from "../../../infrastructure/theme/colors";

const VideoSection = styled(Card.Cover)`
  width: 100%;
  height: 500px;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const IconsSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CommentButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #f6eeee;
`;

const CommentText = styled(Text)`
  padding-top: ${(props) => props.theme.space[2]};
`;

const TitleAndCaptionSection = styled.View`
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const HeaderDetailPosting = ({ user, onNavigate }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [saved, setSaved] = useState(false);

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
        url: user.url,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <VideoSection source={{ uri: user.url }} />
      <BottomCard>
        <TitleAndCaptionSection>
          <Text variant="title">{user.videoTitle}</Text>
          <Spacer position="top" size="small">
            <Text variant="caption">{user.caption}</Text>
          </Spacer>
        </TitleAndCaptionSection>
        <HorizontalLine />
        <IconsSection>
          <LikeButton>
            <IconButton
              icon={upvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
              color={upvoted ? colors.brand.primary : "#BABBBA"}
              style={{ margin: 0 }}
              size={25}
              onPress={clickLike}
            />
            <Text variant="label">{user.likes}</Text>
            <IconButton
              icon={downvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
              color={downvoted ? colors.brand.primary : "#BABBBA"}
              style={{ paddingTop: 2, margin: 0 }}
              size={25}
              onPress={clickDislike}
            />
          </LikeButton>
          <CommentButton>
            <IconButton
              icon="message-outline"
              color="#BABBBA"
              style={{ margin: 0 }}
              size={25}
              onPress={() => {}}
            />
            <Text variant="label">{user.numComments.length}</Text>
          </CommentButton>
          <IconButton
            icon="share-outline"
            color="#BABBBA"
            style={{ margin: 0 }}
            size={30}
            onPress={onShare}
          />
          <IconButton
            icon={saved ? "bookmark" : "bookmark-outline"}
            color={saved ? colors.brand.primary : "#BABBBA"}
            style={{ margin: 0 }}
            size={25}
            onPress={clickSave}
          />
        </IconsSection>
        <HorizontalLine />
        <CommentText variant="label">Comments</CommentText>
      </BottomCard>
    </>
  );
};
