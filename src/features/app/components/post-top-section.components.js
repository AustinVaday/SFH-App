import React, { useCallback, useRef, useMemo } from "react";
import { Platform } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { useNavigation } from "@react-navigation/native";

import { timeDifference } from "../../../components/utilities/time-difference.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import {
  TopPostContainer,
  UsernameAndDateContainer,
  PostSettingsButtonContainer,
  BackButton,
  PostSettingsButton,
  ReportIcon,
  UnfollowIcon
} from "../styles/post-top-section.styles";

export const PostTopSection = ({ isViewPost, post, user }) => {
  const navigation = useNavigation();

  const postSettingsSheetRef = useRef();

  const snapPoints = useMemo(() => ["20%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderPostSettings = useCallback(
    () => (
      <>
        <ListItem onPress={() => console.log("clicked report")}>
          <ReportIcon />
          <ListItem.Content>
            <ListItem.Title>Report</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => console.log("clicked unfollow")}>
          <UnfollowIcon />
          <ListItem.Content>
            <ListItem.Title>Unfollow</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </>
    ),
    []
  );

  return (
    <TopPostContainer isViewPost={isViewPost}>
      {isViewPost && (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Avatar
        rounded
        size="small"
        activeOpacity={0.7}
        name="chevron-left"
        type="ionicons"
        color={colors.icon.secondary}
        onPress={() => console.log("clicked avatar")}
        source={{ uri: user?.profilePhoto }}
      />
      <UsernameAndDateContainer>
        <Text variant="post_username">{user?.username}</Text>
        <Text variant="post_date">
          {post.creation === null
            ? "now"
            : timeDifference(new Date(), post.creation.toDate())}
        </Text>
      </UsernameAndDateContainer>
      <PostSettingsButtonContainer>
        <PostSettingsButton
          onPress={() => postSettingsSheetRef.current?.present()}
        />
      </PostSettingsButtonContainer>

      <BottomSheetModal
        ref={postSettingsSheetRef}
        key="post-settings-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        children={renderPostSettings}
      />
    </TopPostContainer>
  );
};
