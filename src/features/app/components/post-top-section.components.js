import React, { useCallback, useRef, useMemo } from "react";
import { Platform } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { useNavigation } from "@react-navigation/native";

import { timeDifference } from "../../../components/utilities/time-difference.components";
import { Text } from "../../../components/typography/text.components";
import { colors, shadowTextStyle } from "../../../infrastructure/theme/colors";

import { TopSection, NameAndDate, PostSettingsButton } from "../styles";

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
          <Ionicons name="flag" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title>Report</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => console.log("clicked unfollow")}>
          <AntDesign name="deleteuser" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title>Unfollow</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </>
    ),
    []
  );

  return (
    <TopSection style={{ paddingLeft: isViewPost ? 0 : 15 }}>
      {isViewPost && (
        <Icon
          size={35}
          name="chevron-left"
          type="ionicons"
          color={colors.icon.primary}
          containerStyle={{marginRight: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Avatar
        rounded
        size="small"
        activeOpacity={0.7}
        onPress={() => console.log("clicked avatar")}
        source={{ uri: user !== undefined ? user.profilePhoto : null }}
      />
      <NameAndDate>
        <Text variant="name" style={shadowTextStyle()}>
          {user!== undefined ? user.username : null}
        </Text>
        <Text variant="date" style={shadowTextStyle()}>
          {post.creation === null
            ? "now"
            : timeDifference(new Date(), post.creation.toDate())}
        </Text>
      </NameAndDate>
      <PostSettingsButton>
        <Icon
          name={Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"}
          type="material-community"
          onPress={() => postSettingsSheetRef.current?.present()}
          underlayColor="transparent"
          color={colors.icon.primary}
          size={30}
        />
      </PostSettingsButton>

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
    </TopSection>
  );
};
