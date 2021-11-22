import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Platform } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { getThumbnailAsync } from "expo-video-thumbnails";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Text } from "../../../components/typography/text.components";

import { PostImage, FollowButton } from "../styles/notification-card.styles";

export const NotificationCard = ({ user, navigation, onDeleteRow, rowMap }) => {
  const [image, setImage] = useState(null);

  const androidBottomSheetRef = useRef();

  const snapPoints = useMemo(() => ["20%"], []);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const { uri } = await getThumbnailAsync(
          "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
        );
        setImage(uri);
      } catch (e) {
        console.warn(e);
      }
    }
    fetchVideo();
  }, []);

  const typeOfNotification = (type) => {
    if (type === "comment") {
      return (
        <PostImage
          source={{ uri: image }}
          onPress={() => console.log("click view post")}
        />
      );
    } else if (type === "upvote") {
      return (
        <PostImage
          source={{ uri: image }}
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

  const renderPostSettings = useCallback(
    () => (
      <>
        <ListItem onPress={() => onDeleteRow(rowMap, user.id)}>
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
          source={{ uri: user.avatar }}
        />
        <ListItem.Content>
          <Text variant="activity_username">{user.name}</Text>
          <Text variant="activity_message">{user.message}</Text>
          <Text variant="activity_date">{user.timestamp}</Text>
        </ListItem.Content>
        {typeOfNotification(user.type)}
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
