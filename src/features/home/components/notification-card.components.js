import React, { useRef, useMemo, useCallback } from "react";
import { Platform } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Text } from "../../../components/typography/text.components";
import { timeDifference } from "../../../components/utilities/time-difference.components";

import { useUser } from "../../../services/hooks/useUser";
import { usePost } from "../../../services/hooks/usePost";

import { PostImage, FollowButton } from "./styles/notification-card.styles";

export const NotificationCard = ({
  notification,
  navigation,
  onDeleteRow,
  rowMap,
}) => {
  const user = useUser(notification.sender).data;

  const androidBottomSheetRef = useRef();

  const snapPoints = useMemo(() => ["20%"], []);

  const typeOfNotification = (type) => {
    if (type === "comment") {
      const post = usePost(notification.postId).data;

      return (
        <PostImage
          source={{ uri: post?.videoThumbnail }}
          onPress={() => console.log("click view post")}
        />
      );
    } else if (type === "upvote") {
      const post = usePost(notification.postId).data;

      return (
        <PostImage
          source={{ uri: post?.videoThumbnail }}
          onPress={() => console.log("click view post")}
        />
      );
    } else if (type === "follow") {
      return (
        <FollowButton
          title={<Text variant="activity_textbutton">Follow</Text>}
          onPress={() => console.log("click follow")}
        />
      );
    }
  };

  const notificationMessage = (type) => {
    if (type === "comment") {
      return <Text variant="activity_message">commented on your post.</Text>;
    } else if (type === "upvote") {
      return <Text variant="activity_message">upvoted on your post.</Text>;
    } else if (type === "follow") {
      return <Text variant="activity_message">followed you.</Text>;
    }
  };

  const renderPostSettings = useCallback(
    () => (
      <>
        <ListItem onPress={() => onDeleteRow(rowMap, notification.id)}>
          <ListItem.Content>
            <Text variant="android_bottomsheet_delete">Delete</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => androidBottomSheetRef.current?.close()}>
          <ListItem.Content>
            <Text variant="android_bottomsheet_cancel">Cancel</Text>
          </ListItem.Content>
        </ListItem>
      </>
    ),
    []
  );

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

  return (
    <>
      <ListItem
        onPress={() => {}}
        onLongPress={
          Platform.OS === "android"
            ? () => androidBottomSheetRef.current?.present()
            : null
        }
      >
        <Avatar
          rounded
          size="medium"
          onPress={() => navigation.navigate("ViewProfile")}
          source={{ uri: user?.profilePhoto }}
        />
        <ListItem.Content>
          <Text variant="activity_username">{user?.username}</Text>
          {notificationMessage(notification.type)}
          <Text variant="activity_date">
            {notification.timestamp === null
              ? "now"
              : timeDifference(new Date(), notification.timestamp.toDate())}
          </Text>
        </ListItem.Content>
        {typeOfNotification(notification.type)}
      </ListItem>

      <BottomSheetModal
        ref={androidBottomSheetRef}
        key="android-bottom-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        children={renderPostSettings}
      />
    </>
  );
};
