import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";

import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../services/user";

import {
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
} from "../styles/profile-header.styles";

export const ProfileHeader = ({ user, guestUser, navigation }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [countFollowing, setCountFollowing] = useState(user.followersCount);

  const { currentUser } = useSelector((state) => state.auth);
  const { following, users } = useSelector((state) => state.posts);

  useEffect(() => {
    if (following.findIndex((followed) => followed.id === user.id) > -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [following]);

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
          <Text variant="profile_numbers">{user.postsCount}</Text>
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
          <Text variant="profile_numbers">{countFollowing}</Text>
          <Text variant="profile_labels">Followers</Text>
        </FollowersStatContainer>
      </ProfileStats>

      {guestUser ? (
        <GuestUserButtonsSection>
          {isFollowing ? (
            <FollowingButton
              onPress={() => {
                unfollowUser(user, currentUser);
                setCountFollowing(user.followersCount);
              }}
              title={<Text variant="profile_following_button">Following</Text>}
            />
          ) : (
            <FollowButton
              onPress={() => {
                followUser(user, currentUser);
                setCountFollowing(user.followersCount + 1);
              }}
              title={<Text variant="profile_follow_button">Follow</Text>}
            />
          )}
          <MessageButton
            onPress={() => navigation.navigate("Conversation", { user: user })}
            title={<Text variant="profile_message_button">Message</Text>}
          />
        </GuestUserButtonsSection>
      ) : (
        <EditProfileButtonContainer>
          <EditProfileButton
            onPress={() => {
              navigation.navigate("EditProfile", {
                currentUser: user,
              });
            }}
            title={
              <Text variant="profile_editprofile_button">Edit Profile</Text>
            }
          />
        </EditProfileButtonContainer>
      )}
      {/* <ProfileTabs uid={uid} /> */}
    </ProfileHeaderBackground>
  );
};
