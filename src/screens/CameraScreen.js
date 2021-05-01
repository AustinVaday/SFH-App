import React, { Component } from "react";
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermissions: null,
      type: Camera.Constants.Type.back,
      flash: Camera.Constants.FlashMode.off,
      videoTaken: false,
      cameraIsRecording: false,
      video: null,
    };
  }

  componentDidMount = async () => {
    const camera = await Camera.requestPermissionsAsync();
    this.setState({
      hasCameraPermissions: camera.status === "granted",
    });
  };

  _changeType = () => {
    this.setState((prevState) => {
      if (prevState.type === Camera.Constants.Type.back) {
        return { type: Camera.Constants.Type.front };
      } else {
        return { type: Camera.Constants.Type.back };
      }
    });
  };

  _changeFlash = () => {
    this.setState((prevState) => {
      if (prevState.flash === Camera.Constants.FlashMode.off) {
        return { flash: Camera.Constants.FlashMode.on };
      } else if (prevState.flash === Camera.Constants.FlashMode.on) {
        return { flash: Camera.Constants.FlashMode.auto };
      } else if (prevState.flash === Camera.Constants.FlashMode.auto) {
        return { flash: Camera.Constants.FlashMode.off };
      }
    });
  };

  _takeVideo = async () => {
    if (this.camera) {
      const takenVideo = await this.camera.recordAsync();
      this.setState({ video: takenVideo.uri, videoTaken: true });
    }
  };

  _rejectVideo = () => {
    this.setState({
      video: null,
      videoTaken: false,
    });
  };

  _cancelCamera = async () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  _goToLibrary = async () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate("Library");
  };

  _approveVideo = async () => {
    const { video } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    navigate("Upload", { url: video });
    this.setState({
      video: null,
      videoTaken: false,
    });
  };

  render() {
    const {
      hasCameraPermissions,
      type,
      flash,
      videoTaken,
      video,
      cameraIsRecording,
    } = this.state;

    if (hasCameraPermissions === null) {
      return <View />;
    } else if (hasCameraPermissions === false) {
      return <Text>No Access to Camera, check your settings</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          {videoTaken ? (
            <>
              <StatusBar
                translucent
                backgroundColor="white"
                barStyle="light-content"
              />
              <View style={styles.videoActions}>
                <TouchableOpacity onPressOut={this._rejectVideo}>
                  <MaterialIcons name={"close"} size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.videoTitle}>Video</Text>
                <TouchableOpacity onPressOut={this._approveVideo}>
                  <MaterialIcons
                    name={"check-box"}
                    size={40}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
              </View>
              <Video
                source={{ uri: video }}
                resizeMode="cover"
                isLooping
                useNativeControls
                style={{ flex: 1, marginTop: 10 }}
              />
            </>
          ) : (
            <Camera
              type={type}
              flashMode={flash}
              ref={(camera) => (this.camera = camera)}
              style={styles.camera}
            >
              {!cameraIsRecording ? (
                <>
                  <View style={styles.actionsContainer}>
                    <View style={{ alignSelf: "flex-start" }}>
                      <TouchableOpacity onPressOut={this._cancelCamera}>
                        <MaterialIcons name={"close"} size={40} color="white" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.action}>
                      <TouchableOpacity onPressOut={this._changeType}>
                        <MaterialIcons
                          name={
                            type === Camera.Constants.Type.back
                              ? "camera-front"
                              : "camera-rear"
                          }
                          color="white"
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.action}>
                      <TouchableOpacity onPressOut={this._changeFlash}>
                        {flash === Camera.Constants.FlashMode.off && (
                          <MaterialIcons
                            name={"flash-off"}
                            color="white"
                            size={40}
                          />
                        )}
                        {flash === Camera.Constants.FlashMode.on && (
                          <MaterialIcons
                            name={"flash-on"}
                            color="white"
                            size={40}
                          />
                        )}
                        {flash === Camera.Constants.FlashMode.auto && (
                          <MaterialIcons
                            name={"flash-auto"}
                            color="white"
                            size={40}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity onPressOut={this._goToLibrary}>
                      <MaterialIcons
                        name={"video-library"}
                        size={45}
                        color="white"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressOut={() => {
                        if (cameraIsRecording) {
                          this.setState({ cameraIsRecording: false });
                          this.camera.stopRecording();
                        } else {
                          this.setState({ cameraIsRecording: true });
                          this._takeVideo();
                        }
                      }}
                    >
                      <View style={styles.startbtn} />
                    </TouchableOpacity>
                    <View style={{ padding: 25 }} />
                  </View>
                </>
              ) : (
                <View style={styles.bottomButtonsContainer}>
                  <TouchableOpacity
                    onPressOut={() => {
                      if (cameraIsRecording) {
                        this.setState({ cameraIsRecording: false });
                        this.camera.stopRecording();
                      } else {
                        this.setState({ cameraIsRecording: true });
                        this._takeVideo();
                      }
                    }}
                  >
                    <View style={styles.stopbtn} />
                  </TouchableOpacity>
                </View>
              )}
            </Camera>
          )}
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  videoTitle: {
    color: "white",
    fontSize: 25,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 30,
  },
  startbtn: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderColor: "#bbb",
    borderWidth: 15,
    borderRadius: 50,
  },
  stopbtn: {
    width: 100,
    height: 100,
    backgroundColor: "#bbb",
    borderColor: "red",
    borderWidth: 15,
    borderRadius: 50,
  },
  action: {
    backgroundColor: "transparent",
    marginBottom: 20,
    alignSelf: "flex-end",
    bottom: 35,
  },
  actionsContainer: {
    margin: 15,
  },
  bottomButtonsContainer: {
    marginTop: "auto",
    marginBottom: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  videoActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
  },
});
