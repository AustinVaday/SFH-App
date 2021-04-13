import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

export default class LibraryScreen extends Component {
  state = {
    hasLibraryPermissions: null,
    videos: null,
    pickedVideo: null,
    shouldPlay: false,
  };

  async componentDidMount() {
    await this.getPermissionsAsync();
    const edges = await MediaLibrary.getAssetsAsync({
      first: 10,
      mediaType: [MediaLibrary.MediaType.video],
    });
    this.setState({
      videos: edges.assets,
      pickedVideo: edges.assets[0].uri,
    });
  }

  getPermissionsAsync = async () => {
    const { status: cameraRoll } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    this.setState({
      hasLibraryPermissions: cameraRoll === "granted",
    });
  };

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  _pickVideo = (video) => {
    this.setState({
      pickedVideo: video,
    });
  };

  _approveVideo = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { pickedVideo } = this.state;
    navigate("Upload", { url: pickedVideo });
  };

  render() {
    if (this.state.hasLibraryPermissions === null) {
      return <View />;
    } else if (this.state.hasLibraryPermissions === false) {
      return <Text>No Access to Library, check your settings</Text>;
    } else {
      return (
        <View style={styles.container}>
          {this.state.videos && (
            <View style={styles.videoContainer}>
              <TouchableOpacity onPress={this.handlePlayAndPause}>
                <Video
                  source={{ uri: this.state.pickedVideo }}
                  isMuted={true}
                  shouldPlay={this.state.shouldPlay}
                  resizeMode="cover"
                  isLooping
                  style={{ width: width, height: width }}
                />
                <View style={styles.controlVideo}>
                  <MaterialIcons
                    name={this.state.shouldPlay ? null : "play-arrow"}
                    size={85}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._approveVideo}>
                <View style={styles.action}>
                  <MaterialIcons name="check-circle" color="white" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {this.state.videos && (
            <View style={styles.videos}>
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {this.state.videos.map((video, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this._pickVideo(video.uri)}
                  >
                    <Video
                      source={{ uri: video.uri }}
                      resizeMode="cover"
                      style={styles.smallVideo}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
  },
  videos: {
    flex: 1,
    marginTop: 25,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallVideo: {
    width: width / 3,
    height: width / 3,
  },
  action: {
    backgroundColor: "transparent",
    color: "white",
    height: 40,
    width: 40,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  controlVideo: {
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
