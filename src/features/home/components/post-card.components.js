import React, { useState, useRef } from "react";
import { Share, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { Avatar, IconButton, Card, List } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { colors } from "../../../infrastructure/theme/colors";

const CardContainer = styled(Card)`
  width: 95%;
  align-self: center;
`;

const TopCard = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  flex-direction: row;
  align-items: center;
`;

const NameAndDate = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const VideoSettingsButton = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const VideoSection = styled(Card.Cover)`
  height: 400px;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const IconsSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LikeButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CommentButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleAndCaptionSection = styled.View`
  padding-left: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${(props) => props.theme.colors.ui.quinary};
`;

export const PostCard = ({ user, onNavigate }) => {
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

  const refRBSheet = useRef();

  return (
    <CardContainer elevation={2}>
      <TopCard>
        <TouchableWithoutFeedback
          onPress={() => {
            onNavigate("ViewGuestProfile");
          }}
        >
          <Avatar.Image size={50} source={{ uri: user.avatar }} />
        </TouchableWithoutFeedback>
        <NameAndDate>
          <Text variant="name">{user.name}</Text>
          <Text variant="date">{user.date}</Text>
        </NameAndDate>
        <VideoSettingsButton>
          <IconButton
            icon={Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"}
            onPress={() => refRBSheet.current.open()}
            underlayColor="transparent"
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
      </TopCard>
      <VideoSection source={{ uri: user.url }} />
      <BottomCard>
        <TitleAndCaptionSection>
          <Text variant="title">{user.videoTitle}</Text>
          {user.caption !== "" ? (
            <Spacer position="top" size="small">
              <Text variant="caption">{user.caption}</Text>
            </Spacer>
          ) : null}
        </TitleAndCaptionSection>
        <HorizontalLine />
        <IconsSection>
          <LikeButton>
            <IconButton
              icon={upvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
              color={upvoted ? colors.brand.primary : colors.icon.secondary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={25}
              onPress={clickLike}
            />
            <Text variant="numbers">{user.likes}</Text>
            <IconButton
              icon={downvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
              color={downvoted ? colors.brand.primary : colors.icon.secondary}
              underlayColor="transparent"
              style={{ paddingTop: 2, margin: 0 }}
              size={25}
              onPress={clickDislike}
            />
          </LikeButton>
          <CommentButton>
            <IconButton
              icon="message-outline"
              color={colors.icon.secondary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={25}
              onPress={() => onNavigate("ViewPosting", { user })}
            />
            <Text variant="numbers">{user.numComments.length}</Text>
          </CommentButton>
          <IconButton
            icon="share-outline"
            color={colors.icon.secondary}
            underlayColor="transparent"
            style={{ margin: 0 }}
            size={30}
            onPress={onShare}
          />
          <IconButton
            icon={saved ? "bookmark" : "bookmark-outline"}
            color={saved ? colors.brand.primary : colors.icon.secondary}
            underlayColor="transparent"
            style={{ margin: 0 }}
            size={25}
            onPress={clickSave}
          />
        </IconsSection>
      </BottomCard>
    </CardContainer>
  );
};
