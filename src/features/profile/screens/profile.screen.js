import React, { useEffect } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { Avatar, Button, IconButton, Surface } from "react-native-paper";
import styled from "styled-components/native";

import { ProfileTabs } from "../components/profile-tabs.navigator";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import userProfile from "../../../utils/mock/userProfile";

const SettingsButton = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: flex-end;
`;

const Name = styled(Text)`
  padding: ${(props) => props.theme.space[2]};
`;

const FollowsSection = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

const FollowNumbersFont = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body_700};
`;

const FollowTextFont = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.body_400};
`;

const SliceText = styled(Text)`
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
`;

const EditProfileButton = styled(Button).attrs({
  labelStyle: {
    color: colors.brand.primary,
    fontSize: 12,
  },
})`
  border-width: 1px;
  border-radius: 20px;
  border-color: ${(props) => props.theme.colors.brand.primary};
`;

const EditProfileButtonContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  width: 70%;
`;

const ProfileInfoContainer = styled.View`
  align-items: center;
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

  const userName = userProfile.map((index) => index.name);
  const userFollowing = userProfile.map((index) => index.following);
  const userFollowers = userProfile.map((index) => index.followers);
  
  return (
    <SafeArea>
      <FlatList
        data={userProfile}
        renderItem={({ item }) => {
          return (
            <>
              <SettingsButton>
                <IconButton
                  size={35}
                  icon="cog"
                  onPress={() => {
                    navigation.navigate("Settings");
                  }}
                />
              </SettingsButton>
              <ProfileInfoContainer>
                <Surface style={{ borderRadius: 60, elevation: 3 }}>
                  <Avatar.Image
                    size={120}
                    source={{
                      uri: item.avatar,
                    }}
                  />
                </Surface>
                <Name variant='title'>{item.name}</Name>
                <FollowsSection>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      navigation.navigate("FollowList");
                    }}
                  >
                    <FollowNumbersFont>{item.posts.length}</FollowNumbersFont>
                    <FollowTextFont>Posts</FollowTextFont>
                  </TouchableOpacity>
                  <SliceText> | </SliceText>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      navigation.navigate("FollowList");
                    }}
                  >
                    <FollowNumbersFont>{userFollowing}</FollowNumbersFont>
                    <FollowTextFont>Following</FollowTextFont>
                  </TouchableOpacity>
                  <SliceText> | </SliceText>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      navigation.navigate("FollowList");
                    }}
                  >
                    <FollowNumbersFont>{userFollowers}</FollowNumbersFont>
                    <FollowTextFont>Followers</FollowTextFont>
                  </TouchableOpacity>
                </FollowsSection>
                <EditProfileButtonContainer>
                  <EditProfileButton
                    onPress={() => {
                      navigation.navigate("EditProfile");
                    }}
                    mode="outlined"
                    color="white"
                  >
                    Edit Profile
                  </EditProfileButton>
                </EditProfileButtonContainer>
              </ProfileInfoContainer>
              <ProfileTabs newitem={item} />
            </>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};
