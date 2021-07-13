import React, { useState, useEffect, useRef } from "react";
import { Image, TouchableWithoutFeedback, Platform } from "react-native";
import { Avatar, List, TouchableRipple, Button } from "react-native-paper";
import { getThumbnailAsync } from "expo-video-thumbnails";
import RBSheet from "react-native-raw-bottom-sheet";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const ListItem = styled(List.Item).attrs({
  underlayColor: colors.bg.secondary,
})`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[4]};
  background-color: ${colors.bg.primary};
`;

export const NotificationCard = ({ user, onNavigate, onDeleteRow, rowMap }) => {
  const [image, setImage] = useState(null);
  const refRBSheet = useRef();

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
        <TouchableWithoutFeedback onPress={() => {}}>
          <Image
            source={{ uri: image }}
            style={{ width: 50, height: 50, alignSelf: "center" }}
          />
        </TouchableWithoutFeedback>
      );
    } else if (type === "upvote") {
      return (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Image
            source={{ uri: image }}
            style={{ width: 50, height: 50, alignSelf: "center" }}
          />
        </TouchableWithoutFeedback>
      );
    } else if (type === "follow") {
      return (
        <Button
          mode="contained"
          color={colors.brand.primary}
          style={{ width: 90, alignSelf: "center" }}
          uppercase={false}
          onPress={() => {}}
        >
          Follow
        </Button>
      );
    }
  };

  return (
    <>
      <ListItem
        onPress={() => {}}
        onLongPress={
          Platform.OS === "android" ? () => refRBSheet.current.open() : null
        }
        title={<Text variant="notifications_name">{user.name}</Text>}
        description={
          <>
            <Text variant="notifications_message">{user.message}</Text>
            <Text variant="date" style={{ color: colors.text.secondary }}>
              {"\n" + user.timestamp}
            </Text>
          </>
        }
        left={() => (
          <TouchableRipple
            style={{ alignSelf: "center" }}
            onPress={() => onNavigate("ViewProfile")}
          >
            <Avatar.Image size={60} source={{ uri: user.avatar }} />
          </TouchableRipple>
        )}
        right={() => typeOfNotification(user.type)}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        minClosingHeight={130}
        height={130}
        customStyles={{
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
          draggableIcon: { margin: 0, backgroundColor: colors.bg.primary },
        }}
      >
        <List.Item
          onPress={() => onDeleteRow(rowMap, user.id)}
          titleStyle={{ textAlign: "center" }}
          title={<Text style={{ color: colors.text.error }}>Delete</Text>}
        />
        <List.Item
          onPress={() => refRBSheet.current.close()}
          titleStyle={{ textAlign: "center" }}
          title={<Text>Cancel</Text>}
        />
      </RBSheet>
    </>
  );
};
