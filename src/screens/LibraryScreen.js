import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";
import Colors from "../constants/Colors";

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

  _goToCamera = async () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate("Camera");
  };

  _cancelLibrary = async () => {
    const { navigation } = this.props;
    navigation.goBack(null);
    navigation.goBack(null);
  };

  _approveVideo = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { pickedVideo } = this.state;
    navigate("Upload", { url: pickedVideo });
  };

  _renderItem = ({ item }) => (
    <>
      {this.state.pickedVideo == item.uri ? (
        <Video
          source={{ uri: this.state.pickedVideo }}
          resizeMode="cover"
          style={styles.smallSelectedVideo}
        />
      ) : (
        <TouchableOpacity key={item} onPress={() => this._pickVideo(item.uri)}>
          <Video
            source={{ uri: item.uri }}
            resizeMode="cover"
            style={styles.smallVideo}
          />
        </TouchableOpacity>
      )}
    </>
  );

  render() {
    if (this.state.hasLibraryPermissions === null) {
      return <View />;
    } else if (this.state.hasLibraryPermissions === false) {
      return <Text>No Access to Library, check your settings</Text>;
    } else {
      return (
        <>
          <SafeAreaView style={{ flex: 0, backgroundColor: "black" }} />
          <StatusBar
            translucent
            backgroundColor="white"
            barStyle="light-content"
          />
          <View style={styles.container}>
            <View style={styles.libraryActions}>
              <TouchableOpacity onPressOut={this._cancelLibrary}>
                <MaterialIcons name={"close"} size={40} color="white" />
              </TouchableOpacity>
              <Text style={styles.libraryTitle}>Library</Text>
              <TouchableOpacity onPressOut={this._approveVideo}>
                <MaterialIcons
                  name={"check-box"}
                  size={40}
                  color={Colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
            {this.state.videos && (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.handlePlayAndPause}
                >
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
                <TouchableOpacity onPress={this._goToCamera}>
                  <View style={styles.action}>
                    <MaterialIcons name="videocam" color="white" size={30} />
                  </View>
                </TouchableOpacity>
              </>
            )}
            {this.state.videos && (
              <View style={styles.videos}>
                <FlatList
                  data={this.state.videos}
                  renderItem={this._renderItem}
                  keyExtractor={(item) => item.uri}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  videos: {
    flex: 1,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallVideo: {
    width: width / 3,
    height: width / 3,
  },
  smallSelectedVideo: {
    width: width / 3,
    height: width / 3,
    borderWidth: 5,
    borderColor: Colors.primaryColor,
  },
  action: {
    backgroundColor: "black",
    borderRadius: 30,
    color: "white",
    padding: 10,
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
  libraryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  libraryTitle: {
    color: "white",
    fontSize: 25,
  },
});
