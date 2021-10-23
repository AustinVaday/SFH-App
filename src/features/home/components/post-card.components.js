import React, { useState, useRef } from "react";
import { Share, Platform, Pressable, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Avatar, IconButton, Card, List } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { colors, shadowTextStyle } from "../../../infrastructure/theme/colors";

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

const VideoSection = styled(Card.Cover)`
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
  padding-left: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[2]};
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

  return (
    <CardContainer style={{ height: height / 1.28 }}>
      <VideoSection
        style={{ height: height / 1.28 }}
        source={{ uri: user.url }}
      />
      <TopSection>
        <Pressable
          onPress={() => {
            onNavigate("ViewGuestProfile");
          }}
        >
          <Avatar.Image size={40} source={{ uri: user.avatar }} />
        </Pressable>
        <NameAndDate>
          <Text variant="name" style={shadowTextStyle()}>
            {user.name}
          </Text>
          <Text variant="date" style={shadowTextStyle()}>
            {user.date}
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
            {user.videoTitle}
          </Text>
          {user.caption !== "" ? (
            <Spacer position="top" size="small">
              <Text variant="caption" style={shadowTextStyle()}>
                {user.caption}
              </Text>
            </Spacer>
          ) : null}
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
              <Text variant="numbers">{user.likes}</Text>
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
                onPress={() => onNavigate("ViewPosting", { user })}
              />
              <Text variant="numbers">{user.numComments.length}</Text>
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
    </CardContainer>
  );
};
