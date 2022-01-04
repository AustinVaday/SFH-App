import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import { ProfileTabs } from "../navigators/profile-tabs.navigator";
import { ProfileHeader } from "../components/profile-header.components";
import { Text } from "../../../components/typography/text.components";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

import { ProfileBackground, Navbar } from "../styles/profile.styles";

export const ProfileScreen = ({ route, navigation }) => {
  const { uid, guestUser } = route.params;

  const [userState, setUserState] = useState({ user: null, loading: true });

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uid === currentUser.id) {
      setUserState({ user: currentUser, loading: false });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUserState({ user: snapshot.data(), loading: false });
          }
        });
    }
  }, []);

  if (userState.loading) {
    return <View />;
  }

  return (
    <ProfileBackground>
      <Navbar
        guestUser={guestUser}
        navigation={navigation}
        centerComponent={
          <Text variant="navbar_title">{userState.user.username}</Text>
        }
      />
      <FlatList
        data={[{ key: "tabbed" }]}
        ListHeaderComponent={
          <ProfileHeader
            user={userState.user}
            guestUser={guestUser}
            navigation={navigation}
          />
        }
        ListFooterComponent={<ProfileTabs user={userState.user} />}
      />
    </ProfileBackground>
  );
};
