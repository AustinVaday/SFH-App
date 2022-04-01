import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { LoadingIndicator } from "../../../components/loading/loading-indicator.components";

import { useSelector } from "react-redux";
import { firebase } from "../../../utils/firebase";
import { followUser, unfollowUser } from "../../../services/firebase/follows";
import { getUserById } from "../../../services/firebase/users";

import {
  ListEmptyBackground,
  FollowingList,
  FollowButton,
  FollowingButton,
  UserImage,
  LoadingIndicatorContainer,
} from "./styles/following-tab.styles";

export const FollowingTab = ({ uid, isOtherUser, navigation }) => {
  const [followingsState, setFollowingsState] = useState({
    followings: [],
    loading: true,
  });

  const followings = useSelector(
    (state) => state.followings.currentUserFollowings
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (isOtherUser) {
      firebase
        .firestore()
        .collection("follows")
        .doc(uid)
        .collection("userFollowings")
        .limit(10)
        .get()
        .then((snapshot) => {
          let followings = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setFollowingsState({ followings: followings, loading: false });
        });
    } else {
      setFollowingsState({ followings: followings, loading: false });
    }
  }, []);

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Following</Text>
        <Spacer size="large" />
        {isOtherUser ? (
          <Text variant="list_empty_message">
            When they follow someone, the users will appear here.
          </Text>
        ) : (
          <Text variant="list_empty_message">
            Search and follow someone that will appear here.
          </Text>
        )}
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item: user }) => {
    return (
      <ListItem
        onPress={() =>
          navigation.navigate("GuestProfile", {
            uid: user.id,
            isGuest: true,
            isOtherUser: currentUser.id !== user.id,
          })
        }
      >
        <UserImage source={{ uri: user.profilePhoto }} />
        <ListItem.Content>
          <Text variant="following_username">{user.username}</Text>
        </ListItem.Content>
        {currentUser.id === user.id ? null : followings.findIndex(
            (followed) => followed.id === user.id
          ) > -1 ? (
          <FollowingButton
            title={<Text variant="following_textbutton">Following</Text>}
            onPress={() => unfollowUser(user, currentUser)}
          />
        ) : (
          <FollowButton
            title={<Text variant="follow_textbutton">Follow</Text>}
            onPress={() =>
              getUserById(user.id).then((data) => followUser(data, currentUser))
            }
          />
        )}
      </ListItem>
    );
  };

  return (
    <>
      {followingsState.loading ? (
        <LoadingIndicatorContainer>
          <LoadingIndicator />
        </LoadingIndicatorContainer>
      ) : (
        <FollowingList
          data={followingsState.followings}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          listKey={(item) => item.id}
          bounces={
            isOtherUser
              ? followingsState.followings.length !== 0
              : followings.length !== 0
          }
        />
      )}
    </>
  );
};
