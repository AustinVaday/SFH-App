import React, { useState, useCallback, useRef, useMemo } from "react";
import { Platform, Pressable } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import AlertDialog from "../../../components/dialog/alert-dialog.components";

import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../services/firebase/follows";
import { deleteWord } from "../../../services/firebase/words";
import { useFavorite } from "../../../services/hooks/useFavorite";
import { useFavoriteMutation } from "../../../services/hooks/useFavoriteMutation";

import {
  CardTopBarContainer,
  UsernameAndDateTextsContainer,
  SettingsButtonContainer,
  BackButton,
  SettingsButton,
  ReportIcon,
  UnfollowIcon,
  FollowIcon,
  DeleteIcon,
  EditIcon,
  FavoriteIcon,
  SettingsListItem,
} from "./styles/card-top-bar.styles";

export const CardTopBar = ({ isViewWord, word, user }) => {
  const { currentUser } = useSelector((state) => state.user);
  const followings = useSelector(
    (state) => state.followings.currentUserFollowings
  );

  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const settingsSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["28%"], []);

  const onPressUser = () => {
    navigation.navigate("GuestProfile", {
      uid: user.id,
      isGuest: true,
      isOtherUser: currentUser.id !== user.id,
    });
  };

  const onPressUnfollow = () => {
    settingsSheetRef.current?.close();

    unfollowUser(user, currentUser);
  };

  const onPressFollow = () => {
    settingsSheetRef.current?.close();

    followUser(user, currentUser);
  };

  const onDeleteWord = () => {
    setVisible(false);

    deleteWord(word.id, isViewWord, navigation);
  };

  const toggleDialog = () => {
    settingsSheetRef.current?.close();

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

  const renderSettings = useCallback(() => {
    const isFavorite = useFavorite(word.id).data;
    const favoriteMutation = useFavoriteMutation();

    return currentUser.id === user.id ? (
      <>
        <SettingsListItem
          onPress={() => {
            settingsSheetRef.current?.close();
            favoriteMutation.mutate({ wordId: word.id, isFavorite });
          }}
        >
          <FavoriteIcon favorited={isFavorite} />
          <ListItem.Content>
            <Text variant="bottomsheet_item">
              {isFavorite ? "Remove from Favorites" : "Favorite"}
            </Text>
          </ListItem.Content>
        </SettingsListItem>
        <SettingsListItem onPress={() => console.log("Edit")}>
          <EditIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Edit</Text>
          </ListItem.Content>
        </SettingsListItem>
        <SettingsListItem onPress={toggleDialog}>
          <DeleteIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item_delete">Delete</Text>
          </ListItem.Content>
        </SettingsListItem>
      </>
    ) : (
      <>
        <SettingsListItem
          onPress={() => {
            settingsSheetRef.current?.close();
            favoriteMutation.mutate({ wordId: word.id, isFavorite });
          }}
        >
          <FavoriteIcon favorited={isFavorite} />
          <ListItem.Content>
            <Text variant="bottomsheet_item">
              {isFavorite ? "Remove from Favorites" : "Favorite"}
            </Text>
          </ListItem.Content>
        </SettingsListItem>
        <SettingsListItem onPress={() => console.log("Report")}>
          <ReportIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Report</Text>
          </ListItem.Content>
        </SettingsListItem>
        {followings.findIndex((followed) => followed.id === user.id) > -1 ? (
          <SettingsListItem onPress={onPressUnfollow}>
            <UnfollowIcon />
            <ListItem.Content>
              <Text variant="bottomsheet_item">Unfollow</Text>
            </ListItem.Content>
          </SettingsListItem>
        ) : (
          <SettingsListItem onPress={onPressFollow}>
            <FollowIcon />
            <ListItem.Content>
              <Text variant="bottomsheet_item">Follow</Text>
            </ListItem.Content>
          </SettingsListItem>
        )}
      </>
    );
  }, [followings, visible]);

  return (
    <CardTopBarContainer isViewWord={isViewWord} insets={insets}>
      {isViewWord && (
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
      <UsernameAndDateTextsContainer>
        <Pressable onPress={onPressUser}>
          <Text variant="word_username">{user?.username}</Text>
        </Pressable>
        <Text variant="word_date">
          {word.creation === null
            ? "now"
            : moment(word.creation.toDate()).fromNow()}
        </Text>
      </UsernameAndDateTextsContainer>
      <SettingsButtonContainer>
        <SettingsButton
          onPress={() => settingsSheetRef.current?.present()}
        />
      </SettingsButtonContainer>

      <BottomSheetModal
        ref={settingsSheetRef}
        key="settings-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        children={renderSettings}
      />

      <AlertDialog
        displayAlert={visible}
        title={"Are you sure you want to delete? You can't recover this word."}
        positiveButtonText={"Delete"}
        negativeButtonText={"Cancel"}
        onPressPositive={onDeleteWord}
        onPressNegative={cancelDialog}
      />
    </CardTopBarContainer>
  );
};
