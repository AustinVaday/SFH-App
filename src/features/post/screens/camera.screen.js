import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { IconButton, Button } from "react-native-paper";
import { openURL } from "expo-linking";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

import LottieView from "lottie-react-native";

const PostCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const CameraTopButtonsSection = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
`;

const CameraButtons = styled.View`
  flex: 1;
  padding-top: ${(props) => props.theme.space[2]};
  align-items: flex-end;
`;

const CameraBottomButtonsSection = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const PreviewTopButtonsSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AnimationWrapper = styled.View`
  flex-direction: row;
  height: 10px;
  width: 90%;
  background-color: rgba(96, 96, 96, 0.5);
  border-radius: 5px;
  align-self: center;
`;

export const CameraBottomButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const AllowCameraAccessSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [videoTaken, setVideoTaken] = useState(false);
  const [cameraIsRecording, setCameraIsRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const cameraRef = useRef();
  const animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useInterval(
    () => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        setCameraIsRecording(false);
        setProgress(0);
        cameraRef.current.stopRecording();
      }
    },
    cameraIsRecording ? 100 : null
  );

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <SafeArea>
        <IconButton
          size={30}
          icon="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AllowCameraAccessSection>
          <Text
            variant="title"
            style={{ textAlign: "center", paddingBottom: 20 }}
          >
            Please Allow Access to Your Camera
          </Text>
          <Text
            variant="body"
            style={{ textAlign: "center", paddingBottom: 30 }}
          >
            Grant camera access to shoot a video
          </Text>
          <Button
            mode="text"
            uppercase={false}
            color={colors.brand.primary}
            onPress={() => openURL("app-settings:")}
          >
            Enable Camera Access
          </Button>
        </AllowCameraAccessSection>
      </SafeArea>
    );
  }

  const changeType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const changeFlash = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else if (flash === Camera.Constants.FlashMode.on) {
      setFlash(Camera.Constants.FlashMode.auto);
    } else if (flash === Camera.Constants.FlashMode.auto) {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };

  const takeVideo = async () => {
    if (cameraRef) {
      const takenVideo = await cameraRef.current.recordAsync();
      setVideo(takenVideo.uri);
      setVideoTaken(true);
    }
  };

  const rejectVideo = () => {
    setVideo(null);
    setVideoTaken(false);
  };

  const approveVideo = async () => {
    navigation.navigate("Post", { url: video });
    setVideo(null);
    setVideoTaken(false);
  };

  return (
    <>
      {videoTaken ? (
        <SafeArea>
          <PreviewTopButtonsSection>
            <IconButton size={35} icon="close" onPress={rejectVideo} />
            <Text variant="title">Preview</Text>
            <IconButton
              size={35}
              icon="checkbox-marked"
              color={colors.brand.primary}
              onPress={approveVideo}
            />
          </PreviewTopButtonsSection>
          <Video
            source={{ uri: video }}
            resizeMode="cover"
            isLooping
            useNativeControls
            style={{ flex: 1 }}
          />
        </SafeArea>
      ) : (
        <PostCamera
          type={type}
          flashMode={flash}
          ref={(camera) => (cameraRef.current = camera)}
        >
          <SafeArea style={{ backgroundColor: "transparent" }}>
            {!cameraIsRecording ? (
              <>
                <CameraTopButtonsSection>
                  <IconButton
                    size={35}
                    icon="close"
                    color="white"
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                  <CameraButtons>
                    <IconButton
                      size={35}
                      icon={
                        type === Camera.Constants.Type.back
                          ? "camera-front"
                          : "camera-rear"
                      }
                      color="white"
                      onPress={changeType}
                    />
                    {flash === Camera.Constants.FlashMode.off && (
                      <IconButton
                        size={35}
                        icon={"flash-off"}
                        color="white"
                        onPress={changeFlash}
                      />
                    )}
                    {flash === Camera.Constants.FlashMode.on && (
                      <IconButton
                        size={35}
                        icon={"flash"}
                        color="white"
                        onPress={changeFlash}
                      />
                    )}
                    {flash === Camera.Constants.FlashMode.auto && (
                      <IconButton
                        size={35}
                        icon={"flash-auto"}
                        color="white"
                        onPress={changeFlash}
                      />
                    )}
                  </CameraButtons>
                </CameraTopButtonsSection>
                <CameraBottomButtonsSection>
                  <CameraBottomButtonsContainer>
                    <IconButton
                      size={35}
                      icon={"filmstrip-box-multiple"}
                      color="white"
                      onPress={() => navigation.goBack()}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setCameraIsRecording(true);
                        takeVideo();
                      }}
                    >
                      <LottieView
                        key="animation"
                        resizeMode="cover"
                        style={{ width: "35%" }}
                        source={require("../../../assets/lottie/live-icon.json")}
                      />
                    </TouchableWithoutFeedback>
                    <View style={{ padding: 35 }} />
                  </CameraBottomButtonsContainer>
                </CameraBottomButtonsSection>
              </>
            ) : (
              <>
                <AnimationWrapper>
                  <Animated.View
                    style={
                      ([StyleSheet.absoluteFill],
                      {
                        backgroundColor: colors.brand.primary,
                        width,
                        borderRadius: 10,
                      })
                    }
                  />
                </AnimationWrapper>
                <CameraBottomButtonsSection>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCameraIsRecording(false);
                      setProgress(0);
                      cameraRef.current.stopRecording();
                    }}
                  >
                    <LottieView
                      key="animation"
                      autoPlay
                      loop
                      resizeMode="cover"
                      style={{ width: "35%" }}
                      source={require("../../../assets/lottie/live-icon.json")}
                    />
                  </TouchableWithoutFeedback>
                </CameraBottomButtonsSection>
              </>
            )}
          </SafeArea>
        </PostCamera>
      )}
    </>
  );
};
