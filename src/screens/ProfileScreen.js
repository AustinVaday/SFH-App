import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import userProfile from "../data/userProfile";
import Colors from "../constants/Colors";
import { Button, Image } from "react-native-elements";
import ProfileTabs from "../components/ProfileTabs";
import { BallIndicator } from "react-native-indicators";

export default class ProfileScreen extends Component {
  _onPressViewPosting = () => {
    this.props.navigation.navigate("ViewPosting");
  };

  _onPressCamera = () => {
    this.props.navigation.navigate("Camera");
  };

  _onPressHome = () => {
    this.props.navigation.navigate("Home");
  };

  userName = userProfile.map((index) => index.name);
  userFollowing = userProfile.map((index) => index.following);
  userFollowers = userProfile.map((index) => index.followers);

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView>
          <View style={{ position: "absolute" }}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                this.props.navigation.navigate("Setting");
              }}
            >
              <Icon name="cog" size={35} color={Colors.thirdColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            <Image
              //size={120}
              //rounded
              PlaceholderContent={<BallIndicator color={Colors.primaryColor} />}
              source={{
                uri:
                  "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/84189338_4043734775651919_3497303079273889792_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=G9P94n3RleAAX8NPmvA&_nc_ht=scontent-lax3-1.xx&oh=8eb316438ad72f26378ae238fb0c0e05&oe=5F403A0E",
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                borderWidth: 0.1,
              }}
            />

            <Text style={styles.nameTextStyle}>{this.userName}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("FollowList");
                }}
              >
                <Text style={styles.followTextStyle}>
                  {this.userFollowing} Following
                </Text>
              </TouchableOpacity>
              <Text style={styles.followTextStyle}> | </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("FollowList");
                }}
              >
                <Text style={styles.followTextStyle}>
                  {this.userFollowers} Followers
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Edit Profile"
              onPress={() => {
                this.props.navigation.navigate("EditProfile");
              }}
              titleStyle={{
                textAlign: "center",
                padding: 120,
                color: Colors.primaryColor,
                fontSize: 20,
                fontFamily: "open-sans-bold",
              }}
              buttonStyle={{
                marginTop: 20,
                height: 50,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: Colors.primaryColor,
                borderRadius: 20,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ProfileTabs
              navigationHome={this._onPressHome}
              navigationViewPosting={this._onPressViewPosting}
              navigationCamera={this._onPressCamera}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.secondaryColor,
  },
  iconContainer: {
    marginTop: 20,
    marginLeft: 340,
  },
  nameTextStyle: {
    paddingTop: 25,
    paddingBottom: 10,
    fontSize: 30,
    fontFamily: "open-sans-bold",
  },
  followTextStyle: {
    fontSize: 20,
    fontFamily: "open-sans",
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
