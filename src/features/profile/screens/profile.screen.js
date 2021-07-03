import React from "react";
import { TouchableOpacity, FlatList, View } from "react-native";
import { Avatar, Button, Surface } from "react-native-paper";
import styled from "styled-components/native";

import { ProfileTabs } from "../components/profile-tabs.navigator";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import userProfile from "../../../utils/mock/userProfile";

const Name = styled(Text)`
  padding: ${(props) => props.theme.space[2]};
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

const FollowNumbersFont = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body_700};
`;

const IdentifyFont = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body_700};
  color: ${(props) => props.theme.colors.text.secondary};
  padding-bottom: ${(props) => props.theme.space[1]};
`;

const FollowTextFont = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.body_400};
`;

const EditProfileButton = styled(Button).attrs({
  labelStyle: {
    color: colors.brand.primary,
    fontSize: 12,
  },
})`
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.brand.primary};
`;

const EditProfileButtonContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  width: 70%;
`;

const ProfileInfoContainer = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
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

  return (
    <SafeArea>
      <FlatList
        data={userProfile}
        renderItem={({ item }) => {
          return (
            <>
              <ProfileInfoContainer>
                <Surface style={{ borderRadius: 60, elevation: 1 }}>
                  <Avatar.Image
                    size={120}
                    source={{
                      uri: item.avatar,
                    }}
                  />
                </Surface>
                <Name variant="title">{item.name}</Name>
                <IdentifyFont>{item.identify}</IdentifyFont>
                
                <StatsSection>
                  <PostsSection>
                    <TouchableOpacity
                      style={{ alignItems: "center" }}
                      onPress={() => {}}
                    >
                      <FollowNumbersFont>{item.posts.length}</FollowNumbersFont>
                      <FollowTextFont>Posts</FollowTextFont>
                    </TouchableOpacity>
                  </PostsSection>
                  <Text> | </Text>
                  <FollowingSection>
                    <TouchableOpacity
                      style={{ alignItems: "center" }}
                      onPress={() => {
                        navigation.navigate("FollowList", {
                          item,
                          tab: "Following",
                        });
                      }}
                    >
                      <FollowNumbersFont>
                        {item.following.length}
                      </FollowNumbersFont>
                      <FollowTextFont>Following</FollowTextFont>
                    </TouchableOpacity>
                  </FollowingSection>
                  <Text> | </Text>
                  <FollowersSection>
                    <TouchableOpacity
                      style={{ alignItems: "center" }}
                      onPress={() => {
                        navigation.navigate("FollowList", {
                          item,
                          tab: "Followers",
                        });
                      }}
                    >
                      <FollowNumbersFont>
                        {item.followers.length}
                      </FollowNumbersFont>
                      <FollowTextFont>Followers</FollowTextFont>
                    </TouchableOpacity>
                  </FollowersSection>
                </StatsSection>
                
                <EditProfileButtonContainer>
                  <EditProfileButton
                    onPress={() => {
                      navigation.navigate("EditProfile", { item });
                    }}
                    mode="outlined"
                    color="white"
                  >
                    Edit Profile
                  </EditProfileButton>
                </EditProfileButtonContainer>
                <View style={{paddingBottom: 10, paddingTop: 0}}>
                  <Text style={{textAlign: "center"}}>{item.bio}</Text>
                </View>
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
