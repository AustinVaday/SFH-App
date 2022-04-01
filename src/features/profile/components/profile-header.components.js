import React, { useState } from "react";
import { Avatar } from "react-native-elements";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../services/firebase/follows";

import {
  StatsContainer,
  WordsStatContainer,
  FollowingStatContainer,
  FollowersStatContainer,
  EditProfileButtonContainer,
  ProfileHeaderBackground,
  BioContainer,
  ProfileStatsContainer,
  UserAvatarContainer,
  GuestUserButtonsSection,
  FollowingButton,
  FollowButton,
  MessageButton,
  EditProfileButton,
  TopInfoContainer,
  IdentifyContainer,
  EarIcon,
  LanguagesContainer,
  LanguageIcon,
  InfoContainer,
} from "./styles/profile-header.styles";

export const ProfileHeader = ({ user, isOtherUser, navigation }) => {
  const { currentUser } = useSelector((state) => state.user);
  const followings = useSelector(
    (state) => state.followings.currentUserFollowings
  );

  const [followingState, setFollowingState] = useState({
    isFollowing:
      followings.findIndex((followed) => followed.id === user.id) > -1,
    followersCount: user.followersCount,
  });

  return (
    <ProfileHeaderBackground pointerEvents="box-none">
      <TopInfoContainer pointerEvents="box-none">
        <UserAvatarContainer pointerEvents="none">
          <Avatar
            size={120}
            rounded
            source={{
              uri: user.profilePhoto,
            }}
          />
        </UserAvatarContainer>

        <ProfileStatsContainer pointerEvents="box-none">
          <Text variant="profile_display_name" numberOfLines={1}>
            {user.displayName}
          </Text>
          <StatsContainer>
            <WordsStatContainer>
              <Text variant="profile_numbers">{user.wordsCount}</Text>
              <Text variant="profile_labels">Words</Text>
            </WordsStatContainer>
            <Text> | </Text>
            <FollowingStatContainer
              onPress={() => {
                navigation.navigate("FollowList", {
                  username: user.username,
                  uid: user.id,
                  isOtherUser,
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
                  uid: user.id,
                  isOtherUser,
                  tab: "Followers",
                });
              }}
            >
              <Text variant="profile_numbers">
                {followingState.followersCount}
              </Text>
              <Text variant="profile_labels">Followers</Text>
            </FollowersStatContainer>
          </StatsContainer>
        </ProfileStatsContainer>
      </TopInfoContainer>

      {(user.identify || user.languages.length !== 0) && (
        <InfoContainer pointerEvents="none">
          {user.identify && (
            <IdentifyContainer>
              <EarIcon />
              <Text variant="profile_info">{user.identify}</Text>
            </IdentifyContainer>
          )}
          {user.identify && user.languages.length !== 0 && (
            <Spacer size="large" position={"left"} />
          )}
          {user.languages.length !== 0 && (
            <LanguagesContainer>
              <LanguageIcon />
              <Text variant="profile_info">{user.languages}</Text>
            </LanguagesContainer>
          )}
        </InfoContainer>
      )}

      {user.bio && (
        <BioContainer pointerEvents="none">
          <Text variant="profile_bio">{user.bio}</Text>
        </BioContainer>
      )}

      {isOtherUser ? (
        <GuestUserButtonsSection>
          {followingState.isFollowing ? (
            <FollowingButton
              onPress={() => {
                unfollowUser(user, currentUser);
                setFollowingState({
                  isFollowing: false,
                  followersCount: followingState.followersCount - 1,
                });
              }}
              title={<Text variant="profile_following_button">Following</Text>}
            />
          ) : (
            <FollowButton
              onPress={() => {
                followUser(user, currentUser);
                setFollowingState({
                  isFollowing: true,
                  followersCount: followingState.followersCount + 1,
                });
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
              navigation.navigate("EditProfile");
            }}
            title={
              <Text variant="profile_editprofile_button">Edit Profile</Text>
            }
          />
        </EditProfileButtonContainer>
      )}
    </ProfileHeaderBackground>
  );
};
