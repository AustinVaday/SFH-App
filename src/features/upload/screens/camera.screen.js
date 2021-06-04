import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../infrastructure/theme/colors";

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [videoTaken, setVideoTaken] = useState(false);
  const [cameraIsRecording, setCameraIsRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const _changeType = () => {
    setType((prevState) => {
      if (prevState.type === Camera.Constants.Type.back) {
        return { type: Camera.Constants.Type.front };
      } else {
        return { type: Camera.Constants.Type.back };
      }
    });
  };

  const _changeFlash = () => {
    setFlash((prevState) => {
      if (prevState.flash === Camera.Constants.FlashMode.off) {
        return { flash: Camera.Constants.FlashMode.on };
      } else if (prevState.flash === Camera.Constants.FlashMode.on) {
        return { flash: Camera.Constants.FlashMode.auto };
      } else if (prevState.flash === Camera.Constants.FlashMode.auto) {
        return { flash: Camera.Constants.FlashMode.off };
      }
    });
  };

  const _takeVideo = async () => {
    if (cameraRef) {
      const takenVideo = await cameraRef.current.recordAsync();
      setVideo(takenVideo.uri);
      setVideoTaken(true);
    }
  };

  const _rejectVideo = () => {
    setVideo(null);
    setVideoTaken(false);
  };

  const _approveVideo = async () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate("Upload", { url: video });
    setVideo(null);
    setVideoTaken(false);
  };

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
            <TouchableOpacity onPressOut={_rejectVideo}>
              <MaterialIcons name={"close"} size={40} color="white" />
            </TouchableOpacity>
            <Text style={styles.videoTitle}>Video</Text>
            <TouchableOpacity onPressOut={_approveVideo}>
              <MaterialIcons
                name={"check-box"}
                size={40}
                color={colors.brand.primary}
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
          ref={(camera) => (cameraRef.current = camera)}
          style={styles.camera}
        >
          {!cameraIsRecording ? (
            <>
              <View style={styles.actionsContainer}>
                <View style={{ alignSelf: "flex-start" }}>
                  <TouchableOpacity onPressOut={() => navigation.goBack()}>
                    <MaterialIcons name={"close"} size={40} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.action}>
                  <TouchableOpacity onPressOut={_changeType}>
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
                  <TouchableOpacity onPressOut={_changeFlash}>
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
                <TouchableOpacity
                  onPressOut={() => navigation.navigate("Library")}
                >
                  <MaterialIcons
                    name={"video-library"}
                    size={45}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPressOut={() => {
                    if (cameraIsRecording) {
                      setCameraIsRecording(false);
                      cameraRef.current.stopRecording();
                    } else {
                      setCameraIsRecording(true);
                      _takeVideo();
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
                    setCameraIsRecording(false);
                    cameraRef.current.stopRecording();
                  } else {
                    setCameraIsRecording(true);
                    _takeVideo();
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
};

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
