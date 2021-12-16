import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Avatar } from "react-native-elements";

import { ProfileTabs } from "../navigators/profile-tabs.navigator";
import { Text } from "../../../components/typography/text.components";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

import { followUser, unfollowUser } from "../../../services/user";

import {
  ProfileBackground,
  ProfileStats,
  PostsStatContainer,
  FollowingStatContainer,
  FollowersStatContainer,
  EditProfileButtonContainer,
  ProfileHeaderBackground,
  ProfileInfo,
  NameAndIdentifyContainer,
  UserAvatarContainer,
  GuestUserButtonsSection,
  FollowingButton,
  FollowButton,
  MessageButton,
  EditProfileButton,
  Navbar,
} from "../styles/profile.styles";

export const ProfileScreen = ({ route, navigation }) => {
  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const { uid, guestUser } = route.params;

  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserPosts, following, users } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log("updated");

    if (uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(currentUserPosts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser({ uid: uid, ...snapshot.data() });
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .where("creator", "==", uid)
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    if (following.indexOf(uid) > -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [uid, following, currentUser, currentUserPosts]);

  const profileHeader = () => {
    return (
      <ProfileHeaderBackground>
        <UserAvatarContainer>
          <Avatar
            size={120}
            rounded
            source={{
              uri: user.profilePhoto,
            }}
          />
        </UserAvatarContainer>

        <ProfileInfo>
          <NameAndIdentifyContainer>
            <Text variant="profile_display_name">{user.displayName} </Text>
            {user.identify !== "none" && (
              <Text variant="profile_identify">• {user.identify}</Text>
            )}
          </NameAndIdentifyContainer>
          {user.bio !== "" && <Text variant="profile_bio">{user.bio}</Text>}
        </ProfileInfo>

        <ProfileStats>
          <PostsStatContainer onPress={() => console.log("click posts")}>
            <Text variant="profile_numbers">{userPosts.length}</Text>
            <Text variant="profile_labels">Posts</Text>
          </PostsStatContainer>
          <Text> | </Text>
          <FollowingStatContainer
            onPress={() => {
              navigation.navigate("FollowList", {
                username: user.username,
                users,
                tab: "Following",
              });
            }}
          >
            <Text variant="profile_numbers">{user.followingCount}</Text>
            <Text variant="profile_labels">Following</Text>
          </FollowingStatContainer>
          <Text> | </Text>
          <FollowersStatContainer
            onPress={() => {
              navigation.navigate("FollowList", {
                username: user.username,
                users,
                tab: "Followers",
              });
            }}
          >
            <Text variant="profile_numbers">{user.followersCount}</Text>
            <Text variant="profile_labels">Followers</Text>
          </FollowersStatContainer>
        </ProfileStats>

        {guestUser ? (
          <GuestUserButtonsSection>
            {isFollowing ? (
              <FollowingButton
                onPress={() => {
                  unfollowUser(uid);
                }}
                title={
                  <Text variant="profile_following_button">Following</Text>
                }
              />
            ) : (
              <FollowButton
                onPress={() => {
                  followUser(uid);
                }}
                title={<Text variant="profile_follow_button">Follow</Text>}
              />
            )}
            <MessageButton
              onPress={() => navigation.navigate("Conversation", { user })}
              title={<Text variant="profile_message_button">Message</Text>}
            />
          </GuestUserButtonsSection>
        ) : (
          <EditProfileButtonContainer>
            <EditProfileButton
              onPress={() => {
                navigation.navigate("EditProfile", { currentUser: user });
              }}
              title={
                <Text variant="profile_editprofile_button">Edit Profile</Text>
              }
            />
          </EditProfileButtonContainer>
        )}
        <ProfileTabs uid={uid} />
      </ProfileHeaderBackground>
    );
  };

  return (
    <ProfileBackground>
      <Navbar
        guestUser={guestUser}
        navigation={navigation}
        centerComponent={<Text variant="navbar_title">{user.username}</Text>}
      />
      <FlatList
        data={[{ key: "tabbed" }]}
        ListHeaderComponent={profileHeader()}
      />
    </ProfileBackground>
  );
};
