// BUG: Menu class from React-Native-paper package didn't work in the Flatlist
// class, probably a bug. Instead, using React-native-material-menu package
// for menu

import React, { useState } from "react";
import { Image, Share } from "react-native";
import styled from "styled-components/native";
import { Avatar, IconButton, Card, TouchableRipple } from "react-native-paper";
import Menu, { MenuItem } from "react-native-material-menu";
import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";

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
  height: 500px;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const IconsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  flex-direction: row;
  align-items: center;
`;

const LikeButton = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const CommentButton = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ShareButton = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const PostCard = ({ user, onNavigate }) => {
  const [menu, setMenu] = useState(null);
  const [like, setLike] = useState(false);

  const setMenuRef = (ref) => {
    setMenu(ref);
  };

  const hideMenu = () => {
    menu.hide();
  };

  const showMenu = () => {
    menu.show();
  };

  const clickLike = async () => {
    setLike(await !like);
  };

  const likeIcon = like
    ? require("../../../assets/icons/deaf-clap-icon-blue.png")
    : require("../../../assets/icons/deaf-clap-icon-grey.png");

  const onShare = () => {
    try {
      const result = Share.share({
        url: user.url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <CardContainer elevation={2}>
      <TopCard>
        <TouchableRipple
          underlayColor="none"
          onPress={() => {
            onNavigate("ViewGuestProfile");
          }}
        >
          <Avatar.Image size={64} source={{ uri: user.avatar }} />
        </TouchableRipple>
        <NameAndDate>
          <Text variant="name">{user.name}</Text>
          <Text variant="label">{user.date}</Text>
        </NameAndDate>
        <VideoSettingsButton>
          <Menu
            ref={setMenuRef}
            button={<IconButton icon="dots-vertical" onPress={showMenu} />}
          >
            <MenuItem onPress={hideMenu}>Report</MenuItem>
          </Menu>
        </VideoSettingsButton>
      </TopCard>
      <VideoSection source={{ uri: user.url }} />
      <BottomCard>
        <Text variant="title">{user.videoTitle}</Text>
        <Spacer position="top" size="small">
          <Text variant="caption">{user.caption}</Text>
        </Spacer>
        <IconsSection>
          <LikeButton>
            <TouchableRipple onPress={clickLike}>
              <Image source={likeIcon} style={{ width: 37, height: 30 }} />
            </TouchableRipple>
            <Spacer position="left" size="large">
              <Text>{like ? user.likes + 1 : user.likes}</Text>
            </Spacer>
          </LikeButton>
          <CommentButton>
            <IconButton
              icon="message-reply"
              color="#BABBBA"
              size={30}
              onPress={() => {
                onNavigate("ViewPosting");
              }}
            />
            <Spacer position="left" size="medium">
              <Text>{user.numComments}</Text>
            </Spacer>
          </CommentButton>
          <ShareButton>
            <IconButton
              icon="share"
              color="#BABBBA"
              size={30}
              onPress={onShare}
            />
          </ShareButton>
        </IconsSection>
      </BottomCard>
    </CardContainer>
  );
};
