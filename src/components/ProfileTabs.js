import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import userProfile from "../data/userProfile";
import Colors from "../constants/Colors";
import { Image } from "react-native-elements";
import { BallIndicator } from "react-native-indicators";
import { Button } from "react-native-paper";

var { width, height } = Dimensions.get("window");

export default class ProfileTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index,
    });
  };

  renderPostsTab = () => {
    return userProfile.map((user, index) => {
      if (!user.posts.length) {
        return (
          <View key={index} style={{ marginHorizontal: "12%" }}>
            <Text style={styles.textStyle}>
              You haven't posted a video yet. Go ahead and make a video with
              your first sign!
            </Text>
            <TouchableOpacity onPress={this.props.navigationCamera}>
              <Text style={styles.textPressStyle}>
                Create your first video!
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return user.posts.map((posts, index) => {
          return (
            <View key={index} style={{ width: width / 2, height: width / 2 }}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={this.props.navigationViewPosting}>
                  <Image
                    PlaceholderContent={
                      <BallIndicator color={Colors.primaryColor} />
                    }
                    source={{ uri: posts.url }}
                    style={styles.imageStyle}
                  />
                  <View
                    style={{
                      position: "absolute",
                      width: 140,
                      alignItems: "flex-start",
                      marginLeft: 15,
                    }}
                  >
                    <Button
                      mode="contained"
                      uppercase={false}
                      style={{
                        opacity: 0.9,
                        marginTop: 140,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 10,
                      }}
                    >
                      {posts.videoTitle}
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        });
      }
    });
  };

  renderSavesTab = () => {
    return userProfile.map((user, index) => {
      if (!user.saves.length) {
        return (
          <View key={index} style={{ marginHorizontal: "12%" }}>
            <Text style={styles.textStyle}>
              You haven't saved any video yet. Go ahead and watch some videos!
            </Text>
            <TouchableOpacity onPress={this.props.navigationHome}>
              <Text style={styles.textPressStyle}>Explore new videos</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return user.saves.map((saves, index) => {
          return (
            <View key={index} style={{ width: width / 2, height: width / 2 }}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={this.props.navigationViewPosting}>
                  <Image
                    PlaceholderContent={
                      <BallIndicator color={Colors.primaryColor} />
                    }
                    source={{ uri: saves.url }}
                    style={styles.imageStyle}
                  />
                  <View
                    style={{
                      position: "absolute",
                      width: 140,
                      alignItems: "flex-start",
                      marginLeft: 15,
                    }}
                  >
                    <Button
                      mode="contained"
                      uppercase={false}
                      style={{
                        opacity: 0.9,
                        marginTop: 140,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 10,
                      }}
                    >
                      {saves.videoTitle}
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        });
      }
    });
  };

  checkIfPostsClicked = () => {
    {
      return this.state.activeIndex == 0 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.renderPostsTab()}
        </View>
      ) : null;
    }
  };

  checkIfSavesClicked = () => {
    {
      return this.state.activeIndex == 1 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.renderSavesTab()}
        </View>
      ) : null;
    }
  };

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            mode="outlined"
            transparent
            onPress={() => this.segmentClicked(0)}
            active={this.state.activeIndex == 0}
            color={Colors.secondaryColor}
            contentStyle={{ width: 210, height: 50 }}
            style={[
              this.state.activeIndex == 0
                ? styles.activeTabStyle
                : styles.inactiveTabStyle,
            ]}
            labelStyle={[
              this.state.activeIndex == 0
                ? styles.activeTabLabelStyle
                : styles.inactiveTabLabelStyle,
            ]}
          >
            Posts
          </Button>
          <Button
            mode="outlined"
            transparent
            onPress={() => this.segmentClicked(1)}
            active={this.state.activeIndex == 1}
            color={Colors.secondaryColor}
            contentStyle={{ width: 210, height: 50 }}
            style={[
              this.state.activeIndex == 1
                ? styles.activeTabStyle
                : styles.inactiveTabStyle,
            ]}
            labelStyle={[
              this.state.activeIndex == 1
                ? styles.activeTabLabelStyle
                : styles.inactiveTabLabelStyle,
            ]}
          >
            Saves
          </Button>
        </View>
        {this.checkIfPostsClicked()}
        {this.checkIfSavesClicked()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: "100%",
    borderRadius: 30,
    borderWidth: 0.1,
  },
  imageContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textStyle: {
    marginTop: 100,
    width: 300,
    height: 100,
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
  },
  textPressStyle: {
    marginTop: 40,
    width: 300,
    height: 100,
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
    color: Colors.primaryColor,
  },
  activeTabStyle: {
    borderWidth: 0,
    borderBottomWidth: 3,
    color: "black",
    borderColor: Colors.primaryColor,
  },
  activeTabLabelStyle: {
    color: Colors.primaryColor,
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  inactiveTabStyle: {
    borderWidth: 0,
    borderColor: Colors.thirdColor,
  },
  inactiveTabLabelStyle: {
    color: Colors.thirdColor,
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});
