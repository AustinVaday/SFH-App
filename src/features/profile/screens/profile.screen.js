import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import userProfile from "../../../utils/mock/userProfile";
import { colors } from "../../../infrastructure/theme/colors";
import { Button, Image } from "react-native-elements";
import ProfileTabs from "../components/ProfileTabs";
import { BallIndicator } from "react-native-indicators";

export const ProfileScreen = ({ navigation }) => {
  const userName = userProfile.map((index) => index.name);
  const userFollowing = userProfile.map((index) => index.following);
  const userFollowers = userProfile.map((index) => index.followers);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={{ position: "absolute" }}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Icon name="cog" size={35} color={colors.brand.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <Image
            //size={120}
            //rounded
            PlaceholderContent={<BallIndicator color={colors.brand.primary} />}
            source={{
              uri: "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/84189338_4043734775651919_3497303079273889792_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=G9P94n3RleAAX8NPmvA&_nc_ht=scontent-lax3-1.xx&oh=8eb316438ad72f26378ae238fb0c0e05&oe=5F403A0E",
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              borderWidth: 0.1,
            }}
          />

          <Text style={styles.nameTextStyle}>{userName}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FollowList");
              }}
            >
              <Text style={styles.followTextStyle}>
                {userFollowing} Following
              </Text>
            </TouchableOpacity>
            <Text style={styles.followTextStyle}> | </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FollowList");
              }}
            >
              <Text style={styles.followTextStyle}>
                {userFollowers} Followers
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Edit Profile"
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            titleStyle={{
              textAlign: "center",
              padding: 120,
              color: colors.brand.primary,
              fontSize: 20,
            }}
            buttonStyle={{
              marginTop: 20,
              height: 50,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: colors.brand.primary,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ProfileTabs
            navigationHome={() => {
              navigation.navigate("Home");
            }}
            navigationViewPosting={() => {
              navigation.navigate("ViewPosting");
            }}
            navigationCamera={() => {
              navigation.navigate("Camera");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// }

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  iconContainer: {
    marginTop: 20,
    marginLeft: 340,
  },
  nameTextStyle: {
    paddingTop: 25,
    paddingBottom: 10,
    fontSize: 30,
  },
  followTextStyle: {
    fontSize: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 70,
  },
  container: {
    flex: 1,
  },
});
