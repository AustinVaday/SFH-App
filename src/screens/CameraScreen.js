import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";

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
    const camera = await Permissions.askAsync(Permissions.CAMERA);
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
        <View style={styles.container}>
          {videoTaken ? (
            <View style={{ flex: 2 }}>
              <Video
                source={{ uri: video }}
                resizeMode="cover"
                isLooping
                useNativeControls
                style={{ flex: 1 }}
              />
            </View>
          ) : (
            <Camera
              type={type}
              flashMode={flash}
              ref={(camera) => (this.camera = camera)}
              style={styles.camera}
            >
              <TouchableOpacity onPressOut={this._changeType}>
                <View style={styles.action}>
                  <MaterialIcons
                    name={
                      type === Camera.Constants.Type.back
                        ? "camera-front"
                        : "camera-rear"
                    }
                    color="white"
                    size={40}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={this._changeFlash}>
                <View style={styles.action}>
                  {flash === Camera.Constants.FlashMode.off && (
                    <MaterialIcons name={"flash-off"} color="white" size={40} />
                  )}
                  {flash === Camera.Constants.FlashMode.on && (
                    <MaterialIcons name={"flash-on"} color="white" size={40} />
                  )}
                  {flash === Camera.Constants.FlashMode.auto && (
                    <MaterialIcons
                      name={"flash-auto"}
                      color="white"
                      size={40}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </Camera>
          )}
          <View style={styles.btnContainer}>
            {videoTaken ? (
              <View style={styles.videoActions}>
                <TouchableOpacity onPressOut={this._rejectVideo}>
                  <MaterialIcons name={"cancel"} size={60} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPressOut={this._approveVideo}>
                  <MaterialIcons
                    name={"check-circle"}
                    size={60}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            ) : (
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
                {!cameraIsRecording ? (
                  <View style={styles.startbtn} />
                ) : (
                  <View style={styles.stopbtn} />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  camera: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 15,
    borderRadius: 50,
  },
  action: {
    backgroundColor: "transparent",
    height: 40,
    width: 40,
    margin: 10,
  },
  videoActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
    width: 250,
  },
});
