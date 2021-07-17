import React from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { Avatar, Button, Surface } from "react-native-paper";
import styled from "styled-components/native";

import { ProfileTabs } from "../navigators/profile-tabs.navigator";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import userProfile from "../../../utils/mock/userProfile";

const ProfileBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
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

const EditProfileButton = styled(Button)`
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.brand.primary};
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

export const ProfileScreen = ({ navigation }) => {
  // const [photo, setPhoto] = useState(null);
  // const [fullName, setFullName] = useState("");

  // const getProfileInfo = async (currentUser) => {
  //   const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
  //   if (!photoUri) {
  //     setPhoto(currentUser.photoURL + "?type=large");
  //     setFullName(currentUser.displayName)
  //   } else {
  //     setPhoto(photoUri);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     getProfileInfo(user);
  //   }, [user])
  // );

  return (
    <ProfileBackground>
      <FlatList
        data={userProfile}
        renderItem={({ item }) => {
          return (
            <>
              <Profile>
                <AvatarImageContainer>
                  <Surface style={{ borderRadius: 80, elevation: 1 }}>
                    <Avatar.Image
                      size={120}
                      source={{
                        uri: item.avatar,
                      }}
                    />
                  </Surface>
                </AvatarImageContainer>
                <ProfileInfoContainer>
                  <NameAndIdentify>
                    <Text variant="title">{item.name} </Text>
                    <Text variant="profile_identify">• {item.identify}</Text>
                  </NameAndIdentify>
                  {item.bio !== "" ? <BioText>{item.bio}</BioText> : null}
                </ProfileInfoContainer>

                <StatsSection>
                  <PostsSection>
                    <TouchableOpacity
                      style={{ alignItems: "center" }}
                      activeOpacity={1}
                      onPress={() => {}}
                    >
                      <Text variant="profile_numbers">{item.posts.length}</Text>
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
                          item,
                          tab: "Following",
                        });
                      }}
                    >
                      <Text variant="profile_numbers">
                        {item.following.length}
                      </Text>
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
                          item,
                          tab: "Followers",
                        });
                      }}
                    >
                      <Text variant="profile_numbers">
                        {item.followers.length}
                      </Text>
                      <Text variant="profile_labels">Followers</Text>
                    </TouchableOpacity>
                  </FollowersSection>
                </StatsSection>

                <EditProfileButtonContainer>
                  <EditProfileButton
                    onPress={() => {
                      navigation.navigate("EditProfile", { item });
                    }}
                    mode="outlined"
                    color={colors.ui.quaternary}
                  >
                    <Text
                      variant="text_button"
                      style={{ color: colors.text.brand }}
                    >
                      Edit Profile
                    </Text>
                  </EditProfileButton>
                </EditProfileButtonContainer>
              </Profile>
              <ProfileTabs newitem={item} />
            </>
          );
        }}
        keyExtractor={(item) => item.id}
        stickyHeaderIndices={[1]}
      />
    </ProfileBackground>
  );
};
