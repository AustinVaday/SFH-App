import React, { useState, useEffect } from "react";
import { TouchableOpacity, FlatList, View } from "react-native";
import { Button, Avatar } from "react-native-elements";
import styled from "styled-components/native";

import { ProfileTabs } from "../navigators/profile-tabs.navigator";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import { followUser, unfollowUser } from "../../../services/user";

const ProfileBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex-grow: 1;
`;

const StatsSection = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

const PostsSection = styled.View`
  padding-left: ${(props) => props.theme.space[4]};
  flex: 1;
`;

const FollowingSection = styled.View`
  flex: 1;
`;

const FollowersSection = styled.View`
  padding-right: ${(props) => props.theme.space[4]};
  flex: 1;
`;

const EditProfileButtonContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  width: 70%;
  align-self: center;
`;

const Profile = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ProfileInfoContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const NameAndIdentify = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarImageContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

const BioText = styled(Text)`
  flex-wrap: wrap;
  padding-top: ${(props) => props.theme.space[1]};
`;

export const ProfileScreen = ({ route }) => {
  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const { uid } = route.params;

  const navigation = useNavigation();

  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserPosts, following } = useSelector((state) => state.posts);

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
      <Profile>
        <AvatarImageContainer>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: user.profilePhoto,
            }}
          />
        </AvatarImageContainer>

        <ProfileInfoContainer>
          <NameAndIdentify>
            <Text variant="profile_display_name">{user.displayName} </Text>
            {user.identify !== "none" && (
              <Text variant="profile_identify">• {user.identify}</Text>
            )}
          </NameAndIdentify>
          {user.bio !== "" && <BioText>{user.bio}</BioText>}
        </ProfileInfoContainer>

        <StatsSection>
          <PostsSection>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              activeOpacity={1}
              onPress={() => {}}
            >
              <Text variant="profile_numbers">{userPosts.length}</Text>
              <Text variant="profile_labels">Posts</Text>
            </TouchableOpacity>
          </PostsSection>
          <Text> | </Text>
          <FollowingSection>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              activeOpacity={1}
              onPress={() => {
                navigation.navigate("FollowList", {
                  following,
                  tab: "Following",
                });
              }}
            >
              <Text variant="profile_numbers">{user.followingCount}</Text>
              <Text variant="profile_labels">Following</Text>
            </TouchableOpacity>
          </FollowingSection>
          <Text> | </Text>
          <FollowersSection>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              activeOpacity={1}
              onPress={() => {
                navigation.navigate("FollowList", {
                  following,
                  tab: "Followers",
                });
              }}
            >
              <Text variant="profile_numbers">{user.followersCount}</Text>
              <Text variant="profile_labels">Followers</Text>
            </TouchableOpacity>
          </FollowersSection>
        </StatsSection>

        {uid !== firebase.auth().currentUser.uid ? (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              padding: 10,
            }}
          >
            {isFollowing ? (
              <Button
                onPress={() => {
                  unfollowUser(uid);
                }}
                type="outline"
                buttonStyle={{
                  height: 50,
                  width: 150,
                  borderColor: colors.brand.primary,
                }}
                containerStyle={{ paddingRight: 5 }}
                title={
                  <Text
                    variant="text_button"
                    style={{ color: colors.text.brand }}
                  >
                    Following
                  </Text>
                }
              />
            ) : (
              <Button
                onPress={() => {
                  followUser(uid);
                }}
                type="solid"
                buttonStyle={{
                  height: 50,
                  width: 150,
                  backgroundColor: colors.brand.primary,
                }}
                containerStyle={{ paddingRight: 5 }}
                title={
                  <Text
                    variant="text_button"
                    style={{ color: colors.text.white }}
                  >
                    Follow
                  </Text>
                }
              />
            )}
            <Button
              onPress={() => console.log("message")}
              type="outline"
              buttonStyle={{
                height: 50,
                width: 150,
                borderColor: colors.brand.primary,
              }}
              containerStyle={{ paddingLeft: 5 }}
              title={
                <Text
                  variant="text_button"
                  style={{ color: colors.text.brand }}
                >
                  Message
                </Text>
              }
            />
          </View>
        ) : (
          <EditProfileButtonContainer>
            <Button
              onPress={() => {
                navigation.navigate("EditProfile", { user });
              }}
              type="outline"
              buttonStyle={{ height: 50 }}
              title={
                <Text
                  variant="text_button"
                  style={{ color: colors.text.brand }}
                >
                  Edit Profile
                </Text>
              }
              color={colors.ui.quaternary}
            />
          </EditProfileButtonContainer>
        )}
        <ProfileTabs uid={uid} />
      </Profile>
    );
  };

  return (
    <ProfileBackground>
      <FlatList
        data={[{ key: "tabbed" }]}
        ListHeaderComponent={profileHeader()}
      />
    </ProfileBackground>
  );
};
