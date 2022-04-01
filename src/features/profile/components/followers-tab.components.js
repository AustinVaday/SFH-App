import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { LoadingIndicator } from "../../../components/loading/loading-indicator.components";

import { firebase } from "../../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../services/firebase/follows";
import { getUserById } from "../../../services/firebase/users";
import { fetchFollowers } from "../../../services/redux/actions/followers.actions";

import {
  ListEmptyBackground,
  FollowersList,
  FollowButton,
  FollowingButton,
  UserImage,
  LoadingIndicatorContainer,
} from "./styles/followers-tab.styles";

export const FollowersTab = ({ uid, isOtherUser, navigation }) => {
  const followings = useSelector(
    (state) => state.followings.currentUserFollowings
  );
  const followers = useSelector(
    (state) => state.followers.currentUserFollowers
  );
  const fetched = useSelector(
    (state) => state.followers.isCurrentUserFollowersFetched
  );
  const { currentUser } = useSelector((state) => state.user);

  const [followersState, setFollowersState] = useState([]);
  const [loading, setLoading] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOtherUser && !fetched) {
      dispatch(fetchFollowers(setLoading));
    } else if (!isOtherUser) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOtherUser) {
      firebase
        .firestore()
        .collection("follows")
        .doc(uid)
        .collection("userFollowers")
        .limit(10)
        .get()
        .then((snapshot) => {
          let followers = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setFollowersState(followers);
          setLoading(false);
        });
    }
  }, []);

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Followers</Text>
        <Spacer size="large" />
        {isOtherUser ? (
          <Text variant="list_empty_message">
            When someone follow this user, they will appear here.
          </Text>
        ) : (
          <Text variant="list_empty_message">
            Someone follows you that will appear here
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
          <Text variant="followers_username">{user.username}</Text>
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
      {loading ? (
        <LoadingIndicatorContainer>
          <LoadingIndicator />
        </LoadingIndicatorContainer>
      ) : (
        <FollowersList
          data={isOtherUser ? followersState : followers}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          bounces={
            isOtherUser ? followersState.length !== 0 : followers.length !== 0
          }
        />
      )}
    </>
  );
};
