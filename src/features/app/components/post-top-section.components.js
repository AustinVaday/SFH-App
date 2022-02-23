import React, { useState, useCallback, useRef, useMemo } from "react";
import { Platform, Pressable } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import moment from "moment";

import { useNavigation } from "@react-navigation/native";

import { Text } from "../../../components/typography/text.components";
import AlertDialog from "../../../components/dialog/alert-dialog.components";

import { useSelector } from "react-redux";
import {
  followUser,
  unfollowUser,
} from "../../../services/firebase/follows";
import { deletePost } from "../../../services/firebase/posts";

import {
  TopPostContainer,
  UsernameAndDateContainer,
  PostSettingsButtonContainer,
  BackButton,
  PostSettingsButton,
  ReportIcon,
  UnfollowIcon,
  FollowIcon,
  DeleteIcon,
  EditIcon,
} from "./styles/post-top-section.styles";

export const PostTopSection = ({ isViewPost, post, user }) => {
  const { currentUser } = useSelector((state) => state.user);
  const followings = useSelector((state) => state.followings.currentUserFollowings);

  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const postSettingsSheetRef = useRef();

  const snapPoints = useMemo(() => ["20%"], []);

  const onPressUser = () => {
    navigation.navigate("GuestProfile", {
      uid: user.id,
      isGuest: true,
      isOtherUser: currentUser.id !== user.id,
    });
  };

  const onPressUnfollow = () => {
    unfollowUser(user, currentUser);
    postSettingsSheetRef.current?.close();
    Toast.show({
      type: "infoMessage",
      props: {
        message: "You have unfollowed this user.",
      },
      visibilityTime: 2000,
      topOffset: 45,
    });
  };

  const onPressFollow = () => {
    followUser(user, currentUser);
    postSettingsSheetRef.current?.close();
    Toast.show({
      type: "infoMessage",
      props: {
        message: "You have followed this user.",
      },
      visibilityTime: 2000,
      topOffset: 45,
    });
  };

  const onDeletePost = () => {
    setVisible(false);
    deletePost(post.id).then(() =>
      Toast.show({
        type: "infoMessage",
        props: {
          message: "You have deleted your post.",
        },
        visibilityTime: 2000,
        topOffset: 45,
      })
    );
  };

  const toggleDialog = () => {
    postSettingsSheetRef.current?.close();
    setVisible(!visible);
  };

  const cancelDialog = () => setVisible(false);

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

  const renderPostSettings = useCallback(() => {
    return currentUser.id === user.id ? (
      <>
        <ListItem onPress={() => console.log("Edit")}>
          <EditIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Edit</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={toggleDialog}>
          <DeleteIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item_delete">Delete</Text>
          </ListItem.Content>
        </ListItem>
      </>
    ) : (
      <>
        <ListItem onPress={() => console.log("clicked report")}>
          <ReportIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Report</Text>
          </ListItem.Content>
        </ListItem>
        {followings.findIndex((followed) => followed.id === user.id) > -1 ? (
          <ListItem onPress={onPressUnfollow}>
            <UnfollowIcon />
            <ListItem.Content>
              <Text variant="bottomsheet_item">Unfollow</Text>
            </ListItem.Content>
          </ListItem>
        ) : (
          <ListItem onPress={onPressFollow}>
            <FollowIcon />
            <ListItem.Content>
              <Text variant="bottomsheet_item">Follow</Text>
            </ListItem.Content>
          </ListItem>
        )}
      </>
    );
  }, [followings, visible]);

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
        onPress={onPressUser}
        source={{ uri: user?.profilePhoto }}
      />
      <UsernameAndDateContainer>
        <Pressable onPress={onPressUser}>
          <Text variant="post_username">{user?.username}</Text>
        </Pressable>
        <Text variant="post_date">
          {moment(post.creation.toDate()).fromNow()}
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

      <AlertDialog
        displayAlert={visible}
        title={"Are you sure you want to delete?"}
        positiveButtonText={"Delete"}
        negativeButtonText={"Cancel"}
        onPressPositive={onDeletePost}
        onPressNegative={cancelDialog}
      />
    </TopPostContainer>
  );
};
