import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
// import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

class LibraryScreen extends Component {
  state = {
    hasLibraryPermissions: null,
    videos: null,
    pickedVideo: null,
  };

  async componentDidMount() {
    await this.getPermissionsAsync();
    const edges = await MediaLibrary.getAssetsAsync({
      first: 10,
      mediaType: [MediaLibrary.MediaType.video],
    });
    //   console.log(edges.assets[0])
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

  render() {
    if (this.state.hasLibraryPermissions === null) {
      return <Text>hisdfasdfsdaf sdf sadf asdf asd fas df asdf adsf</Text>;
    } else if (this.state.hasLibraryPermissions === false) {
      return <Text>No Access to Library, check your settings</Text>;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          {this.state.videos && (
            <View style={styles.pictureContainer}>
              <Video
                source={{ uri: this.state.pickedVideo }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: 300, height: 300 }}
              />
              <TouchableOpacity onPress={this._approvePhoto}>
                <View style={styles.action}>
                  <MaterialIcons name="check-circle" color="white" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {this.state.videos && (
            <View style={styles.photos}>
              {console.log("hi")}
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {this.state.videos.map((video, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this._pickPhoto(video.uri)}
                  >
                    <Video
                      source={{ uri: video.uri }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      isLooping
                      style={{ width: 300, height: 300 }}
                      // style={styles.smallPhoto}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        // <LibraryScreen
        //   {...this.state}
        //   pickPhoto={this._pickPhoto}
        //   approvePhoto={this._approvePhoto}
        // />
      );
    }
  }
  _pickPhoto = (video) => {
    this.setState({
      pickedVideo: video,
    });
  };
  _approvePhoto = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { pickedVideo } = this.state;
    navigate("UploadScreen", { url: pickedVideo.node.video.uri });
  };
}

// LibraryScreen.propTypes = {
//   pickedPhoto: PropTypes.object,
//   photos: PropTypes.array,
//   approvePhoto: PropTypes.func.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pictureContainer: {
    flex: 2,
  },
  photos: {
    flex: 1,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallPhoto: {
    width: width / 3,
    height: width / 3,
  },
  action: {
    backgroundColor: "transparent",
    height: 40,
    width: 40,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default LibraryScreen;
